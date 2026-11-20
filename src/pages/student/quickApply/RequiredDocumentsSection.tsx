import { useState } from 'react'
import {
  Cancel,
  CheckCircle,
  FileUploadOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/user/selectors'
import { saveRequiredDocument } from '../../../store/user/reducer'
import type { RequiredDocument } from '../../../store/user/types'
import type { Job } from '../../../store/jobs/types'
import UploadDocumentDialog from './UploadDocumentDialog'

interface RequiredDocumentsSectionProps {
  job: Job
}

function RequiredDocumentsSection({ job }: RequiredDocumentsSectionProps) {
  const { documents } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [selectedDocument, setSelectedDocument] =
    useState<RequiredDocument | null>(null)

  const getDocumentFileName = (title: RequiredDocument) =>
    documents.find((document) => document.file_title === title)?.file_name ?? ''

  const uploadedCount = job.requiredDocuments.filter((title) =>
    getDocumentFileName(title).trim(),
  ).length
  const selectedFileName = selectedDocument
    ? getDocumentFileName(selectedDocument)
    : ''

  const handleSaveDocument = (title: RequiredDocument, fileName: string) => {
    dispatch(saveRequiredDocument({ file_title: title, file_name: fileName }))
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#d5dde7',
          borderRadius: 1.5,
          bgcolor: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
            p: { xs: 1.5, sm: 2 },
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Required documents
            </Typography>
            <Typography variant="caption" color="text.secondary">
              For this demo, provide each required document by entering its filename.
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: 'nowrap', fontWeight: 600 }}
          >
            {uploadedCount} of {job.requiredDocuments.length} uploaded
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#d5dde7' }} />
        <Stack divider={<Divider flexItem sx={{ borderColor: '#e1e5eb' }} />}>
          {job.requiredDocuments.map((title) => {
            const fileName = getDocumentFileName(title)
            const isUploaded = Boolean(fileName.trim())

            return (
              <Box
                key={title}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'auto minmax(0, 1fr)',
                    sm: 'auto minmax(0, 1fr) minmax(5rem, auto) auto',
                  },
                  alignItems: 'center',
                  columnGap: { xs: 1, sm: 1.5 },
                  rowGap: 0.5,
                  p: { xs: 1.5, sm: 2 },
                }}
              >
                {isUploaded ? (
                  <CheckCircle sx={{ color: '#478365' }} />
                ) : (
                  <Cancel sx={{ color: '#c34b4b' }} />
                )}
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ overflowWrap: 'anywhere' }}
                  >
                    {isUploaded ? fileName : 'No document uploaded'}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    color: isUploaded ? '#478365' : '#c34b4b',
                    fontWeight: 700,
                  }}
                >
                  {isUploaded ? 'Uploaded' : 'Missing'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FileUploadOutlined />}
                  onClick={() => setSelectedDocument(title)}
                  sx={{
                    whiteSpace: 'nowrap',
                    gridColumn: { xs: '2 / -1', sm: 'auto' },
                    justifySelf: 'start',
                  }}
                >
                  {isUploaded ? 'Replace document' : 'Upload document'}
                </Button>
              </Box>
            )
          })}
        </Stack>
      </Card>

      <UploadDocumentDialog
        key={selectedDocument ?? 'closed'}
        documentTitle={selectedDocument}
        existingFileName={selectedFileName}
        onClose={() => setSelectedDocument(null)}
        onSave={handleSaveDocument}
      />
    </>
  )
}

export default RequiredDocumentsSection
