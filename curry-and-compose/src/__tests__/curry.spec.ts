import curry from './../curry'

describe('curry', () => {
  it('should return passed function', () => {
    function foo() {
      return 'foo'
    }
    expect(curry(foo)).toBe(foo)
  })
})
