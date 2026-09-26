import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import CandidateDashboard from "./pages/candidate/CandidateDashboard"
import PlaceholderPage from "./pages/shared/PlaceholderPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/candidate" element={<CandidateDashboard />} />

          <Route
            path="/candidate/market-demand"
            element={
              <PlaceholderPage
                title="Market demand"
                description="Current role and skill demand will appear here."
              />
            }
          />

          <Route
            path="/candidate/skill-evidence-gap"
            element={
              <PlaceholderPage
                title="Skill & evidence gap"
                description="Your role-specific skill gaps and evidence gaps will appear here."
              />
            }
          />

          <Route
            path="/candidate/experience-bridge"
            element={
              <PlaceholderPage
                title="Experience Bridge"
                description="Role-specific practical tasks will appear here."
              />
            }
          />

          <Route
            path="/candidate/jobs"
            element={
              <PlaceholderPage
                title="Jobs"
                description="Explainable job recommendations will appear here."
              />
            }
          />

          <Route
            path="/candidate/profile"
            element={
              <PlaceholderPage
                title="Profile"
                description="Your profile and competency information will appear here."
              />
            }
          />

          <Route
            path="/candidate/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Account and preference settings will appear here."
              />
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/candidate" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
