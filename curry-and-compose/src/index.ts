import lighten from './lighten'
import curry from './curry'
// import compose from './compose'

// Case A
export const colorA = lighten()

// Case B
export const colorB = lighten()

// Case C
export const colorC1 = curry(lighten(2)('red'))
export const colorC2 = curry(lighten(2, 'red'))
