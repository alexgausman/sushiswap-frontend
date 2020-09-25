import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import MoneyIcon from '../../../components/MoneyIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useXFund from '../../../hooks/useXFund'
import useXPrice from '../../../hooks/useXPrice'
import {
  getXFundAddress,
  getXTokenAddress,
  getXTokenSupply,
} from '../../../xfund/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getBalance } from '../../../utils/erc20'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  /* const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  } */

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [circSupply, setCircSupply] = useState<BigNumber>()
  const xFund = useXFund()
  const xTokenBalance = useTokenBalance(getXTokenAddress(xFund))
  const reserveSupply = useTokenBalance(
    getXTokenAddress(xFund),
    getXFundAddress(xFund),
  )
  const xPrice = useXPrice()
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchSupplyInfo() {
      const supply = await getXTokenSupply(xFund)
      setCircSupply(supply.minus(reserveSupply))
    }
    if (xFund && reserveSupply && reserveSupply.toString() !== '0') {
      fetchSupplyInfo()
    }
  }, [xFund, setCircSupply, reserveSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <MoneyIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your PUNK Balance" />
                <Value
                  value={!!account ? getBalanceNumber(xTokenBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          PUNK price
          <FootnoteValue>{xPrice && `Ξ ${xPrice}`}</FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <Label text="Circulating PUNK Supply" />
          <Value value={circSupply ? getBalanceNumber(circSupply) : 'Locked'} />
        </CardContent>
        <Footnote>
          Max supply
          <FootnoteValue>10,000 PUNK</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
