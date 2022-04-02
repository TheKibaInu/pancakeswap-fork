import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, LinkExternal, Flex, Svg, Image, Button, Alert, alertVariants } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: row;
  }
`

const BubbleWrapper = styled(Flex)`
  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
    transition: background-color 0.2s, opacity 0.2s;
  }
  &:hover {
    svg {
      opacity: 0.65;
    }
  }
  &:active {
    svg {
      opacity: 0.85;
    }
  }
`

const Footer = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (<Wrapper style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Alert title="Did you know?" variant={alertVariants.INFO}>
        <p style={{color: theme.isDark ? '#fff' : '#222'}}>Owning Kiba Inu tokens ensures that every swap you execute on our platform is ran through our automated honey pot checker.</p>
    </Alert>
  </Wrapper>)
}

export default Footer
