import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import { redeemX, getXFundContract } from '../xfund/utils'

const useRedeemX = () => {
  const { account } = useWallet()
  const xFund = useXFund()
  const xFundContract = getXFundContract(xFund)

  const handleRedeem = useCallback(async () => {
    const txHash = await redeemX(xFundContract, account)
    console.log(txHash)
    return txHash
  }, [account, xFundContract])

  return { onRedeem: handleRedeem }
}

export default useRedeemX
