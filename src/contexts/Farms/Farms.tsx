import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useXFund from '../../hooks/useXFund'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../xfund/utils'
import { getFarms } from '../../xfund/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useXFund()
  const { account } = useWallet()

  const farms = getFarms(sushi)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
