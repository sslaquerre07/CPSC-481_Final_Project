import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import FeaturePlaceholderPage from './pages/FeaturePlaceholderPage'
import HomePage from './pages/HomePage'
import StaffHomePage from './pages/StaffHomePage'
import StudentHomePage from './pages/StudentHomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={<StudentHomePage />} />
        <Route path="/staff" element={<StaffHomePage />} />
        <Route path="/:view/:section" element={<FeaturePlaceholderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
