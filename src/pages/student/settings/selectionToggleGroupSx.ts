import type { SxProps, Theme } from '@mui/material/styles'

const selectionToggleGroupSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  justifySelf: 'start',
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    m: 0,
    border: '1px solid #b8c8dc !important',
    borderRadius: 1,
    bgcolor: '#f4f6f9',
    color: '#355375',
    '&:hover': { bgcolor: '#e8eef6' },
    '&.Mui-selected': {
      bgcolor: '#355375',
      color: 'common.white',
      '&:hover': { bgcolor: '#2c4565' },
    },
  },
}

export default selectionToggleGroupSx
