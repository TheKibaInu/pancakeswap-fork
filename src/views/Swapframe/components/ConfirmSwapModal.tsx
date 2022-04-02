import React, { useCallback, useMemo } from 'react'
import { currencyEquals, Trade } from '@pancakeswap/sdk'
import { InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import { isAddress } from 'utils'
import Web3 from 'web3'
import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'
import SwapModalFooter from './SwapModalFooter'
import SwapModalHeader from './SwapModalHeader'
/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA: Trade, tradeB: Trade): boolean {
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !currencyEquals(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
    !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  )
}
interface ConfirmSwapModalProps {
  trade?: Trade
  originalTrade?: Trade
  attemptingTxn: boolean
  txHash?: string
  recipient: string | null
  allowedSlippage: number
  onAcceptChanges: () => void
  onConfirm: () => void
  swapErrorMessage?: string
  customOnDismiss?: () => void
}

// eslint-disable-next-line
const isHoneyPot = (address: string): Promise<boolean>=> {
  const provider = window.ethereum;
  const web3 = new Web3(provider as any);
  if (!isAddress(address)) return Promise.resolve(false);
  if (isAddress(address)) {
    const honeyData: Record<string, any> = {};
    const encodedAddress = web3.eth.abi.encodeParameter('address', address);
    const contractFuncData = '0xd66383cb';
    const callData = contractFuncData + encodedAddress.substring(2);
    const tokenName = '';
    const tokenSymbol = '';
    const tokenDecimals = 0;
    const maxSell = 0;
    const maxTXAmount = 0;
    const bnbIN = 1000000000000000000;
    const maxTxBNB: any = null;
    const blacklisted: Record<string, string> = {
      '0xa914f69aef900beb60ae57679c5d4bc316a2536a': 'SPAMMING SCAM',
      '0x105e62565a31c269439b29371df4588bf169cef5': 'SCAM',
      '0xbbd1d56b4ccab9302aecc3d9b18c0c1799fe7525': 'Error: TRANSACTION_FROM_FAILED'
    };
    const unableToCheck: Record<string, string> = {
      '0x54810d2e8d3a551c8a87390c4c18bb739c5b2063': 'Coin does not utilise PancakeSwap'
    };

    if (blacklisted[address.toLowerCase()]) {
      honeyData.message = blacklisted[address.toLowerCase()];
      return  Promise.resolve(false);
    }
    if (unableToCheck[address.toLowerCase()] !== undefined) {
      honeyData.message = unableToCheck[address.toLowerCase()];
      return  Promise.resolve(false);
    }

    let val = 100000000000000000;
    if (bnbIN < val) {
      val = bnbIN - 1000;
    }
    return new Promise<boolean>((resolve, reject) => {
      web3.eth.call({
        to: '0x2bf75fd2fab5fc635a4c6073864c708dfc8396fc',
        from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
        value: val,
        gas: 45000000,
        data: callData,
      })
        .then((updatedVal) => {
          const warnings = [];
          const decoded = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], updatedVal);
          const buyExpectedOut = web3.utils.toBN(decoded[0]);
          const buyActualOut = web3.utils.toBN(decoded[1]);
          const sellExpectedOut = web3.utils.toBN(decoded[2]);
          const sellActualOut = web3.utils.toBN(decoded[3]);
          const buyGasUsed = web3.utils.toBN(decoded[4]);
          const sellGasUsed = web3.utils.toBN(decoded[5]);
          const buyTax = Math.round((+buyExpectedOut - +buyActualOut) / +buyExpectedOut * 100 * 10) / 10;
          const sellTax = Math.round((+sellExpectedOut - +sellActualOut) / +sellExpectedOut * 100 * 10) / 10;

          honeyData.sellTax = sellTax;
          honeyData.buyTax = buyTax;
          if (+buyTax + +sellTax > 80) {
            honeyData.isHoneyPot = true;
            warnings.push("Extremely high tax. Effectively a honeypot.")
            return resolve(true);
          }
          if (+sellGasUsed > 1500000) {
            warnings.push("Selling costs a lot of gas.");
          }
          console.log(buyTax, sellTax);
          let maxDiv = '';
          if (maxTXAmount !== 0 || maxSell !== 0) {
            let n = 'Max TX';
            let x = maxTXAmount;
            if (maxSell !== 0) {
              n = 'Max Sell';
              x = maxSell;
              honeyData.maxSell = maxSell;
            }
            let bnbWorth: number | string = '?'
            if (maxTxBNB !== null) {
              bnbWorth = Math.round(maxTxBNB / 10 ** 15) / 10 ** 3;
              honeyData.maxTxAmount = maxSell;
            }
            const tokens = Math.round(x / 10 ** tokenDecimals);
            maxDiv = `<p>${n}: ${tokens} ${tokenSymbol} (~ ${bnbWorth} BNB)</p>`;
          }
          let warningmsg = '';
          let uiType = 'success';
          let warningsEncountered = false;
          if (warnings.length > 0) {
            warningsEncountered = true;
            uiType = 'warning';
            warningmsg = '<p><ul>WARNINGS';
            for (let i = 0; i < warnings.length; i++) {
              warningmsg += `<li>${warnings[i]}</li>`;
            }
            warningmsg += '</ul></p>';
          }
          return resolve(false);
        })
        .catch(err => {
          if (err === 'Error: Returned error: execution reverted') {
            return resolve(true);
          }
          return resolve(true);
        });
    })
  }
}

