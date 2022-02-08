import { useEffect, useState } from 'react'

export function useWindowDimansions() {
  const [windowSize, setWindowSize] = useState({})

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    })
  }, [])

  return {
    // @ts-expect-error since width might not be preset at first
    width: windowSize.width,
    // @ts-expect-error since height might not be preset at first
    height: windowSize.height
  }
}