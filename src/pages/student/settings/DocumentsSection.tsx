import { useState } from 'react'
import {
  Add,
  Check,
  DeleteOutlined,
  EditOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  addDocument,
  removeCustomDocument,
  updateDocument,
} from '../../../store/user/reducer'
import { selectUser } from '../../../store/user/selectors'
import type { UserDocument } from '../../../store/user/types'
import SettingsPanel from './SettingsPanel'

function normalizedTitle(title: string) {
  return title.trim().toLowerCase()
}

function hasDuplicateTitle(documents: UserDocument[], index: number) {
  const title = normalizedTitle(documents[index]?.file_title ?? '')
  return (
    title !== '' &&
    documents.some(
      (document, otherIndex) =>
        otherIndex !== index && normalizedTitle(document.file_title) === title,
    )
  )
}

interface DocumentRowProps {
  document: UserDocument
  index: number
  documents: UserDocument[]
  isEditing: boolean
  anotherDocumentIsEditing: boolean
  onEdit: () => void
  onSave: () => void
  onRemove: () => void
  onChange: (field: 'file_title' | 'file_name', value: string) => void
}

function DocumentRow({
  document,
  index,
  documents,
  isEditing,
  anotherDocumentIsEditing,
  onEdit,
  onSave,
  onRemove,
  onChange,
}: DocumentRowProps) {
  const duplicateTitle = document.isCustom && hasDuplicateTitle(documents, index)
  const titleIsMissing = document.isCustom && !document.file_title.trim()
  const filenameIsMissing = !document.file_name.trim()
  const cannotSave =
    duplicateTitle || titleIsMissing || filenameIsMissing

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr auto',
          sm: '7rem minmax(0, 1fr) auto',
        },
        alignItems: 'center',
        gap: 1,
        py: 1,
      }}
    >
      {isEditing && document.isCustom ? (
        <TextField
          size="small"
          value={document.file_title}
          placeholder="Document title"
          error={duplicateTitle || titleIsMissing}
          slotProps={{
            htmlInput: { 'aria-label': 'Document title' },
          }}
          onChange={(event) => onChange('file_title', event.target.value)}
          sx={{ gridColumn: { xs: '1 / -1', sm: 'auto' } }}
        />
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            gridColumn: { xs: '1 / -1', sm: 'auto' },
          }}
        >
          {document.file_title || 'Custom document'}:
        </Typography>
      )}
      <TextField
        size="small"
        value={document.file_name}
        placeholder="Filename"
        error={isEditing && filenameIsMissing}
        slotProps={{
          htmlInput: {
            'aria-label': `${document.file_title || 'Custom document'} filename`,
            readOnly: !isEditing,
          },
        }}
        onChange={(event) => onChange('file_name', event.target.value)}
        sx={{
          '& .MuiInputBase-root': {
            bgcolor: isEditing ? 'common.white' : '#edf2f8',
          },
        }}
      />
      {isEditing ? (
        <Stack direction="row" spacing={0.25}>
          <IconButton
            aria-label="Save document"
            onClick={onSave}
            disabled={cannotSave}
            size="small"
            sx={{ color: '#37865b' }}
          >
            <Check fontSize="small" />
          </IconButton>
          {document.isCustom && (
            <IconButton
              aria-label={`Remove ${document.file_title || 'custom document'}`}
              onClick={onRemove}
              disabled={anotherDocumentIsEditing}
              size="small"
              sx={{ color: '#b33a3a' }}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          )}
        </Stack>
      ) : document.isCustom ? (
        <Stack direction="row" spacing={0.25}>
          <IconButton
            aria-label={`Edit ${document.file_title || 'custom document'}`}
            onClick={onEdit}
            disabled={anotherDocumentIsEditing}
            size="small"
          >
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Remove ${document.file_title || 'custom document'}`}
            onClick={onRemove}
            disabled={anotherDocumentIsEditing}
            size="small"
            sx={{ color: '#b33a3a' }}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <Button
          variant="outlined"
          size="small"
          onClick={onEdit}
          disabled={anotherDocumentIsEditing}
        >
          Update
        </Button>
      )}
    </Box>
  )
}

function DocumentsSection() {
  const { documents } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [editingDocument, setEditingDocument] = useState<number | null>(null)

  const handleAddDocument = () => {
    dispatch(addDocument())
    setEditingDocument(documents.length)
  }

  const handleRemoveDocument = (index: number) => {
    dispatch(removeCustomDocument(index))
    setEditingDocument((current) => (current === index ? null : current))
  }

  return (
    <SettingsPanel
      title="Documents"
      description="These documents are used for Quick Apply applications."
      maxHeight="70vh"
    >
      <Stack divider={<Box sx={{ borderBottom: '1px solid #e6eaf0' }} />}>
        {documents.map((document, index) => (
          <DocumentRow
            key={index}
            document={document}
            index={index}
            documents={documents}
            isEditing={editingDocument === index}
            anotherDocumentIsEditing={
              editingDocument !== null && editingDocument !== index
            }
            onEdit={() => setEditingDocument(index)}
            onSave={() => setEditingDocument(null)}
            onRemove={() => handleRemoveDocument(index)}
            onChange={(field, value) =>
              dispatch(updateDocument({ index, field, value }))
            }
          />
        ))}
      </Stack>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddDocument}
        disabled={editingDocument !== null}
        sx={{ mt: 1.5, justifyContent: 'flex-start' }}
      >
        Add Custom Documents
      </Button>
    </SettingsPanel>
  )
}

export default DocumentsSection