const Badge = styled.div`
align-items: center;
border-radius: 5px;
display: flex;
justify-content: space-around;
line-height: 1rem;
margin-left: 10px;
padding: 0.375rem 0.5rem;
color:#FFF;
&:before {
  content: "";
  position: absolute;
  inset: 0px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(to right, red, orange);
}
;`
const ConfirmSwapModal: React.FC<InjectedModalProps & ConfirmSwapModalProps> = ({
  trade,
  originalTrade,
  onAcceptChanges,
  allowedSlippage,
  onConfirm,
  onDismiss,
  customOnDismiss,
  recipient,
  swapErrorMessage,
  attemptingTxn,
  txHash,
}) => {
  const showAcceptChanges = useMemo(
    () => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)),
    [originalTrade, trade],
  )
  const [isBad, setIsBad] = React.useState(false)

  React.useEffect(() => {
    const runCheck = async () => {
      if (trade && (trade?.inputAmount?.currency as any)?.address) {
        const isBadTrade = await Promise.all([isHoneyPot((trade?.inputAmount?.currency as any)?.address), isHoneyPot((trade?.outputAmount?.currency as any)?.address)]);
        setIsBad(isBadTrade?.some((b: boolean | undefined) => !!b));
      }
    }
    runCheck()
  }, [trade])


  const onConfirmCb = React.useCallback(() => {
    if (isBad) {
      if (window.confirm('Kiba Honeypot Checker has detected one or more of the tokens you are swapping to is a honeypot. Are you sure you want to continue?')) {
        onConfirm();
      }
    } else {
      onConfirm()
    }
  }, [isBad, onConfirm])
  const { t } = useTranslation()

  const modalHeader = useCallback(() => {
    return trade ? (
      <><SwapModalHeader
        trade={trade}
        allowedSlippage={allowedSlippage}
        recipient={recipient}
        showAcceptChanges={showAcceptChanges}
        onAcceptChanges={onAcceptChanges}
      />
        {isBad && <Badge> <AlertTriangle /> &nbsp; Kiba Honeypot Checker has detected one or more of the tokens your swapping is a honeypot!</Badge>}

      </>
    ) : null
  }, [allowedSlippage, isBad, onAcceptChanges, recipient, showAcceptChanges, trade])

  const modalBottom = useCallback(() => {
    return trade ? (
      <SwapModalFooter
        onConfirm={onConfirmCb}
        trade={trade}
        disabledConfirm={showAcceptChanges}
        swapErrorMessage={swapErrorMessage}
        allowedSlippage={allowedSlippage}
      />
    ) : null
  }, [allowedSlippage, onConfirmCb, showAcceptChanges, swapErrorMessage, trade])

  // text to show while loading
  const pendingText = t('Swapping %amountA% %symbolA% for %amountB% %symbolB%', {
    amountA: trade?.inputAmount?.toSignificant(6) ?? '',
    symbolA: trade?.inputAmount?.currency?.symbol ?? '',
    amountB: trade?.outputAmount?.toSignificant(6) ?? '',
    symbolB: trade?.outputAmount?.currency?.symbol ?? '',
  })

  const confirmationContent = useCallback(
    () =>
      swapErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
      ) : (
        <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
      ),
    [onDismiss, modalBottom, modalHeader, swapErrorMessage],
  )

  return (
    <TransactionConfirmationModal
      title={t('Confirm Swap')}
      onDismiss={onDismiss}
      customOnDismiss={customOnDismiss}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={confirmationContent}
      pendingText={pendingText}
      currencyToAdd={trade?.outputAmount.currency}
    />
  )
}

export default ConfirmSwapModal
