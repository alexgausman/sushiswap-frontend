import { useCallback, useEffect, useState } from 'react'
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'

const useXPrice = () => {
  const [xPrice, setXPrice] = useState('')

  const xTokenAddress = '0x243a35Be4fA840321bC2950Df8Ef702b296565b8'

  const PUNK = new Token(ChainId.MAINNET, xTokenAddress, 18)

  const fetchPrice = useCallback(async () => {
    const pair = await Fetcher.fetchPairData(PUNK, WETH[PUNK.chainId])
    const route = new Route([pair], WETH[PUNK.chainId])
    setXPrice(route.midPrice.invert().toSignificant(3))
  }, [PUNK])

  useEffect(() => {
    if (xTokenAddress && PUNK) {
      fetchPrice()
    }
  }, [xTokenAddress, PUNK, fetchPrice])

  return xPrice
}

export default useXPrice
