import curry from './../curry'

describe('curry', () => {
  function foo(a: string, b: string, c: string) {
    return `${a}${b}${c}`
  }
  const curryFoo = curry(foo)

  it('should pass function', () => {
    expect(curryFoo('a', 'b', 'c')).toBe('abc')
  })

  it('should curry function (1)', () => {
    expect(curryFoo('a', 'b')('c')).toBe('abc')
  })

  it('should curry function (2)', () => {
    expect(curryFoo('a')('b', 'c')).toBe('abc')
  })

  it('should curry function (3)', () => {
    expect(curryFoo('a')('b')('c')).toBe('abc')
  })
})
