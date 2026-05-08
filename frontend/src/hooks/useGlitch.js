import { useEffect, useRef, useState } from 'react'

const GLYPH_SETS = [
  ['ל','י','נ','ק','ד','ו','א','ב','ג','ה','מ','ס','ע','פ','צ'],
  ['链','接','短','码','网','络','数','字','系','统','控','制','域','址','网'],
  ['لِ','نْ','كْ','دُ','وْ','اَ','بِ','تْ','رَ','سْ','مَ','قِ','فْ','هَ','خْ'],
  ['リ','ン','ク','ド','ウ','ネ','ッ','ト','サ','イ','バ','ー','シ','ス','テ'],
]

function randChar(set) {
  return set[Math.floor(Math.random() * set.length)]
}

function corruptText(original, set, intensity) {
  return original.split('').map(c => {
    if (c === '.' || c === ' ' || c === '/') return c
    return Math.random() < intensity ? randChar(set) : c
  }).join('')
}

export function useGlitch(original, intervalMs = 3500) {
  const [display, setDisplay] = useState(original)
  const [ghost1, setGhost1] = useState({ text: original, x: 0, y: 0, clip: '', opacity: 0 })
  const [ghost2, setGhost2] = useState({ text: original, x: 0, y: 0, clip: '', opacity: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const runGlitch = () => {
      const set = GLYPH_SETS[Math.floor(Math.random() * GLYPH_SETS.length)]
      let frame = 0
      const totalFrames = 20

      const tick = () => {
        const t = frame / totalFrames
        const intensity = t < 0.5 ? t * 2 : (1 - t) * 2

        setDisplay(corruptText(original, set, intensity * 0.85))

        setGhost1({
          text: corruptText(original, set, intensity),
          x: -3 + Math.random() * 6,
          y: -1 + Math.random() * 3,
          clip: `polygon(0 ${10 + Math.random() * 20}%, 100% ${10 + Math.random() * 15}%, 100% ${38 + Math.random() * 15}%, 0 ${35 + Math.random() * 15}%)`,
          opacity: intensity > 0.08 ? intensity : 0,
        })

        setGhost2({
          text: corruptText(original, set, intensity),
          x: 3 + Math.random() * 4,
          y: 1 + Math.random() * 3,
          clip: `polygon(0 ${55 + Math.random() * 10}%, 100% ${58 + Math.random() * 10}%, 100% ${78 + Math.random() * 10}%, 0 ${75 + Math.random() * 10}%)`,
          opacity: intensity > 0.08 ? intensity * 0.75 : 0,
        })

        frame++
        if (frame <= totalFrames) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(original)
          setGhost1(g => ({ ...g, opacity: 0 }))
          setGhost2(g => ({ ...g, opacity: 0 }))
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    runGlitch()
    const id = setInterval(runGlitch, intervalMs)
    return () => {
      clearInterval(id)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [original, intervalMs])

  return { display, ghost1, ghost2 }
}
