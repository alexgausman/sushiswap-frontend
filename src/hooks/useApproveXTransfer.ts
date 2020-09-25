import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import {
  approveXTokenTransfer,
  getXTokenContract,
  getXFundAddress,
} from '../xfund/utils'

const useApproveXTransfer = () => {
  const { account } = useWallet()
  const xFund = useXFund()
  const xTokenContract = getXTokenContract(xFund)
  const xFundAddress = getXFundAddress(xFund)

  const handleApprove = useCallback(async () => {
    const txHash = await approveXTokenTransfer(
      xTokenContract,
      xFundAddress,
      account,
    )
    console.log(txHash)
    return txHash
  }, [account, xTokenContract, xFundAddress])

  return { onApprove: handleApprove }
}

export default useApproveXTransfer
