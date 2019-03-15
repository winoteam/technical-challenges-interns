import guard from 'polished/lib/internalHelpers/_guard'
import parseToHsl from 'polished/lib/color/parseToHsl'
import toColorString from 'polished/lib/color/toColorString'

export default function lighten(amount: number, color: string) {
  if (color === 'transparent') return color
  const hslColor = parseToHsl(color)
  return toColorString({
    ...hslColor,
    lightness: guard(0, 1, hslColor.lightness + parseFloat(String(amount))),
  })
}
