import { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, DialogActions, DialogContent } from '@mui/material'

import useMobile from '@/hooks/useMobile'
import { useAppSelector } from '@/store'
import { OpenPageState } from '@/types/hooks'

import CustomButton from '../button/CustomButton'

interface CheckoutTipProps {
  setOpenPage: Dispatch<SetStateAction<OpenPageState>>
}

function CheckoutTip(props: CheckoutTipProps) {
  const { setOpenPage } = props
  const [open, setOpen] = useState<boolean>(true)

  const [isMobile] = useMobile()
  const role = useAppSelector(({ company }) => company.customer.role)

  const isAgenting = useAppSelector(
    ({ b2bFeatures }) => b2bFeatures.masqueradeCompany.isAgenting
  )

  const { href } = window.location

  if (!href.includes('/checkout')) return null

  return (
    role === 3 &&
    !isAgenting && (
      <Dialog
        sx={{
          zIndex: 99999999993,
          padding: '40px 40px 20px 40px',
        }}
        open={open}
        onClose={() => setOpen(true)}
        fullScreen={isMobile}
      >
        <DialogContent>please select a company</DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CustomButton
            onClick={() => {
              setOpen(false)
              setOpenPage({
                isOpen: true,
                openUrl: '/',
              })
            }}
            variant="contained"
          >
            ok
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  )
}

export default CheckoutTip
