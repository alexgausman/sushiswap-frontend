import { useCallback } from 'react'

import useXFund from './useXFund'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../xfund/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const sushi = useXFund()
  const masterChefContract = getMasterChefContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
