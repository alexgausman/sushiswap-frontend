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

const RedeemPage: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const [pendingTx, setPendingTx] = useState(false)
  const { onRedeem } = useRedeemX()
  const { onApprove } = useApproveXTransfer()
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={bank} height="120" />}
                title="Give 1 PUNK - Get a X"
                subtitle="The X selection is entirely random."
              />
            </Route>

            <ActionsBox>
              <Button
                text="Approve PUNK Transfer"
                onClick={async () => {
                  setPendingTx(true)
                  await onApprove()
                  setPendingTx(false)
                }}
              />
              <Button
                text="Redeem a X"
                onClick={async () => {
                  setPendingTx(true)
                  await onRedeem()
                  setPendingTx(false)
                }}
              />
            </ActionsBox>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

const ActionsBox = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & input {
    margin-top: 30px;
    width: 100%;
    padding: 7px 13px;
    box-sizing: border-box;
    font-size: 21px;

    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
  }

  & button {
    margin-top: 25px;
  }
`

export default RedeemPage
