import { Link } from 'react-router-dom'
import { InfoTable, PageIntro, Section, Status, WorkspacePage } from '../../components/SwamargaPage'

const candidateRows = [
  ['Linux', 'High', 'Verified', 'Maintained'],
  ['Troubleshooting', 'High', 'Verified', 'Maintained'],
  ['AWS', 'High', 'Needs evidence', 'Build evidence'],
  ['Networking', 'High', 'Skill gap', 'Develop'],
  ['Docker', 'Medium', 'Skill gap', 'Develop'],
]

export function CandidateDashboard() {
  return (
    <WorkspacePage role="Candidate" title="Your workforce profile" description="A practical view of your target role, current evidence and the next actions available to you.">
      <div className="workspace-band">
        <div><span>Target role</span><strong>Cloud Support Associate</strong><small>Pune · seeded demonstration role</small></div>
        <Link to="/candidate/skill-evidence-gap" className="primary-button">Review gaps</Link>
      </div>

      <Section title="Skill & evidence picture" intro="The prototype distinguishes skills that need development from skills that need stronger proof.">
        <InfoTable columns={['Skill', 'Market signal', 'Your evidence', 'Suggested action']} rows={candidateRows} />
      </Section>

      <div className="two-column">
        <section className="plain-panel">
          <span>Skill gaps</span>
          <h2>2</h2>
          <p>Networking and Docker are currently identified as development gaps for the selected role.</p>
          <Link to="/candidate/skill-evidence-gap">View analysis →</Link>
        </section>
        <section className="plain-panel">
          <span>Evidence gaps</span>
          <h2>3</h2>
          <p>AWS, Networking and Docker need stronger practical evidence in the current demonstration profile.</p>
          <Link to="/candidate/experience-bridge">Build evidence →</Link>
        </section>
      </div>
    </WorkspacePage>
  )
}

export function CandidateProfile() {
  return <WorkspacePage role="Candidate" title="My profile" description="Your personal, career and target-role information."><Section title="Profile information"><InfoTable columns={['Field', 'Current information']} rows={[['Name', 'Riddhi Naskari'], ['Target role', 'Cloud Support Associate'], ['Location', 'Pune, Maharashtra'], ['Profile source', 'Prototype candidate']]} /></Section></WorkspacePage>
}

export function MarketDemand() {
  return <WorkspacePage role="Candidate" title="Market demand" description="Current demonstration signals for roles and skills relevant to your target role."><Section title="Cloud Support Associate" intro="Sample demand within the seeded demonstration dataset."><InfoTable columns={['Skill', 'Demand signal', 'Why it matters']} rows={[['Linux', 'High', 'Core support environment'], ['Networking', 'High', 'Connectivity diagnosis'], ['AWS', 'High', 'Cloud operations'], ['Troubleshooting', 'High', 'Incident resolution'], ['Docker', 'Medium', 'Container-based environments']]} /></Section></WorkspacePage>
}

export function SkillEvidenceGap() {
  return <WorkspacePage role="Candidate" title="Skill & evidence gap" description="See why each gap has been identified and what action can address it."><Section title="Current analysis"><InfoTable columns={['Skill', 'Classification', 'Current evidence', 'Next step']} rows={candidateRows} /></Section><div className="callout"><strong>How to read this</strong><p>A skill gap means development is needed. An evidence gap means practical proof is insufficient even where some learning may already exist.</p></div></WorkspacePage>
}

export function ExperienceBridge() {
  return <WorkspacePage role="Candidate" title="Experience Bridge" description="Practical work designed to turn an evidence gap into demonstrable experience."><Section title="Available practical task"><div className="task-row"><span>01</span><div><strong>Diagnose a Linux connectivity issue</strong><p>Investigate a simulated connectivity problem, identify the likely cause and document the resolution.</p><Status tone="orange">Evidence task</Status></div><Link to="/candidate/experience-bridge/task-1">Open task →</Link></div></Section></WorkspacePage>
}

export function ExperienceTask() {
  return <WorkspacePage role="Candidate" title="Linux connectivity task" description="Complete the practical scenario and submit evidence."><div className="task-detail"><span>Experience Bridge · Task 01</span><h2>Diagnose a Linux connectivity issue</h2><p>A support ticket reports that a Linux host cannot reach an internal service. Investigate the network path and record the steps you would take.</p><h3>Evidence expected</h3><ul><li>Diagnosis steps</li><li>Commands or tools used</li><li>Identified cause</li><li>Resolution or next action</li></ul><button className="primary-button">Submit evidence</button></div></WorkspacePage>
}

export function Training() {
  return <WorkspacePage role="Candidate" title="Training" description="Training pathways connected to the requirements of your selected role."><Section title="Relevant learning areas"><div className="plain-grid"><article><b>Networking fundamentals</b><p>Addresses the current networking development gap.</p><Link to="/candidate/experience-bridge">Build practical evidence →</Link></article><article><b>Container fundamentals</b><p>Supports the Docker requirement identified in the demonstration role.</p><Link to="/candidate/experience-bridge">Build practical evidence →</Link></article></div></Section></WorkspacePage>
}

export function Passport() {
  return <WorkspacePage role="Candidate" title="Competency Passport" description="A record of demonstrated and validated competencies."><Section title="Competencies"><InfoTable columns={['Competency', 'Evidence', 'Validation']} rows={[['Linux', 'Practical evidence', 'Verified'], ['Troubleshooting', 'Practical evidence', 'Verified'], ['AWS', 'Certificate', 'Needs evidence'], ['Networking', 'None submitted', 'Not demonstrated']]} /></Section></WorkspacePage>
}

