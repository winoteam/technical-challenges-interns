export default function compose(fn?: Function) {
  if (!fn) throw Error('At least one argument must be provided')
  return fn()
}
