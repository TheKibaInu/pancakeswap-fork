/* eslint-disable */
import { Alert, ArrowDownIcon, Box, Button, Text, alertVariants, useModal }  from '@pancakeswap/uikit'
import { AppBody, AppHeader } from '../../components/App'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import Column, { AutoColumn } from '../../components/Layout/Column'
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import { useAllTokens, useCurrency } from '../../hooks/Tokens'
import { useAutoSlippageManager, useExpertModeManager, useUserSingleHopOnly, useUserSlippageTolerance } from '../../state/user/hooks'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'

import AddressInputPanel from './components/AddressInputPanel'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import { ReactComponent as Arrows } from '../../assets/svg/arrows.svg'
import CircleLoader from '../../components/Loader/CircleLoader'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { Field } from '../../state/swap/actions'
import { GreyCard } from '../../components/Card'
import { INITIAL_ALLOWED_SLIPPAGE } from '../../config/constants'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import Page from '../Page'
import ProgressSteps from './components/ProgressSteps'
import { RouteComponentProps } from 'react-router-dom'
import SwapWarningModal from './components/SwapWarningModal'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import TradePrice from './components/TradePrice'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { getTokenTaxes } from 'components/Menu/utils'
import kiba from '../../assets/kiba.jpeg'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import styled from 'styled-components'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import { useTranslation } from 'contexts/Localization'

const Label = styled(Text)`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
`
type ButtonAndyProps = { andy: string };
const ButtonAndy = styled(Button) <ButtonAndyProps>`
font-weight:600;
background-color: #F76C1D;
color: #FFFFFF;
font-family: Inter;
font-size: 20px;
border-radius: 10px;
padding: 16px;
letter-spacing: 0em;


&:hover {
  border: 1px solid #F76C1D;
}
&:active {
  background-color: #F76C1D;
}
&:disabled {
  background-color: #4F4F62;
}
`;

type ButtonAndyPropsSmall = { andy: string };
const ButtonAndySmall = styled(Button) <ButtonAndyProps>`
font-weight: 600;
background-color: #F76C1D;
color: #FFFFFF;
font-family: Inter;
font-size: 16px;
border-radius: 8px;
padding: 16px;
letter-spacing: 0em;


&:hover {
  border: 1px solid #F76C1D;
}
&:active {
  background-color: #F76C1D;
}
&:disabled {
  background-color: #4F4F62;
}
`;

export default function Swap({ history }: RouteComponentProps) {
  const loadedUrlParams = useDefaultsFromURLSearch()

  const { t } = useTranslation()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )
  console.log(urlLoadedTokens, loadedUrlParams)
  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  const { account, library } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
    : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )
  const [automaticCalculatedSlippage, setAutomaticSlippage] = React.useState(-1)
  const [useAutoSlippage,] = useAutoSlippageManager()
    const [,setSlippage] = useUserSlippageTolerance()
