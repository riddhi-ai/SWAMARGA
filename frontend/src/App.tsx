import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import PlaceholderPage from './pages/shared/PlaceholderPage'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Collaborators from './pages/public/Collaborators'
import Help from './pages/public/Help'
import Contact from './pages/public/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import VerifyEmail from './pages/auth/VerifyEmail'
import AccessDenied from './pages/auth/AccessDenied'
import './styles/public.css'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collaborators" element={<Collaborators />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Route>

      <Route path="/candidate" element={<DashboardLayout />}>
        <Route index element={<CandidateDashboard />} />
        <Route
          path="profile"
          element={
            <PlaceholderPage
              title="My Profile"
              description="Candidate profile and career information."
            />
          }
        />
        <Route
          path="market-demand"
          element={
            <PlaceholderPage
              title="Market Demand"
              description="Current role and skill demand information."
            />
          }
        />
        <Route
          path="skill-evidence-gap"
          element={
            <PlaceholderPage
              title="Skill & Evidence Gap"
              description="Detailed skill and evidence assessment."
            />
          }
        />
        <Route
          path="experience-bridge"
          element={
            <PlaceholderPage
              title="Experience Bridge"
              description="Practical tasks for building and demonstrating evidence."
            />
          }
        />
        <Route
          path="training"
          element={
            <PlaceholderPage
              title="Training"
              description="Relevant training pathways."
            />
          }
        />
        <Route
          path="passport"
          element={
            <PlaceholderPage
              title="Competency Passport"
              description="Demonstrated and validated competencies."
            />
          }
        />
        <Route
          path="jobs"
          element={
            <PlaceholderPage
              title="Jobs"
              description="Relevant opportunities and explainable matches."
            />
          }
        />
        <Route
          path="applications"
          element={
            <PlaceholderPage
              title="Applications"
              description="Track submitted applications."
            />
          }
        />
      </Route>

      <Route
        path="/institute"
        element={
          <PlaceholderPage
            title="Training Institute"
            description="Institute workspace is part of the next implementation stage."
          />
        }
      />

      <Route
        path="/employer"
        element={
          <PlaceholderPage
            title="Employer"
            description="Employer workspace is part of the next implementation stage."
          />
        }
      />

      <Route
        path="/government"
        element={
          <PlaceholderPage
            title="Government"
            description="Government workspace is part of the next implementation stage."
          />
        }
      />

      <Route
        path="/admin"
        element={
          <PlaceholderPage
            title="Administration"
            description="Administration workspace is part of the next implementation stage."
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
