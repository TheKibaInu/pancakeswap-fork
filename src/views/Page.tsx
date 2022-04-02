import React from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  padding-bottom: 5px;
  background: '#252632';

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }



  
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>
        {children}
        <Flex flexGrow={1} />
      </StyledPage>
    </>
  )
}

export default Page
