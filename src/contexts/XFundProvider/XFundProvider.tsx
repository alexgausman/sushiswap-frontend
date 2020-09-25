import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { XFund } from '../../xfund'

export interface XFundContext {
  xFund?: typeof XFund
}

export const Context = createContext<XFundContext>({
  xFund: undefined,
})

declare global {
  interface Window {
    xFundLib: any
  }
}

const XFundProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [xFund, setXFund] = useState<any>()

  // @ts-ignore
  window.xFund = xFund
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const xFundLib = new XFund(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setXFund(xFundLib)
      window.xFundLib = xFundLib
    }
  }, [ethereum])

  return (
    <Context.Provider value={{ xFund: xFund }}>{children}</Context.Provider>
  )
}

export default XFundProvider
