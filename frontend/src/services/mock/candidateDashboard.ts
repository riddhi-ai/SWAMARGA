import type { CandidateDashboardData } from "../../types/candidate"

export const candidateDashboardData: CandidateDashboardData = {
  candidate: {
    id: 1,
    name: "Riddhi Naskari",
    email: "riddhi.demo@swamarga.local",
    targetRole: "Cloud Support Associate",
    location: "Pune, Maharashtra",
    readiness: 68,
  },

  skills: [
    {
      name: "Linux",
      category: "Technical",
      level: "Strong",
      evidenceStatus: "Verified",
    },
    {
      name: "Troubleshooting",
      category: "Technical",
      level: "Strong",
      evidenceStatus: "Verified",
    },
    {
      name: "AWS",
      category: "Cloud",
      level: "Developing",
      evidenceStatus: "Unverified",
    },
    {
      name: "Networking",
      category: "Technical",
      level: "Gap",
      evidenceStatus: "Missing",
    },
    {
      name: "Docker",
      category: "Technical",
      level: "Gap",
      evidenceStatus: "Missing",
    },
  ],

  skillGaps: ["Networking", "Docker"],
  evidenceGaps: ["AWS", "Networking", "Docker"],
}
