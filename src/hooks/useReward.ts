import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../xfund/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const sushi = useXFund()
  const masterChefContract = getMasterChefContract(sushi)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, sushi])

  return { onReward: handleReward }
}

export default useReward
