import { useContext } from 'react'
import { Context } from '../contexts/XFundProvider'

const useXFund = () => {
  const { xFund: xFund } = useContext(Context)
  return xFund
}

export default useXFund
