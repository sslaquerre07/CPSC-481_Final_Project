import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import DashboardLayout from '../../components/DashboardLayout'
import NavigationTile from '../../components/NavigationTile'

function StudentHomePage() {
  return (
    <DashboardLayout title="Welcome Sam:">
      <NavigationTile
        to="/student/current-postings"
        icon={<DescriptionOutlinedIcon sx={{ fontSize: 58 }} />}
        title="Current Postings"
        description="8 new postings"
      />
      <NavigationTile
        to="/student/current-applications"
        icon={<FolderOpenOutlinedIcon sx={{ fontSize: 58 }} />}
        title="Current Applications"
        description="3 status updates"
      />
      <NavigationTile
        to="/student/issue-reports"
        icon={<ReportProblemOutlinedIcon sx={{ fontSize: 58 }} />}
        title="Issue Reports"
      />
      <NavigationTile
        to="/student/settings"
        icon={<TuneOutlinedIcon sx={{ fontSize: 58 }} />}
        title="User Settings"
      />
    </DashboardLayout>
  )
}

export default StudentHomePage
