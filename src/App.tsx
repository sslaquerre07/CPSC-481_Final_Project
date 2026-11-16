import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PortalLayout from './components/PortalLayout'
import FeaturePlaceholderPage from './pages/FeaturePlaceholderPage'
import HomePage from './pages/home/HomePage'
import StaffHomePage from './pages/home/StaffHomePage'
import StudentHomePage from './pages/home/StudentHomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student">
          <Route index element={<StudentHomePage />} />
          <Route element={<PortalLayout view="student" />}>
            <Route
              path=":section/*"
              element={<FeaturePlaceholderPage view="student" />}
            />
          </Route>
        </Route>
        <Route path="/staff">
          <Route index element={<StaffHomePage />} />
          <Route element={<PortalLayout view="staff" />}>
            <Route
              path=":section/*"
              element={<FeaturePlaceholderPage view="staff" />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
