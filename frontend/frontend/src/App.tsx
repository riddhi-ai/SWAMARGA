import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Collaborators from './pages/public/Collaborators'
import Help from './pages/public/Help'
import Contact from './pages/public/Contact'

import { Login, Signup, VerifyEmail, AccessDenied } from './pages/auth/AuthPages'

import {
  CandidateDashboard,
  CandidateProfile,
  MarketDemand,
  SkillEvidenceGap,
  ExperienceBridge,
  ExperienceTask,
  Training,
  Passport,
  Jobs,
  Applications,
  InstituteDashboard,
  InstitutePage,
  EmployerDashboard,
  EmployerPage,
  GovernmentDashboard,
  GovernmentPage,
  AdminPage,
} from './pages/workspaces/WorkspacePages'

import './styles/index.css'

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
        <Route path="profile" element={<CandidateProfile />} />
        <Route path="market-demand" element={<MarketDemand />} />
        <Route path="skill-evidence-gap" element={<SkillEvidenceGap />} />
        <Route path="experience-bridge" element={<ExperienceBridge />} />
        <Route path="experience-bridge/task-1" element={<ExperienceTask />} />
        <Route path="training" element={<Training />} />
        <Route path="passport" element={<Passport />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applications" element={<Applications />} />
      </Route>

      <Route path="/institute">
        <Route index element={<InstituteDashboard />} />
        <Route path="industry-demand" element={<InstitutePage title="Industry demand" description="Review current role and skill demand signals relevant to training decisions." />} />
        <Route path="courses" element={<InstitutePage title="Courses" description="Review courses and their current relationship to market requirements." />} />
        <Route path="course-health" element={<InstitutePage title="Course health" description="Identify courses and modules that may require review." />} />
        <Route path="curriculum" element={<InstitutePage title="Curriculum" description="Compare curriculum content with current competency requirements." />} />
        <Route path="trainers" element={<InstitutePage title="Trainers" description="Review trainer availability and planning requirements." />} />
        <Route path="labs" element={<InstitutePage title="Labs & equipment" description="Review practical infrastructure and equipment capacity." />} />
        <Route path="capacity" element={<InstitutePage title="Training capacity" description="Compare seats, trainers and practical infrastructure." />} />
        <Route path="placements" element={<InstitutePage title="Placements" description="Review placement outcomes and role alignment." />} />
        <Route path="employer-feedback" element={<InstitutePage title="Employer feedback" description="Review employer feedback linked to training outcomes." />} />
        <Route path="simulator" element={<InstitutePage title="What-if capacity simulator" description="Test possible changes to seats, trainers and infrastructure." />} />
      </Route>

      <Route path="/employer">
        <Route index element={<EmployerDashboard />} />
        <Route path="hiring-demand" element={<EmployerPage title="Hiring demand" description="Define and review workforce requirements." />} />
        <Route path="required-skills" element={<EmployerPage title="Required skills" description="Define the competencies associated with roles." />} />
        <Route path="competency-framework" element={<EmployerPage title="Competency framework" description="Structure role requirements into observable competencies." />} />
        <Route path="candidates" element={<EmployerPage title="Candidates" description="Review candidates and the evidence they have submitted." />} />
        <Route path="validate" element={<EmployerPage title="Validation" description="Validate demonstrated competencies or request additional evidence." />} />
        <Route path="jobs" element={<EmployerPage title="Jobs" description="Manage role requirements and opportunities." />} />
        <Route path="outcomes" element={<EmployerPage title="Outcomes" description="Review placement and employment outcomes." />} />
        <Route path="feedback" element={<EmployerPage title="Feedback" description="Provide structured feedback on workforce readiness." />} />
      </Route>

      <Route path="/government">
        <Route index element={<GovernmentDashboard />} />
        <Route path="district-intelligence" element={<GovernmentPage title="District intelligence" description="Review aggregated workforce signals by district." />} />
        <Route path="labour-market" element={<GovernmentPage title="Labour market" description="Review role, skill and sector demand signals." />} />
        <Route path="course-intelligence" element={<GovernmentPage title="Course intelligence" description="Review course health against workforce demand." />} />
        <Route path="ecosystem" element={<GovernmentPage title="Skills ecosystem" description="Review the connected workforce ecosystem." />} />
        <Route path="verification" element={<GovernmentPage title="Verification" description="Review organisation and access verification." />} />
        <Route path="capacity" element={<GovernmentPage title="Capacity planning" description="Review trainer, seat and infrastructure capacity." />} />
        <Route path="simulator" element={<GovernmentPage title="Capacity simulator" description="Explore possible planning scenarios." />} />
        <Route path="plans" element={<GovernmentPage title="Intervention plans" description="Create and review workforce planning actions." />} />
        <Route path="outcomes" element={<GovernmentPage title="Outcomes" description="Review placement and employer outcome signals." />} />
        <Route path="alerts" element={<GovernmentPage title="Alerts" description="Review information requiring planning attention." />} />
      </Route>

      <Route path="/admin">
        <Route index element={<AdminPage title="Administration" description="Operational controls for the SWAMARGA prototype." />} />
        <Route path="users" element={<AdminPage title="Users" description="Review user records and access status." />} />
        <Route path="verification" element={<AdminPage title="Verification" description="Review organisation and account verification queues." />} />
        <Route path="organisations" element={<AdminPage title="Organisations" description="Review registered organisations." />} />
        <Route path="data" element={<AdminPage title="Data" description="Review imported and demonstration data." />} />
        <Route path="content" element={<AdminPage title="Content" description="Review platform information and resources." />} />
        <Route path="audit" element={<AdminPage title="Audit" description="Review administrative activity." />} />
        <Route path="settings" element={<AdminPage title="Settings" description="Platform configuration." />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
