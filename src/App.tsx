
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public Pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Collaborators from './pages/public/Collaborators'
import Help from './pages/public/Help'
import Contact from './pages/public/Contact'

// Auth Pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import VerifyEmail from './pages/auth/VerifyEmail'
import AccessDenied from './pages/auth/AccessDenied'

// Candidate Pages (Primary Demo)
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import CandidateProfile from './pages/candidate/CandidateProfile'
import MarketDemand from './pages/candidate/MarketDemand'
import SkillEvidenceGap from './pages/candidate/SkillEvidenceGap'
import ExperienceBridge from './pages/candidate/ExperienceBridge'
import ExperienceTaskDetail from './pages/candidate/ExperienceTaskDetail'
import Training from './pages/candidate/Training'
import CompetencyPassport from './pages/candidate/CompetencyPassport'
import Jobs from './pages/candidate/Jobs'
import JobDetail from './pages/candidate/JobDetail'
import Applications from './pages/candidate/Applications'

// Institute Pages
import InstituteDashboard from './pages/institute/InstituteDashboard'
import WhatIfSimulator from './pages/institute/WhatIfSimulator'
import CourseHealth from './pages/institute/CourseHealth'
import InstituteGenericPage from './pages/institute/InstituteGenericPage'

// Employer Pages
import EmployerDashboard from './pages/employer/EmployerDashboard'
import ValidateCompetency from './pages/employer/ValidateCompetency'
import EmployerGenericPage from './pages/employer/EmployerGenericPage'

// Government Pages
import GovernmentDashboard from './pages/government/GovernmentDashboard'
import DistrictIntelligence from './pages/government/DistrictIntelligence'
import GovernmentGenericPage from './pages/government/GovernmentGenericPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminGenericPage from './pages/admin/AdminGenericPage'

// Shared generic columns for sub-screens
const genericColumns = [
  { header: 'Item / Record', accessor: (r: any) => <strong className="text-(--navy)]">{r[0]}</strong> },
  { header: 'Status / Context', accessor: (r: any) => <span className="text-xs text-[#202124]">{r[1]}</span> },
  { header: 'Planning Action', accessor: (r: any) => <span className="text-xs text-[#5a6578]">{r[2]}</span> },
]

