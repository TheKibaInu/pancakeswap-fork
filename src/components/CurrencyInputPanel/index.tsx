import React,  { useCallback, useState }  from 'react'
import { Currency, Pair, Token } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex, MetamaskIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import getTokenLogoURL from 'utils/getTokenLogoURL'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'
import { RowBetween, RowFixed } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'
import Popover, { PopoverProps } from './Popover'

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: React.ReactNode
}

interface TooltipContentProps extends Omit<PopoverProps, 'content'> {
  content: React.ReactNode
}

export function useAddTokenToMetamask(currencyToAdd: Currency | undefined): {
  addToken: () => void
  success: boolean | undefined,
  isMetaMask: boolean | undefined
} {
  const { library } = useActiveWeb3React()

  const token: any | undefined = (currencyToAdd as any)

  const [success, setSuccess] = useState<boolean | undefined>()
  const isMetaMask = React.useMemo(() => library && library?.provider && library?.provider?.isMetaMask, [library]);
  const addToken = useCallback(() => {
    console.log(library.provider, token, token?.currency)
    if (library && library.provider &&  library.provider?.isMetaMask && library.provider.request && token) {
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            // @ts-ignore // need this for incorrect ethers provider type
            type: 'ERC20',
            options: {
              address: token.address,
              symbol: token.symbol,
              decimals: token.decimals,
              image: token.symbol === 'KIBA' ? 'https://assets.coingecko.com/coins/images/19525/large/2021-11-13-18-11-18-removebg-preview.png?1636989110' : getTokenLogoURL(token?.address),
            },
          },
        })
        .then((s) => {
          setSuccess(s)
        })
        .catch(() => setSuccess(false))
    } else {
      setSuccess(false)
    }
  }, [library, token])

  return { addToken, success, isMetaMask }
}

export function Tooltip({ text, ...rest }: TooltipProps) {
  return <Popover show={rest.show} content={<>{text}</>} {...rest} />
}

const StyledLogo = styled.img`
  height: 16px;
  width: 16px;
  margin-left: 6px;
`

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')
  const [showMetaTip, setShowMetaTip] = React.useState(false)
  const { addToken, isMetaMask } = useAddTokenToMetamask(currency)
  
  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="14px">{translatedLabel}</Text>
              {account && (
                <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency
                    ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} scale="sm" variant="text">
                  MAX
                </Button>
              )}
            </>
          )}
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
          {currency && currency?.symbol !== "BNB" && isMetaMask && <RowFixed>
            <Tooltip placement='top'
              show={showMetaTip}
              text={`Add ${currency?.name} (${currency?.symbol}) to Metamask`}>
              <MetamaskIcon
                onClick={() => addToken()}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setShowMetaTip(true)}
                onMouseLeave={() => setShowMetaTip(false)}
              />
            </Tooltip>
          </RowFixed>}
        </InputRow>
      </Container>
    </InputPanel>
  )
}
