import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import { stageX, getXFundContract } from '../xfund/utils'

const useStageX = () => {
  const { account } = useWallet()
  const xFund = useXFund()
  const xFundContract = getXFundContract(xFund)

  const handleStage = useCallback(
    async (xId) => {
      const txHash = await stageX(xFundContract, xId, account)
      console.log(txHash)
      return txHash
    },
    [account, xFundContract],
  )

  return { onStage: handleStage }
}

export default useStageX
