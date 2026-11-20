import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import type { Job } from '../../../store/jobs/types'

interface ExternalApplicationDialogProps {
  job: Job
  open: boolean
  onClose: () => void
}

function ExternalApplicationDialog({
  job,
  open,
  onClose,
}: ExternalApplicationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { maxWidth: 500 } } }}
      aria-labelledby="external-application-dialog-title"
    >
      <DialogTitle
        id="external-application-dialog-title"
        sx={{ color: '#202a35', fontWeight: 700 }}
      >
        Did you apply to {job.title}?
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="caption"
          sx={{ mb: 1.5, color: '#718096', display: 'block' }}
        >
          You opened {job.company}&apos;s application page. If you have submitted
          an application, we&apos;ll add it to Current Applications so you can
          keep track of it.
        </Typography>
        <Typography variant="caption" sx={{ color: '#718096', display: 'block' }}>
          For external applications, you can update the status yourself in
          Current Applications.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} variant="outlined">
          Not yet
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ bgcolor: '#304d72' }}
        >
          Yes, I applied
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExternalApplicationDialog
