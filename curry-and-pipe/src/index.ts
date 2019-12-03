import darken from './darken'
import lighten from './lighten'
// import pipe from './pipe'
// import curry from './curry'

// Step 1: Darken and ligten utils
console.log('Darken and ligten utils')
const colorA = lighten(0.2, '#000')
const colorB = darken(0.2, '#fff')
console.log({ colorA, colorB })

// Step 2: Functions that return a function
// console.log('\nFunctions that return a function')
// const doubleFunction = (a: number) => (b: number) => a + b
// console.log('doubleFunction', doubleFunction(1)(2))

// Step 3: Introduce basic pipe function
// console.log('\nIntroduce basic pipe function')
// const init = () => {
//   return 5
// }
// const add1 = (value: number) => {
//   return value + 1
// }
// const add4 = (value: number) => {
//   return value + 4
// }
// console.log(
//   'Result: ',
//   pipe(
//     init, //5
//     add1, //6
//     add4, //10
//   )(),
// )

// Step 4: Use pipe and double functions
// console.log('\nIntroduce pipe function with double function')
// const start = (a: number) => () => a
// const add = (a: number) => (b: number) => a + b
// console.log(
//   'Result: ',
//   pipe(
//     start(5), //5
//     add(1), //6
//     add(4), //10
//   )(),
// )

// Step 5: Use pipe and double functions to enjoy a mind-blowing experience
// console.log(
//   '\nUse pipe and double functions to enjoy a mind-blowing experience',
// )
// console.log(
//   'Result: ',
//   pipe(
//     add(1), //6
//     add(4), //10
//   )(5),
// )

// Step 6: Create curry function
// console.log('\nCreate curry function')
// const curriedDarken = curry(darken)
// const curriedLighten = curry(lighten)
// const colorC = curriedLighten(0.2)('#000')
// const colorD = curriedDarken(0.2)('#fff')
// console.log({ colorC, colorD })

// Step 7: Explosion
// console.log('\nExplosion')
// const tone = pipe(
//   curriedLighten(0.2),
//   curriedDarken(0.2),
// )
// const colorE = tone('#eee')
// console.log({ colorE })
