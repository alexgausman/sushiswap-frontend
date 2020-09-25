import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import { transferX, getCpmContract, getXFundAddress } from '../xfund/utils'

const useTransferX = () => {
  const { account } = useWallet()
  const xFund = useXFund()
  const cpmContract = getCpmContract(xFund)
  const xFundAddress = getXFundAddress(xFund)

  const handleTransfer = useCallback(
    async (xId) => {
      const txHash = await transferX(cpmContract, xId, xFundAddress, account)
      console.log(txHash)
      return txHash
    },
    [account, cpmContract, xFundAddress],
  )

  return { onTransfer: handleTransfer }
}

export default useTransferX
