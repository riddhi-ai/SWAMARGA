type Status = "verified" | "unverified" | "gap" | "developing"

type Props = {
  status: Status
}

const labels: Record<Status, string> = {
  verified: "Verified",
  unverified: "Needs evidence",
  gap: "Skill gap",
  developing: "Developing",
}

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`status-badge status-${status}`}>
      {labels[status]}
    </span>
  )
}
