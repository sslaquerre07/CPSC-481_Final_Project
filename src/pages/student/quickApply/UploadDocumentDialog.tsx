import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import type { RequiredDocument } from '../../../store/user/types'

interface UploadDocumentDialogProps {
  documentTitle: RequiredDocument | null
  existingFileName: string
  onClose: () => void
  onSave: (title: RequiredDocument, fileName: string) => void
}

function UploadDocumentDialog({
  documentTitle,
  existingFileName,
  onClose,
  onSave,
}: UploadDocumentDialogProps) {
  const [fileName, setFileName] = useState(existingFileName)
  const isOpen = documentTitle !== null

  const handleSave = () => {
    if (documentTitle && fileName.trim()) {
      onSave(documentTitle, fileName.trim())
      onClose()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="upload-document-title"
    >
      <DialogTitle id="upload-document-title">
        {existingFileName ? 'Replace' : 'Upload'} {documentTitle}
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          For the purposes of this app, enter the name of the required document
          below.
        </Typography>
        <TextField
          autoFocus
          fullWidth
          label="Document name"
          placeholder="e.g. Resume.pdf"
          value={fileName}
          onChange={(event) => setFileName(event.target.value)}
          slotProps={{
            htmlInput: { 'aria-label': 'Document name' },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!fileName.trim()}
          sx={{ bgcolor: '#304d72' }}
        >
          Save document
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadDocumentDialog
