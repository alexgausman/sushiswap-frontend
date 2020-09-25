import React from 'react'
import styled from 'styled-components'
import bank from '../../assets/img/bank.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={bank} height={120} />}
        title="A tokenized Xs fund"
        subtitle="1 PUNK token = 1 Xs collectible"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: It makes sense to deposit your least valued Xs since
        all PUNK tokens are equal.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          width: '500px',
        }}
      >
        <Button text="Mint PUNK tokens" to="/mint" variant="secondary" />
        <div style={{ width: '50px' }}></div>
        <Button text="Redeem a X" to="/redeem" variant="secondary" />
      </div>
    </Page>
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

export default Home
