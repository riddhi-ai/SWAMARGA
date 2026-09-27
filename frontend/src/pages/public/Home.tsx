import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  TrendingUp,
  GitCompare,
  FolderKanban,
  Award,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  GraduationCap,
} from 'lucide-react'

export const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-[#d9dde1] py-12 sm:py-16">
        <div className="site-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eef2f7] text-(--navy)] rounded border border-[#d4e0ee] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-(--orange)]" />
              <span>{t('common.state')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-((--navy)] leading-tight tracking-tight">
              {t('home.heroTitle')}
            </h1>

            <p className="text-base text-[#5a6578] leading-relaxed">
              {t('home.heroSubtitle')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/candidate"
                className="gov-btn gov-btn-primary"
              >
                <span>{t('home.candidateCta')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/institute"
                className="gov-btn gov-btn-secondary"
              >
                {t('home.instituteCta')}
              </Link>
              <Link
                to="/employer"
                className="gov-btn gov-btn-secondary"
              >
                {t('home.employerCta')}
              </Link>
              <Link
                to="/government"
                className="gov-btn gov-btn-secondary"
              >
                {t('home.govCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE DIFFERENTIATOR: SKILL GAP VS EVIDENCE GAP */}
      <section className="site-container">
        <div className="bg-white border border-[#d9dde1] rounded p-6 sm:p-8 shadow-xs border-t-4 border-t-(--orange)">
          <div className="max-w-2xl mb-6">
            <h2 className="text-xl font-bold text-(--navy) mb-2">
              {t('home.differenceTitle')}
            </h2>
            <p className="text-xs text-[#5a6578]">
              Traditional workforce portals conflate lacking skills with lacking verification. SWAMARGA solves this systematically:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#fdf2f2] border border-[#fecaca] rounded">
              <div className="flex items-center gap-2 mb-2 text-[#d9383a]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold m-0">1. Skill Gap</h3>
              </div>
              <p className="text-xs text-[#2d3748] leading-relaxed m-0">
                {t('home.skillGapExplain')}
              </p>
              <div className="mt-4 pt-3 border-t border-[#fecaca] text-xs font-semibold text-[#d9383a]">
                Solution: Structured vocational curriculum and classroom laboratory instruction.
              </div>
            </div>

            <div className="p-5 bg-(--orange-light) border border-[#ffd5b8] rounded">
              <div className="flex items-center gap-2 mb-2 text-(--orange-dark)">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold m-0">2. Evidence Gap</h3>
              </div>
              <p className="text-xs text-[#2d3748] leading-relaxed m-0">
                {t('home.evidenceGapExplain')}
              </p>
              <div className="mt-4 pt-3 border-t border-[#ffd5b8] text-xs font-semibold text-(--orange-dark)">
                Solution: Experience Bridge scenario tasks generating verifiable log outputs.
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#f8fafc] border border-[#eef1f3] rounded text-xs text-[#2d3748] flex items-center justify-between">
            <span>
              <strong>The Experience Bridge: </strong>
              {t('home.experienceBridgeExplain')}
            </span>
            <Link
              to="/candidate/experience-bridge"
              className="text-xs font-bold text-(--navy) hover:underline shrink-0 ml-4"
            >
              Explore Scenarios →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CLOSED LOOP INTELLIGENCE FLOW */}
      <section className="site-container space-y-6">
        <div>
          <h2 className="text-xl font-bold text-(--navy) m-0">
            {t('home.howItWorks')}
          </h2>
          <p className="text-xs text-[#5a6578] mt-1">
            Continuous alignment connecting labour demand directly to state training capacity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="gov-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-(--orange) block mb-2">01</span>
              <h4 className="text-sm font-bold text-(--navy) mb-2">{t('home.step1Title')}</h4>
              <p className="text-xs text-[#5a6578] leading-relaxed m-0">{t('home.step1Desc')}</p>
            </div>
          </div>

          <div className="gov-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-(--orange) block mb-2">02</span>
              <h4 className="text-sm font-bold text-(--navy) mb-2">{t('home.step2Title')}</h4>
              <p className="text-xs text-[#5a6578] leading-relaxed m-0">{t('home.step2Desc')}</p>
            </div>
          </div>

          <div className="gov-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-(--orange) block mb-2">03</span>
              <h4 className="text-sm font-bold text-(--navy) mb-2">{t('home.step3Title')}</h4>
              <p className="text-xs text-[#5a6578] leading-relaxed m-0">{t('home.step3Desc')}</p>
            </div>
          </div>

          <div className="gov-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-(--orange) block mb-2">04</span>
              <h4 className="text-sm font-bold text-(--navy) mb-2">{t('home.step4Title')}</h4>
              <p className="text-xs text-[#5a6578] leading-relaxed m-0">{t('home.step4Desc')}</p>
            </div>
          </div>

          <div className="gov-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-(--orange) block mb-2">05</span>
              <h4 className="text-sm font-bold text-(--navy) mb-2">{t('home.step5Title')}</h4>
              <p className="text-xs text-[#5a6578] leading-relaxed m-0">{t('home.step5Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKSPACE ACCESS TILES */}
      <section className="site-container space-y-6">
        <div>
          <h2 className="text-xl font-bold text-(--navy) m-0">
            Dedicated Stakeholder Workspaces
          </h2>
          <p className="text-xs text-[#5a6578] mt-1">
            Role-tailored tools for all participants in Maharashtra's skills ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gov-card border-t-2 border-t-(--navy)">
            <Users className="w-6 h-6 text-(--navy) mb-3" />
            <h3 className="text-sm font-bold text-(--navy) mb-1">Candidate Portal</h3>
            <p className="text-xs text-[#5a6578] mb-4">
              Diagnostic readiness test, Experience Bridge practical tasks, and Competency Passport.
            </p>
            <Link to="/candidate" className="text-xs font-bold text-(--navy) hover:underline flex items-center gap-1">
              <span>Open Candidate View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="gov-card border-t-2 border-t-(--navy)">
            <GraduationCap className="w-6 h-6 text-(--navy) mb-3" />
            <h3 className="text-sm font-bold text-(--navy) mb-1">Institute Workspace</h3>
            <p className="text-xs text-[#5a6578] mb-4">
              Course health metrics, lab capacity monitoring, and What-If planning simulator.
            </p>
            <Link to="/institute" className="text-xs font-bold text-(--navy) hover:underline flex items-center gap-1">
              <span>Open Institute View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="gov-card border-t-2 border-t-(--navy)">
            <Building2 className="w-6 h-6 text-(--navy) mb-3" />
            <h3 className="text-sm font-bold text-(--navy) mb-1">Employer Workspace</h3>
            <p className="text-xs text-[#5a6578] mb-4">
              Competency framework specification, candidate evidence review, and validation queue.
            </p>
            <Link to="/employer" className="text-xs font-bold text-(--navy) hover:underline flex items-center gap-1">
              <span>Open Employer View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="gov-card border-t-2 border-t-(--navy)">
            <Briefcase className="w-6 h-6 text-(--navy) mb-3" />
            <h3 className="text-sm font-bold text-(--navy) mb-1">Government Intelligence</h3>
            <p className="text-xs text-[#5a6578] mb-4">
              District capacity distribution, labour market signals, and policy intervention tools.
            </p>
            <Link to="/government" className="text-xs font-bold text-(--navy) hover:underline flex items-center gap-1">
              <span>Open Planner View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home

