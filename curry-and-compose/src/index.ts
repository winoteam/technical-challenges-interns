import darken from './darken'
import lighten from './lighten'

// Step A: try to use lighten and darken functions
const colorA = lighten(0.2, '#000')
const colorB = darken(0.2, '#fff')
console.log({ colorA, colorB })
