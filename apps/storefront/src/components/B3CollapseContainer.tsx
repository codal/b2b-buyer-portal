import {
  Box,
  Collapse,
  Typography,
} from '@mui/material'

import {
  useState,
  ReactNode,
  ReactElement,
  useEffect,
} from 'react'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

interface CollapseContainerProps{
  title?: string | ReactElement,
  header?: ReactNode,
  defaultOpen?: boolean,
  children: ReactNode,
  handleOnChange?: (open: boolean) => void
}

export const B3CollapseContainer = (props: CollapseContainerProps) => {
  const {
    children,
    title = '',
    header,
    defaultOpen = false,
    handleOnChange,
  } = props

  const [open, setOpen] = useState(defaultOpen)

  const handleClick = () => {
    setOpen(!open)
  }
  useEffect(() => {
    if (handleOnChange) handleOnChange(open)
  }, [open])

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        {header || <Typography variant="h5">{title}</Typography>}
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {children}
      </Collapse>
    </Box>
  )
}