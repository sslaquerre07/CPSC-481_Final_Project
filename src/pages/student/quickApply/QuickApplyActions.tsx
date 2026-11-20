import { Cancel, CheckCircle } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface QuickApplyActionsProps {
  postingPath: string
  canApply: boolean
  missingCount: number
}

function QuickApplyActions({
  postingPath,
  canApply,
  missingCount,
}: QuickApplyActionsProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      sx={{
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        mt: 0.5,
      }}
    >
      <Stack
        direction="row"
        spacing={0.75}
        sx={{ alignItems: 'center', color: canApply ? '#478365' : '#718096' }}
      >
        {canApply ? (
          <CheckCircle sx={{ fontSize: '1.1rem' }} />
        ) : (
          <Cancel sx={{ fontSize: '1.1rem' }} />
        )}
        <Typography variant="body2">
          {canApply
            ? 'All required documents are uploaded.'
            : `Upload the ${missingCount} missing document${missingCount === 1 ? '' : 's'} to apply.`}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button component={Link} to={postingPath} variant="outlined">
          Return to posting
        </Button>
        <Button
          variant="contained"
          disabled={!canApply}
          sx={{ bgcolor: '#304d72' }}
        >
          Apply
        </Button>
      </Stack>
    </Stack>
  )
}

export default QuickApplyActions
