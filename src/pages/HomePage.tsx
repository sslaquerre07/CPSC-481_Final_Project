import PersonIcon from '@mui/icons-material/Person'
import GroupsIcon from '@mui/icons-material/Groups'
import DashboardLayout from '../components/DashboardLayout'
import NavigationTile from '../components/NavigationTile'

function HomePage() {
  return (
    <DashboardLayout title="Choose your view:">
      <NavigationTile
        to="/student"
        icon={<PersonIcon sx={{ fontSize: 64 }} />}
        title="Student View"
      />
      <NavigationTile
        to="/staff"
        icon={<GroupsIcon sx={{ fontSize: 64 }} />}
        title="Staff View"
      />
    </DashboardLayout>
  )
}

export default HomePage
