import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PortalLayout from './components/PortalLayout'
import FeaturePlaceholderPage from './pages/FeaturePlaceholderPage'
import HomePage from './pages/home/HomePage'
import StaffHomePage from './pages/home/StaffHomePage'
import CurrentPostingsPage from './pages/student/postings/CurrentPostingsPage'
import JobDetailPage from './pages/student/jobs/JobDetailPage'
import QuickApplyPage from './pages/student/quickApply/QuickApplyPage'
import SettingsPage from './pages/student/settings/SettingsPage'
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
              path="current-postings/:jobId/quick-apply"
              element={<QuickApplyPage />}
            />
            <Route
              path="current-postings/:jobId"
              element={<JobDetailPage />}
            />
            <Route
              path="current-postings"
              element={<CurrentPostingsPage />}
            />
            <Route path="settings" element={<SettingsPage />} />
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
