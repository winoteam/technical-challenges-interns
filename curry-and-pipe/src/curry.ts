export default function curry(fn: Function, ...lastArgs: any[]) {
  return fn(...lastArgs)
}
