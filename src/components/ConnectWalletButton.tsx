import React from 'react'
import { Button, useWalletModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { ButtonLight } from './Buttons'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)


  return (
    <ButtonLight 
    onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </ButtonLight>
  )
}

export default ConnectWalletButton
