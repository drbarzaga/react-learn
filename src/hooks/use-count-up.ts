import { useEffect, useState } from "react"

export function useCountUp(target: number | null, duration = 1000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target === null) return
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(progress * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}