export function Jobs() {
  return <WorkspacePage role="Candidate" title="Jobs" description="Opportunities are shown with the requirements behind the match."><Section title="Demonstration opportunities"><InfoTable columns={['Role', 'Location', 'Key requirement', 'Evidence to review']} rows={[['Cloud Support Associate', 'Pune', 'Linux · Networking · AWS', 'View requirements'], ['IT Support Associate', 'Mumbai', 'Troubleshooting · Networking', 'View requirements'], ['Cloud Operations Trainee', 'Pune', 'AWS · Linux · Docker', 'View requirements']]} /></Section></WorkspacePage>
}

export function Applications() {
  return <WorkspacePage role="Candidate" title="Applications" description="Track applications and the information associated with each opportunity."><Section title="Application history"><InfoTable columns={['Role', 'Organisation', 'Status', 'Updated']} rows={[['Cloud Support Associate', 'Demonstration employer', 'Draft', 'Sep 2026'], ['IT Support Associate', 'Demonstration employer', 'Submitted', 'Sep 2026']]} /></Section></WorkspacePage>
}

const instituteRows = [
  ['Cloud Support', 'Current', 'Networking module', 'Review'],
  ['Linux Administration', 'Current', 'Troubleshooting', 'Maintain'],
  ['Container Operations', 'Needs review', 'Docker', 'Update'],
]

export function InstituteDashboard() {
  return <WorkspacePage role="Training institute" title="Training planning workspace" description="Use demand, course and capacity information to review training decisions."><Section title="Current planning view"><InfoTable columns={['Course', 'Course health', 'Observed gap', 'Action']} rows={instituteRows} /></Section><div className="two-column"><div className="plain-panel"><span>Capacity</span><h2>Review required</h2><p>Compare projected demand with trainer and lab availability before expanding seats.</p></div><div className="plain-panel"><span>Employer feedback</span><h2>Available</h2><p>Review validation and placement outcomes before curriculum changes.</p></div></div></WorkspacePage>
}

export function InstitutePage({ title, description }: { title: string; description: string }) {
  return <WorkspacePage role="Training institute" title={title} description={description}><Section title="Current records"><InfoTable columns={['Item', 'Status', 'Action']} rows={[['Cloud Support course', 'Active', 'Review'], ['Networking module', 'Needs review', 'Open'], ['Trainer capacity', 'Review required', 'Open'], ['Lab capacity', 'Available', 'View']]} /></Section></WorkspacePage>
}

export function EmployerDashboard() {
  return <WorkspacePage role="Employer" title="Hiring & competency workspace" description="Define requirements, review evidence and provide validation."><Section title="Current hiring requirements"><InfoTable columns={['Role', 'Priority skills', 'Evidence required', 'Status']} rows={[['Cloud Support Associate', 'Linux · AWS · Networking', 'Practical troubleshooting', 'Open'], ['IT Support Associate', 'Troubleshooting · Networking', 'Support scenario', 'Open']]} /></Section></WorkspacePage>
}

export function EmployerPage({ title, description }: { title: string; description: string }) {
  return <WorkspacePage role="Employer" title={title} description={description}><Section title="Current records"><InfoTable columns={['Record', 'Status', 'Action']} rows={[['Cloud Support competency framework', 'Draft', 'Review'], ['Candidate evidence request', 'Pending', 'Review'], ['Employer feedback', 'Open', 'Respond']]} /></Section></WorkspacePage>
}

export function GovernmentDashboard() {
  return <WorkspacePage role="Government" title="Workforce intelligence" description="Review labour-market signals, training capacity and planning actions at an aggregated level."><div className="data-note"><strong>Prototype data</strong><span>Figures shown here are illustrative and do not represent official district statistics.</span></div><Section title="Planning signals"><InfoTable columns={['Area', 'Signal', 'Current issue', 'Planning action']} rows={[['Pune', 'Cloud support demand', 'Evidence and training alignment', 'Review'], ['Mumbai', 'IT support demand', 'Capacity distribution', 'Review'], ['District capacity', 'Training resources', 'Trainer / lab planning', 'Open simulator']]} /></Section></WorkspacePage>
}

export function GovernmentPage({ title, description }: { title: string; description: string }) {
  return <WorkspacePage role="Government" title={title} description={description}><div className="data-note"><strong>Illustrative / prototype</strong><span>Replace with sourced aggregated data when available.</span></div><Section title="Planning information"><InfoTable columns={['Indicator', 'Current view', 'Source status']} rows={[['Role demand', 'Sample dataset', 'Prototype'], ['Course health', 'Sample records', 'Prototype'], ['Training capacity', 'Sample records', 'Illustrative'], ['Employer outcomes', 'Insufficient evidence', 'Not available']} /></Section></WorkspacePage>
}

export function AdminPage({ title, description }: { title: string; description: string }) {
  return <WorkspacePage role="Administration" title={title} description={description}><Section title="Operational records"><InfoTable columns={['Record', 'Status', 'Action']} rows={[['User verification', '3 pending', 'Review'], ['Organisation verification', '2 pending', 'Review'], ['Content review', '1 pending', 'Open'], ['Audit events', 'Available', 'View']]} /></Section></WorkspacePage>
}
