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
import useStageX from '../../hooks/useStageX'
import useTransferX from '../../hooks/useTransferX'
import useWithdrawXToken from '../../hooks/useWithdrawXToken'

// import FarmCards from './components/FarmCards'

const MintPage: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const [xIdInput, setXIdInput] = useState('')
  const [pendingStageTx, setPendingStageTx] = useState(false)
  const [pendingTransferTx, setPendingTransferTx] = useState(false)
  const [pendingWithdrawTx, setPendignWithdrawTx] = useState(false)
  const { onStage } = useStageX()
  const { onTransfer } = useTransferX()
  const { onWithdraw } = useWithdrawXToken()
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={bank} height="120" />}
                title="Give a X - Get 1 PUNK"
                subtitle="Exchanging a X for PUNK is a 3 step process."
              />
            </Route>
            <StyledInfo>
              ⚠️ <b>Warning</b>: Redemptions are random, so it is possible that
              another PUNK holder redeems the X which you deposit.
            </StyledInfo>

            <ActionsBox>
              <input
                value={xIdInput}
                onChange={(e) => setXIdInput(e.target.value)}
                placeholder="X ID #"
              />
              <Button
                text="Stage X"
                onClick={async () => {
                  const xId = parseInt(xIdInput)
                  if (!isNaN(xId)) {
                    setPendingStageTx(true)
                    await onStage(xId)
                    setPendingStageTx(false)
                  }
                }}
              />
              <Button
                text="Transfer X"
                onClick={async () => {
                  const xId = parseInt(xIdInput)
                  if (!isNaN(xId)) {
                    setPendingTransferTx(true)
                    await onTransfer(xId)
                    setPendingTransferTx(false)
                  }
                }}
              />
              <Button
                text="Withdraw 1 PUNK"
                onClick={async () => {
                  const xId = parseInt(xIdInput)
                  if (!isNaN(xId)) {
                    setPendingTransferTx(true)
                    await onWithdraw(xId)
                    setPendingTransferTx(false)
                  }
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

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

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

export default MintPage
