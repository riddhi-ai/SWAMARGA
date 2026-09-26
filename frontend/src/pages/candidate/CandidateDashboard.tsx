import { Link } from 'react-router-dom'
import { candidateDashboardData } from '../../services/mock/candidateDashboard'

function EvidenceState({
  level,
  evidenceStatus,
}: {
  level: 'Strong' | 'Developing' | 'Gap'
  evidenceStatus: 'Verified' | 'Unverified' | 'Missing'
}) {
  if (level === 'Gap') {
    return <span className="evidence-state gap">Not demonstrated</span>
  }

  if (evidenceStatus === 'Unverified') {
    return <span className="evidence-state unverified">Needs verification</span>
  }

  if (level === 'Developing') {
    return <span className="evidence-state developing">Developing</span>
  }

  return <span className="evidence-state verified">Demonstrated</span>
}

export default function CandidateDashboard() {
  const { candidate, skills, skillGaps, evidenceGaps } = candidateDashboardData

  return (
    <div className="candidate-page">
      <div className="page-intro">
        <div>
          <p className="section-kicker">Candidate overview</p>
          <h1>{candidate.name}</h1>
          <p className="page-subtitle">
            {candidate.targetRole} <span aria-hidden="true">·</span>{' '}
            {candidate.location}
          </p>
        </div>

        <Link className="secondary-button" to="/candidate/profile">
          View profile
        </Link>
      </div>

      <section className="notice-bar" aria-label="Profile information">
        <strong>
          Your profile is being compared with current market requirements.
        </strong>
        <span>
          The information below shows where your existing skills and evidence
          are strong, developing, or require further action.
        </span>
      </section>

      <section
        className="content-section"
        aria-labelledby="requirements-heading"
      >
        <div className="section-heading">
          <div>
            <p className="section-kicker">Role comparison</p>
            <h2 id="requirements-heading">
              Your skills and evidence
            </h2>
          </div>

          <Link
            to="/candidate/skill-evidence-gap"
            className="text-link"
          >
            View full gap analysis
          </Link>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <caption className="sr-only">
              Candidate skills and evidence status
            </caption>

            <thead>
              <tr>
                <th scope="col">Competency</th>
                <th scope="col">Category</th>
                <th scope="col">Skill level</th>
                <th scope="col">Evidence</th>
                <th scope="col">Status</th>
                <th scope="col">Next action</th>
              </tr>
            </thead>

            <tbody>
              {skills.map((skill) => {
                const needsAction =
                  skill.level === 'Gap' ||
                  skill.evidenceStatus === 'Unverified'

                return (
                  <tr key={skill.name}>
                    <th scope="row">{skill.name}</th>
                    <td>{skill.category}</td>
                    <td>{skill.level}</td>
                    <td>{skill.evidenceStatus}</td>
                    <td>
                      <EvidenceState
                        level={skill.level}
                        evidenceStatus={skill.evidenceStatus}
                      />
                    </td>
                    <td>
                      {needsAction ? (
                        <Link
                          to="/candidate/experience-bridge"
                          className="row-link"
                        >
                          Build evidence
                        </Link>
                      ) : (
                        <span className="muted-text">
                          No action required
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="two-column-sections">
        <section
          className="content-section"
          aria-labelledby="market-heading"
        >
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Labour-market signal</p>
              <h2 id="market-heading">
                {candidate.targetRole} in {candidate.location.split(',')[0]}
              </h2>
            </div>
          </div>

          <div className="market-summary">
            <div>
              <span className="data-label">Target role</span>
              <strong>{candidate.targetRole}</strong>
            </div>

            <div>
              <span className="data-label">Current skill gaps</span>
              <strong>{skillGaps.join(' · ')}</strong>
            </div>

            <div>
              <span className="data-label">Evidence requiring action</span>
              <strong>{evidenceGaps.join(' · ')}</strong>
            </div>
          </div>

          <Link
            to="/candidate/market-demand"
            className="text-link"
          >
            Examine market demand
          </Link>
        </section>

        <section
          className="content-section"
          aria-labelledby="bridge-heading"
        >
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Experience Bridge</p>
              <h2 id="bridge-heading">
                Turn gaps into practical evidence
              </h2>
            </div>
          </div>

          <p className="section-copy">
            Practical tasks can help demonstrate competencies that are
            currently missing or supported only by unverified evidence.
          </p>

          <div className="action-summary">
            <strong>{evidenceGaps.length} evidence areas</strong>
            <span>identified for practical development or verification</span>
          </div>

          <Link
            to="/candidate/experience-bridge"
            className="primary-button"
          >
            View recommended tasks
          </Link>
        </section>
      </div>

      <section
        className="content-section passport-section"
        aria-labelledby="passport-heading"
      >
        <div className="section-heading">
          <div>
            <p className="section-kicker">Competency Passport</p>
            <h2 id="passport-heading">
              Your demonstrated skills
            </h2>
          </div>

          <Link to="/candidate/passport" className="text-link">
            Open passport
          </Link>
        </div>

        <div className="passport-list">
          <div>
            <span className="passport-count">
              {skills.filter(
                (skill) =>
                  skill.evidenceStatus === 'Verified'
              ).length}
            </span>
            <span>Verified competencies</span>
          </div>

          <div>
            <span className="passport-count">
              {skills.filter(
                (skill) =>
                  skill.evidenceStatus === 'Unverified'
              ).length}
            </span>
            <span>Evidence requiring verification</span>
          </div>

          <div>
            <span className="passport-count">
              {skillGaps.length}
            </span>
            <span>Competencies requiring development</span>
          </div>
        </div>
      </section>
    </div>
  )
}
