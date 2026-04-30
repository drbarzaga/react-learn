import Image from "next/image"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo-clean.png"
      className={className}
      alt="React Dojo"
      loading={"eager"}
      draggable={false}
      width={100}
      height={100}
    />
  )
}