export default function App() {
  return (
    <Routes>
      {/* 1. Public Portal Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collaborators" element={<Collaborators />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 2. Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Route>

      {/* 3. Candidate Workspace (Primary Demo Slice) */}
      <Route path="/candidate" element={<DashboardLayout role="candidate" />}>
        <Route index element={<CandidateDashboard />} />
        <Route path="profile" element={<CandidateProfile />} />
        <Route path="market-demand" element={<MarketDemand />} />
        <Route path="skill-evidence-gap" element={<SkillEvidenceGap />} />
        <Route path="experience-bridge" element={<ExperienceBridge />} />
        <Route path="experience-bridge/:taskId" element={<ExperienceTaskDetail />} />
        <Route path="training" element={<Training />} />
        <Route path="passport" element={<CompetencyPassport />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:jobId" element={<JobDetail />} />
        <Route path="applications" element={<Applications />} />
      </Route>

      {/* 4. Institute Workspace */}
      <Route path="/institute" element={<DashboardLayout role="institute" />}>
        <Route index element={<InstituteDashboard />} />
        <Route path="simulator" element={<WhatIfSimulator />} />
        <Route path="course-health" element={<CourseHealth />} />
        <Route
          path="industry-demand"
          element={
            <InstituteGenericPage
              title="Industry Demand Signals"
              subtitle="Demand signals from Maharashtra hiring requisitions relevant to course planning"
              columns={genericColumns}
              data={[
                ['Cloud Support Associate', 'High Demand (Pune)', 'Expand hands-on Linux/AWS lab hours'],
                ['Junior DevOps Engineer', 'Moderate Demand (Mumbai)', 'Introduce containerization modules'],
                ['Network Support Trainee', 'Stable Demand', 'Modernize routing curriculum'],
              ]}
            />
          }
        />
        <Route
          path="courses"
          element={
            <InstituteGenericPage
              title="Courses & Programs"
              subtitle="Current vocational curriculum catalog and alignment status"
              columns={genericColumns}
              data={[
                ['Cloud Infrastructure & Linux Systems (6 Months)', 'Active (120 Trainees)', 'Integrate Experience Bridge tasks'],
                ['Diploma in Computer Hardware & Networking', 'Active (85 Trainees)', 'Curriculum review required'],
                ['Traditional Server Administration', 'Active (60 Trainees)', 'Phase out legacy modules'],
              ]}
            />
          }
        />
        <Route
          path="curriculum"
          element={
            <InstituteGenericPage
              title="Curriculum Framework"
              subtitle="Comparison of classroom syllabus against industry competency standards"
              columns={genericColumns}
              data={[
                ['Linux System Administration Module', 'Aligned with Market', 'Maintain syllabus'],
                ['Computer Networking & Subnets', 'Partially Aligned', 'Add cloud VPC prefix list routing'],
                ['Docker Container Fundamentals', 'Curriculum Gap', 'Add 20 hours hands-on container lab'],
              ]}
            />
          }
        />
        <Route
          path="trainers"
          element={
            <InstituteGenericPage
              title="Trainer Capacity & Faculty"
              subtitle="Certified instructors and pedagogical requirements"
              columns={genericColumns}
              data={[
                ['Prof. S. Kulkarni (Linux / OS)', 'Certified Master Trainer', 'Lead instructor'],
                ['Prof. R. Patil (Networking)', 'Certified Trainer', 'Scheduled for cloud VPC refresher'],
                ['Cloud Faculty Vacancy #1', 'Open Position', 'Recruiting industry practitioner'],
              ]}
            />
          }
        />
        <Route
          path="labs"
          element={
            <InstituteGenericPage
              title="Labs & Equipment Capacity"
              subtitle="Physical workstations and cloud sandbox allocation"
              columns={genericColumns}
              data={[
                ['Computer Center Lab A (40 PCs)', 'Functional (Linux Workstations)', 'Operating at 85% capacity'],
                ['Cloud Simulation Lab B (30 PCs)', 'Functional (High-Speed Internet)', 'Dedicated to Experience Bridge tasks'],
                ['Hardware Diagnostics Bench (20 Workstations)', 'Operational', 'Undergoing equipment audit'],
              ]}
            />
          }
        />
        <Route
          path="capacity"
          element={
            <InstituteGenericPage
              title="Institutional Capacity Planning"
              subtitle="Evaluating total training seats against local industry demand"
              columns={genericColumns}
              data={[
                ['Annual Sanctioned Seats', '265 Seats Total', 'Utilisation rate: 94%'],
                ['Trainer-to-Student Ratio', '1:26.5', 'Exceeds optimal target of 1:20'],
                ['Lab Access Ratio', '0.34 PCs / Student', 'Bottleneck identified during practical hours'],
              ]}
            />
          }
        />
        <Route
          path="placements"
          element={
            <InstituteGenericPage
              title="Placement Outcomes"
              subtitle="Employment outcomes verified through Competency Passport records"
              columns={genericColumns}
              data={[
                ['Batch 2025-26 Placement Rate', '68.4% Placed within 90 days', 'Benchmark: 62%'],
                ['Top Recruiting Sectors', 'IT-ITeS & Cloud Managed Services', 'Average CTC: INR 3.8 LPA'],
                ['Employer Satisfaction Index', '4.4 / 5.0 Rating', 'Highest marks for Linux troubleshooting'],
              ]}
            />
          }
        />
        <Route
          path="employer-feedback"
          element={
            <InstituteGenericPage
              title="Employer Structured Feedback"
              subtitle="Feedback from hiring managers linked to student task verification"
              columns={genericColumns}
              data={[
                ['TechCloud Solutions Pune', 'Positive on Linux troubleshooting', 'Advised deeper VPC routing knowledge'],
                ['NextGen Technologies Mumbai', 'Commended diagnostic method', 'Encouraged more Docker experience'],
                ['DataGrid Systems India', 'Preferred Competency Passport holders', 'Requested early campus batch interview'],
              ]}
            />
          }
        />
      </Route>

      {/* 5. Employer Workspace */}
      <Route path="/employer" element={<DashboardLayout role="employer" />}>
        <Route index element={<EmployerDashboard />} />
        <Route path="validate" element={<ValidateCompetency />} />
        <Route
          path="hiring-demand"
          element={
            <EmployerGenericPage
              title="Corporate Hiring Demand"
              subtitle="Define active talent requirements for engineering teams in Maharashtra"
              columns={genericColumns}
              data={[
                ['Cloud Support Associate (Pune)', '4 Open Requisitions', 'High Priority'],
                ['Junior Cloud Engineer (Pune)', '2 Open Requisitions', 'Standard'],
                ['IT Support Associate (Mumbai)', '3 Open Requisitions', 'Immediate'],
              ]}
            />
          }
        />
        <Route
          path="required-skills"
          element={
            <EmployerGenericPage
              title="Required Competencies"
              subtitle="Observable skills required for organizational positions"
              columns={genericColumns}
              data={[
                ['Linux System Administration', 'Mandatory (Threshold: 80%)', 'Core pillar'],
                ['Incident Troubleshooting', 'Mandatory (Threshold: 80%)', 'Core pillar'],
                ['AWS Cloud Routing', 'Required (Experience Bridge acceptable)', 'Secondary pillar'],
              ]}
            />
          }
        />
        <Route
          path="competency-framework"
          element={
            <EmployerGenericPage
              title="Competency Framework Specification"
              subtitle="Structuring role specifications into objective observable tasks"
              columns={genericColumns}
              data={[
                ['Cloud Support Associate Framework v2.1', 'Published', 'Standardized across Pune cluster'],
                ['DevOps Associate Framework v1.0', 'Draft', 'Under review with tech leads'],
              ]}
            />
          }
        />
        <Route
          path="candidates"
          element={
            <EmployerGenericPage
              title="Candidate Talent Pipeline"
              subtitle="Reviewed candidates filtered by verified Competency Passport scores"
              columns={genericColumns}
              data={[
                ['Riddhi Naskari', 'Cloud Support (Score: 84 Linux, 88 Triage)', 'AWS attestation pending'],
                ['Amit Deshmukh', 'Cloud Support (Score: 86 Linux)', 'Interviewing'],
                ['Priya Sharma', 'Junior DevOps (Score: 94 Docker)', 'Hired'],
              ]}
            />
          }
        />
        <Route
          path="candidates/:id"
          element={
            <EmployerGenericPage
              title="Candidate Detailed Dossier"
              subtitle="Comprehensive competency audit and verified task submissions"
              columns={genericColumns}
              data={[
                ['Verified Credentials', '2 Employer Attestations', 'Verified by TechCloud & NextGen'],
                ['Experience Bridge Submissions', '1 Pending Review', 'AWS VPC Gateway Routing'],
              ]}
            />
          }
        />
        <Route
          path="jobs"
          element={
            <EmployerGenericPage
              title="Job Requisition Management"
              subtitle="Manage opportunities linked directly to Competency Passports"
              columns={genericColumns}
              data={[
                ['Cloud Support Associate (Hinjawadi)', 'Active Posting', '14 Passport applicants'],
                ['Technical Support Engineer (Airoli)', 'Active Posting', '8 Passport applicants'],
              ]}
            />
          }
        />
        <Route
          path="outcomes"
          element={
            <EmployerGenericPage
              title="Recruitment & Retention Outcomes"
              subtitle="Tracking performance of candidates hired through verified evidence"
              columns={genericColumns}
              data={[
                ['6-Month Retention Rate', '94% for Passport Hires', 'vs. 76% traditional resume hires'],
                ['Average Time to Onboard', '12 Days', 'Reduced by 60% due to verified diagnostic skills'],
              ]}
            />
          }
        />
        <Route
          path="feedback"
          element={
            <EmployerGenericPage
              title="Institutional Feedback Loop"
              subtitle="Provide structured feedback to training institutes regarding graduate capabilities"
              columns={genericColumns}
              data={[
                ['Quarterly Feedback Report (Q3 2026)', 'Dispatched to DVET', 'Highlighting need for VPC routing labs'],
                ['Campus Hiring Readiness Advisory', 'Shared with Polytechnics', 'Linux command-line fluency praised'],
              ]}
            />
          }
        />
      </Route>

      {/* 6. Government Intelligence Workspace */}
      <Route path="/government" element={<DashboardLayout role="government" />}>
        <Route index element={<GovernmentDashboard />} />
        <Route path="district-intelligence" element={<DistrictIntelligence />} />
        <Route path="simulator" element={<WhatIfSimulator />} />
        <Route
          path="labour-market"
          element={
            <GovernmentGenericPage
              title="Labour Market Signals"
              subtitle="Aggregated hiring volume and technical demand trajectories across Maharashtra"
              columns={genericColumns}
              data={[
                ['Cloud Support & Infrastructure Operations', '7,830 Open Requisitions', 'Growing +18% YoY'],
                ['Legacy On-Premises Hardware Maintenance', '1,420 Requisitions', 'Declining -12% YoY'],
                ['Container & Microservices Engineering', '3,950 Requisitions', 'Emerging high-growth area'],
              ]}
            />
          }
        />
        <Route
          path="course-intelligence"
          element={
            <GovernmentGenericPage
              title="Statewide Course Intelligence"
              subtitle="Health analysis of technical courses offered in Maharashtra ITIs and Polytechnics"
              columns={genericColumns}
              data={[
                ['Cloud & Linux Vocational Program', 'Healthy (78% placement rate)', 'Candidate demand matches industry'],
                ['Diploma in Computer Hardware', 'Review Required (46% placement rate)', 'Syllabus modernization underway'],
                ['Traditional Server Admin', 'Declining (28% placement rate)', 'Recommended for phase-out'],
              ]}
            />
          }
        />
        <Route
          path="ecosystem"
          element={
            <GovernmentGenericPage
              title="Skills Ecosystem Directory"
              subtitle="Comprehensive register of accredited institutes, employers, and sector skill bodies"
              columns={genericColumns}
              data={[
                ['Accredited Technical Institutes', '36 Districts Covered', '42 Active in Pilot'],
                ['Corporate Industry Partners', '18 Active Employers', 'Concentrated in Pune/Mumbai'],
                ['Verified Competency Passports Issued', '1,420 Candidates', 'Adoption expanding'],
              ]}
            />
          }
        />
        <Route
          path="capacity"
          element={
            <GovernmentGenericPage
              title="State Training Capacity Planning"
              subtitle="Regional allocation of seats, instructor grants, and equipment budgets"
              columns={genericColumns}
              data={[
                ['Pune Region Capacity', '1,600 Trainees', 'Deficit: -1,250 seats'],
                ['Mumbai Suburban Capacity', '2,200 Trainees', 'Deficit: -1,200 seats'],
                ['Nagpur Region Capacity', '650 Trainees', 'Deficit: -170 seats'],
              ]}
            />
          }
        />
        <Route
          path="plans"
          element={
            <GovernmentGenericPage
              title="State Intervention Plans"
              subtitle="Policy directives and equipment upgrade programs approved by the Directorate"
              columns={genericColumns}
              data={[
                ['Pune Cloud Lab Modernization Grant', 'Approved (INR 1.4 Cr)', 'Adding 200 cloud workstations'],
                ['Instructor Cloud Certification Drive', 'In Progress (40 Trainers)', 'Partnership with AWS/Linux Academy'],
                ['Curriculum Revision Directive 2026-B', 'Under Review', 'Mandating Experience Bridge tasks in ITIs'],
              ]}
            />
          }
        />
        <Route
          path="outcomes"
          element={
            <GovernmentGenericPage
              title="Workforce Outcomes & Continuous Improvement"
              subtitle="Tracking state placement rates and employer satisfaction over multi-year horizons"
              columns={genericColumns}
              data={[
                ['Statewide Technical Placement Rate', '64.2%', '+8.4% improvement after Competency Passport rollout'],
                ['Youth Employment in Target Role', '82% Role Alignment', 'Trainees working in field of study'],
                ['Average Monthly Entry Salary', 'INR 24,500', '15% premium over unverified applicants'],
              ]}
            />
          }
        />
        <Route
          path="alerts"
          element={
            <GovernmentGenericPage
              title="Capacity & Demand Imbalance Alerts"
              subtitle="Early warnings generated by SWAMARGA market intelligence engine"
              columns={genericColumns}
              data={[
                ['Critical Capacity Deficit: Pune Cloud Support', 'Action Urgently Required', 'Demand exceeds capacity by 44%'],
                ['Obsolete Curriculum Warning: On-Prem Server Modules', 'Action Required', 'Placement drop below 30% threshold'],
                ['Trainer Shortage: Cloud Infrastructure Specialists', 'High Priority', '14 vacancies across state polytechnics'],
              ]}
            />
          }
        />
      </Route>

      {/* 7. Platform Administration */}
      <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route
          path="users"
          element={
            <AdminGenericPage
              title="Platform User Directory"
              subtitle="Manage accounts across candidate, institute, employer, and government tiers"
              columns={genericColumns}
              data={[
                ['Riddhi Naskari (Candidate)', 'Active (ID #1)', 'Last active: Today'],
                ['Govt Polytechnic Pune (Institute)', 'Verified Account', 'Admin: Prof. S. Kulkarni'],
                ['TechCloud Solutions (Employer)', 'Verified Corporate', 'Contact: recruiting@techcloud.in'],
              ]}
            />
          }
        />
        <Route
          path="verification"
          element={
            <AdminGenericPage
              title="Institutional Verification Audit"
              subtitle="Review pending accreditation documents and identity proofs"
              columns={genericColumns}
              data={[
                ['CloudNova Systems Pune', 'Pending Employer Audit', 'Review GST & Corporate documents'],
                ['Government ITI Haveli', 'Pending Institute Audit', 'Review DVET accreditation code'],
              ]}
            />
          }
        />
        <Route
          path="organisations"
          element={
            <AdminGenericPage
              title="Registered Organisations"
              subtitle="Corporate and academic entities participating in SWAMARGA"
              columns={genericColumns}
              data={[
                ['TechCloud Solutions Pvt Ltd', 'Employer Partner (Pune)', 'Active since 2026'],
                ['Government Polytechnic Pune', 'State Institute (Pune)', 'Active since 2026'],
                ['NextGen Technologies', 'Employer Partner (Mumbai)', 'Active since 2026'],
              ]}
            />
          }
        />
        <Route
          path="data"
          element={
            <AdminGenericPage
              title="Data Registry & Pipeline Health"
              subtitle="Status of FastAPI backend, SQLite seed records, and market signal ingestion"
              columns={genericColumns}
              data={[
                ['FastAPI Backend Router', 'Online (http://localhost:8000)', 'Jobs, Candidates, Experience'],
                ['Database Seed Records', 'Active (Candidate: Riddhi)', '5 Core Cloud Skills Seeded'],
                ['Market Signal Ingestion Worker', 'Operating Normal', 'Parsing job posting descriptions'],
              ]}
            />
          }
        />
        <Route
          path="content"
          element={
            <AdminGenericPage
              title="Public Content & Terminology"
              subtitle="Review multilingual strings (English, Marathi, Hindi) and portal documentation"
              columns={genericColumns}
              data={[
                ['English Translation (en.json)', 'Complete', 'Standard UI terminology'],
                ['Marathi Translation (mr.json)', 'Complete', 'Natural Devanagari terminology'],
                ['Hindi Translation (hi.json)', 'Complete', 'Official public service terminology'],
              ]}
            />
          }
        />
        <Route
          path="audit"
          element={
            <AdminGenericPage
              title="Security & System Audit Logs"
              subtitle="Immutable trail of credential issuance and task evaluations"
              columns={genericColumns}
              data={[
                ['Passport Issued: MH-SWA-2026-008412', 'Success', 'Candidate: Riddhi Naskari'],
                ['Employer Attestation: TechCloud Solutions', 'Verified', 'Skill: Linux System Recovery'],
                ['What-If Simulation Run: Polytechnic Pune', 'Completed', 'Capacity scenario modeled'],
              ]}
            />
          }
        />
        <Route
          path="settings"
          element={
            <AdminGenericPage
              title="Platform Global Settings"
              subtitle="System configuration, API endpoints, and accessibility flags"
              columns={genericColumns}
              data={[
                ['API Base URL', 'http://localhost:8000', 'Configured via Vite environment'],
                ['Design System Mode', 'UX4G 3.0 Standard', 'WCAG 2.2 AA compliant'],
                ['Demonstration Flag', 'Enabled', 'Illustrative data disclaimer active'],
              ]}
            />
          }
        />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}


