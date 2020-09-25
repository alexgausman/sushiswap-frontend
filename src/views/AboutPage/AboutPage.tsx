import React, { useState } from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import bank from '../../assets/img/bank.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'
import useRedeemX from '../../hooks/useRedeemX'
import useApproveXTransfer from '../../hooks/useApproveXTransfer'

// import FarmCards from './components/FarmCards'

const AboutPage: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const [pendingTx, setPendingTx] = useState(false)
  const { onRedeem } = useRedeemX()
  const { onApprove } = useApproveXTransfer()
  return (
    <Switch>
      <Page>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '40vh',
          }}
        >
          More info coming soon...
        </div>
      </Page>
    </Switch>
  )
}

const Container = styled.div``

export default AboutPage
