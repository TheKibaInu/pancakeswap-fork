/* eslint-disable */
import { ConfigMenuItemsType } from './config/config'
import Web3 from 'web3';
import { isAddress } from 'utils';

export const getActiveMenuItem = ({ pathname, menuConfig }: { pathname: string; menuConfig: ConfigMenuItemsType[] }) =>
  menuConfig.find((menuItem) => pathname.startsWith(menuItem.href) || getActiveSubMenuItem({ menuItem, pathname }))

export const getActiveSubMenuItem = ({ pathname, menuItem }: { pathname: string; menuItem?: ConfigMenuItemsType }) => {
  const activeSubMenuItems = menuItem?.items.filter((subMenuItem) => pathname.startsWith(subMenuItem.href)) ?? []

  // Pathname doesn't include any submenu item href - return undefined
  if (!activeSubMenuItems || activeSubMenuItems.length === 0) {
    return undefined
  }

  // Pathname includes one sub menu item href - return it
  if (activeSubMenuItems.length === 1) {
    return activeSubMenuItems[0]
  }

  // Pathname includes multiple sub menu item hrefs - find the most specific match
  const mostSpecificMatch = activeSubMenuItems.sort(
    (subMenuItem1, subMenuItem2) => subMenuItem2.href.length - subMenuItem1.href.length,
  )[0]

  return mostSpecificMatch
}
export const getTokenTaxes = async (address: string): Promise<{honeypot: boolean, buy: number | null, sell: number | null}>=> {
  const web3 = new Web3('https://bsc-dataseed.binance.org/' as any);
  let maxTXAmount = 0;
  let maxSell = 0;

  async function tryGetMaxes() {
    let sig = web3.eth.abi.encodeFunctionSignature({name: '_maxTxAmount', type: 'function', inputs: []});
 let d = {
      to: address,
      from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
      value: 0,
      gas: 15000000,
      data: sig,
  };
  try {
      const val = await web3.eth.call(d);
      maxTXAmount = web3.utils.toBN(val) as any;
      console.log(val, maxTXAmount);
  } catch (e) {
      console.log('_maxTxAmount: ', e);
      // I will nest as much as I want. screw javascript.
      sig = web3.eth.abi.encodeFunctionSignature({name: 'maxSellTransactionAmount', type: 'function', inputs: []});
      d = {
          to: address,
          from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
          value: 0,
          gas: 15000000,
          data: sig,
      };
      try {
          const val2 = await web3.eth.call(d);
          maxSell = web3.utils.toBN(val2) as any;
          console.log(val2, maxSell);
      } catch (e) {

      }
  }
}
  try {
  
  if (!isAddress(address)) return Promise.resolve({honeypot:false, buy: null, sell: null});
  if (isAddress(address)) {
    try {
    const honeyData: Record<string, any> = {};
    const encodedAddress = web3.eth.abi.encodeParameter('address', address);
    const contractFuncData = '0xd66383cb';
    const callData = contractFuncData + encodedAddress.substring(2);
    const tokenName = '';
    const tokenSymbol = '';
    const tokenDecimals = 0;
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
      return  Promise.resolve({honeypot:false, buy: null, sell: null});
    }
    if (unableToCheck[address.toLowerCase()] !== undefined) {
      honeyData.message = unableToCheck[address.toLowerCase()];
      return  Promise.resolve({honeypot:false,buy:null,sell:null});
    }

    let val = 100000000000000000;
    if (bnbIN < val) {
      val = bnbIN - 1000;
    }
    return new Promise<{honeypot: boolean, buy: number | null, sell: number | null }>( (resolve, reject) => {
      web3.eth.call({
        to: '0x2bf75fd2fab5fc635a4c6073864c708dfc8396fc',
        from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
        value: val,
        gas: 45000000,
        data: callData,
        gasPrice: 100
      })
        .then(async (updatedVal) => {
          await tryGetMaxes()
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
            return resolve({honeypot: true, buy: null, sell: null});
          }
          if (+sellGasUsed > 1500000) {
            warnings.push("Selling costs a lot of gas.");
          }
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
          return resolve({honeypot: false, buy: buyTax, sell: sellTax});
        })
        .catch(err => {
          if (err === 'Error: Returned error: execution reverted') {
            return resolve({honeypot: true, buy: null, sell: null});
          }
          return resolve({honeypot: true, buy: null, sell: null});
        });
    })
  } catch (ex) {
    return Promise.resolve({honeypot: true, buy: null, sell: null})
  }
  } else return Promise.resolve({honeypot: false, buy: null, sell: null})
} catch (ex) {
}  return Promise.resolve({honeypot: true, buy: null, sell: null})
}
