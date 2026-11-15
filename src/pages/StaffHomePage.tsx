import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import DashboardLayout from '../components/DashboardLayout'
import NavigationTile from '../components/NavigationTile'

function StaffHomePage() {
  return (
    <DashboardLayout title="Welcome - Career Centre Staff:">
      <NavigationTile
        to="/staff/drafts"
        icon={<DescriptionOutlinedIcon sx={{ fontSize: 58 }} />}
        title="Drafts"
      />
      <NavigationTile
        to="/staff/published-postings"
        icon={<CheckCircleIcon sx={{ fontSize: 58, color: '#3b9965' }} />}
        title="Published Postings"
      />
      <NavigationTile
        to="/staff/student-reports"
        icon={<ReportProblemOutlinedIcon sx={{ fontSize: 58 }} />}
        title="Student Reports"
      />
    </DashboardLayout>
  )
}

export default StaffHomePage
