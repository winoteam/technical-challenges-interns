export default function pipe(...fns: Function[]): any {
  if (fns.length === 0) throw Error('At least one argument must be provided')
  return fns[0]
}