React.useEffect(() => {
    if (useAutoSlippage &&
      trade &&
      trade.outputAmount &&
      trade.outputAmount.currency &&
      trade.inputAmount &&
      trade.inputAmount.currency &&
      +trade.inputAmount.toSignificant(6) > 0 &&
      +trade.outputAmount.toFixed(0) > 0) {
        const test = async () => {
          const useInput = ["BNB", "WBNB"].includes(parsedAmounts.INPUT.currency.symbol),
              useOutput = ["BNB", "WBNB"].includes(parsedAmounts.OUTPUT.currency.symbol)

            const address = !useOutput ?
              ((parsedAmounts.OUTPUT.currency as any).address ? (parsedAmounts?.OUTPUT?.currency as any).address : (parsedAmounts.OUTPUT.currency as any).address) as string
              : !useInput ?
                ((parsedAmounts?.INPUT?.currency as any).address ? (parsedAmounts?.INPUT?.currency as any).address : (parsedAmounts.INPUT.currency as any).address) as string :
                ''
            console.log(address)
            getTokenTaxes(address).then((taxes) => {
              const value: number | null = useInput ?
                ((taxes?.buy ?? 0) + 1) : useOutput ?
                  taxes.sell : 0;
              const parsed = Math.floor(Number.parseFloat((value ?? '0').toString()) * 100)
              console.log(parsed)

              setSlippage(parsed)
              setAutomaticSlippage(value as number)
            })
        }
        test()
    }
  }, [useAutoSlippage, trade?.outputAmount, parsedAmounts.INPUT, parsedAmounts.OUTPUT, trade?.inputAmount])

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap')} />,
  )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )
  return (
    <Page style={{ background: `#252632`, height: '100vh' }}>
      <AppBody>
        <AppHeader title={t(' ')} subtitle={t(' ')} />
        <Wrapper id="swap-page">
          <AutoColumn gap="md">
            {useAutoSlippage && automaticCalculatedSlippage >= 0 && <Alert title="Auto Slippage Enabled" variant={alertVariants.INFO}>
              Using {automaticCalculatedSlippage}% Auto Slippage
              </Alert>}
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
              value={formattedAmounts[Field.INPUT]}
              showMaxButton={!atMaxAmountInput}
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              id="swap-currency-input"
            />
            <AutoColumn justify="space-between">
              <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                <ArrowWrapper clickable>
                  <Arrows style={{ height: 16, width: 16 }} fill='white'
                    onClick={() => {
                      setApprovalSubmitted(false) // reset 2 step UI for approvals
                      onSwitchTokens()
                    }}
                    color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                  />
                </ArrowWrapper>
                {recipient === null && !showWrap && isExpertMode ? (
                  <ButtonAndy variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                    {t('+ Add a send (optional)')}
                  </ButtonAndy>
                ) : null}
              </AutoRow>
            </AutoColumn>
            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={handleOutputSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
            />

            {isExpertMode && recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <ArrowDownIcon width="16px" />
                  </ArrowWrapper>
                  <ButtonAndy variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    {t('- Remove send')}
                  </ButtonAndy>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {showWrap ? null : (
              <AutoColumn gap="8px" style={{ padding: '0 16px' }}>
                {Boolean(trade) && (
                  <RowBetween align="center">
                    <Label>{t('Price')}</Label>
                    <TradePrice
                      price={trade?.executionPrice}
                      showInverted={showInverted}
                      setShowInverted={setShowInverted}
                    />
                  </RowBetween>
                )}
                {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                  <RowBetween align="center">
                    <Label>{t('Slippage Tolerance')}</Label>
                    <Text bold color="primary">
                      {allowedSlippage / 100}%
                    </Text>
                  </RowBetween>
                )}
              </AutoColumn>
            )}
          </AutoColumn>
          <Box mt="1rem">
            {swapIsUnsupported ? (
              <ButtonAndy width="100%" disabled mb="4px">
                {t('Unsupported Asset')}
              </ButtonAndy>
            ) : !account ? (
              <ConnectWalletButton width="100%" />
            ) : showWrap ? (
              <ButtonAndy width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                {wrapInputError ??
                  (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
              </ButtonAndy>
            ) : noRoute && userHasSpecifiedInputOutput ? (
              <GreyCard style={{ textAlign: 'center' }}>
                <Text color="textSubtle" mb="4px">
                  {t('Insufficient liquidity for this trade.')}
                </Text>
                {singleHopOnly && (
                  <Text color="textSubtle" mb="4rpx">
                    {t('Try enabling multi-hop trades.')}
                  </Text>
                )}
              </GreyCard>
            ) : showApproveFlow ? (
              <RowBetween>
                <ButtonAndySmall
                  variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  onClick={approveCallback}
                  disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                  width="48%"
                >
                  {approval === ApprovalState.PENDING ? (
                    <AutoRow gap="6px" justify="center">
                      {t('Enabling')} <CircleLoader stroke="white" />
                    </AutoRow>
                  ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                    t('Enabled')
                  ) : (
                    t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
                  )}
                </ButtonAndySmall>
                <ButtonAndySmall
                  variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        txHash: undefined,
                      })
                      onPresentConfirmModal()
                    }
                  }}
                  width="48%"
                  id="swap-button"
                  disabled={
                    !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                  }
                >
                  {priceImpactSeverity > 3 && !isExpertMode
                    ? t('Price Impact High')
                    : priceImpactSeverity > 2
                      ? t('Swap Anyway')
                      : t('Swap')}
                </ButtonAndySmall>
              </RowBetween>
            ) : (
              <ButtonAndy
                variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      txHash: undefined,
                    })
                    onPresentConfirmModal()
                  }
                }}
                id="swap-button"
                width="100%"
                disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
              >
                {swapInputError ||
                  (priceImpactSeverity > 3 && !isExpertMode
                    ? t('Price Impact Too High')
                    : priceImpactSeverity > 2
                      ? t('Swap Anyway')
                      : t('Swap'))}
              </ButtonAndy>
            )}
            {showApproveFlow && (
              <Column style={{ marginTop: '1rem' }}>
                <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
              </Column>
            )}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
          </Box>
        </Wrapper>
      </AppBody>
      {!swapIsUnsupported ? (
        <AdvancedSwapDetailsDropdown trade={trade} />
      ) : (
        <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
      )}
    </Page>
  )
}
