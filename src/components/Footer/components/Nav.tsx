import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0x87cbbc0f5bd3005765f5e9ac98f83df73fca99f0#code"
      >
        XFund Contract
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xeb18c68e807966d44f21d28ced9788b6fabdc178"
      >
        Uniswap PUNK-ETH
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/NFTX-project">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/XFund">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
