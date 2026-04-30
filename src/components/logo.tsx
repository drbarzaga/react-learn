interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return <img src="/logo-clean.png" className={className} alt="React Dojo" draggable={false} />
}
