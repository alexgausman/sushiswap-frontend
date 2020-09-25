import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import { withdrawXToken, getXFundContract } from '../xfund/utils'

const useWithdrawXToken = () => {
  const { account } = useWallet()
  const xFund = useXFund()
  const xFundContract = getXFundContract(xFund)

  const handleWithdraw = useCallback(
    async (xId) => {
      const txHash = await withdrawXToken(xFundContract, xId, account)
      console.log(txHash)
      return txHash
    },
    [account, xFundContract],
  )

  return { onWithdraw: handleWithdraw }
}

export default useWithdrawXToken
