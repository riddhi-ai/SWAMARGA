import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react"
import { Link } from "react-router-dom"
import MetricCard from "../../components/ui/MetricCard"
import StatusBadge from "../../components/ui/StatusBadge"
import { candidateDashboardData } from "../../services/mock/candidateDashboard"

export default function CandidateDashboard() {
  const { candidate, skills, skillGaps, evidenceGaps } =
    candidateDashboardData

  return (
    <div className="page-stack">
      <section className="welcome-block">
        <div>
          <p className="eyebrow">Your current position</p>
          <h2>Good progress, with a few gaps to close.</h2>
          <p className="lead">
            Your profile is being compared with current Cloud Support
            Associate demand. The focus is on what you know and what you can
            demonstrate.
          </p>
        </div>

        <Link className="primary-button" to="/candidate/skill-evidence-gap">
          View gap analysis
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>

      <section className="metric-grid" aria-label="Readiness summary">
        <MetricCard
          label="Readiness"
          value={`${candidate.readiness}%`}
          detail="Based on current role requirements"
        />
        <MetricCard
          label="Skill gaps"
          value={skillGaps.length}
          detail="Skills to develop for this role"
        />
        <MetricCard
          label="Evidence gaps"
          value={evidenceGaps.length}
          detail="Skills needing stronger proof"
        />
        <MetricCard
          label="Target role"
          value="Cloud Support"
          detail="Pune market"
        />
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Skill & evidence picture</p>
              <h3>What your profile currently shows</h3>
            </div>
            <Link to="/candidate/skill-evidence-gap" className="text-link">
              See full analysis
            </Link>
          </div>

          <div className="skill-list">
            {skills.map((skill) => {
              const status =
                skill.level === "Strong"
                  ? "verified"
                  : skill.level === "Developing"
                    ? "developing"
                    : "gap"

              return (
                <div className="skill-row" key={skill.name}>
                  <div>
                    <strong>{skill.name}</strong>
                    <span>{skill.category}</span>
                  </div>
                  <StatusBadge status={status} />
                </div>
              )
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Next actions</p>
              <h3>Where to focus</h3>
            </div>
          </div>

          <div className="action-list">
            <Link to="/candidate/experience-bridge" className="action-item">
              <span className="action-icon warning">
                <CircleAlert size={18} aria-hidden="true" />
              </span>
              <span>
                <strong>Build evidence for AWS</strong>
                <small>Complete a practical task and add the result.</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link to="/candidate/experience-bridge" className="action-item">
              <span className="action-icon">
                <CheckCircle2 size={18} aria-hidden="true" />
              </span>
              <span>
                <strong>Practice Linux troubleshooting</strong>
                <small>Strengthen your existing verified evidence.</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>

      <section className="panel demand-panel">
        <div>
          <p className="eyebrow">Market signal</p>
          <h3>Cloud Support roles are asking for more than course completion.</h3>
          <p>
            SWAMARGA connects role demand with demonstrated capability so you
            can see what to learn, what to practise and what evidence to add.
          </p>
        </div>

        <Link to="/candidate/market-demand" className="secondary-button">
          Explore demand
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
