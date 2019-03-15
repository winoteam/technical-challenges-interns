import compose from './../compose'

describe('compose', () => {
  it('should throw an error if no argument are provided', () => {
    try {
      compose()
      fail('Something did not reject')
    } catch (err) {
      expect(String(err)).toMatch('At least one argument must be provided')
    }
  })

  it('should execute function', () => {
    const spy = jest.fn()
    compose(spy)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  // it('should compose two functions', () => {
  //   function reverse() {
  //     return function(value) {
  //       return value
  //         .split()
  //         .reverse()
  //         .join('')
  //     }
  //   }
  //   function uppercase() {
  //     return function(value) {
  //       return value.toUpperCase()
  //     }
  //   }
  //   expect(
  //     compose(
  //       reverse,
  //       uppercase,
  //     )('Léo'),
  //   ).toBe('OEL')
  // })

  // it('should compose two functions', () => {
  //   function reverse() {
  //     return function(value) {
  //       return value
  //         .split()
  //         .reverse()
  //         .join('')
  //     }
  //   }
  //   function uppercase() {
  //     return function(value) {
  //       return value.toUpperCase()
  //     }
  //   }
  //   expect(
  //     compose(
  //       reverse(),
  //       uppercase(),
  //     )('Léo'),
  //   ).toBe('OEL')
  // })

  // it('should compose two functions without arguments', () => {
  //   function reverse() {
  //     return function(value) {
  //       return value
  //         .split()
  //         .reverse()
  //         .join('')
  //     }
  //   }
  //   function uppercase() {
  //     return function(value) {
  //       return value.toUpperCase()
  //     }
  //   }
  //   expect(
  //     compose(
  //       reverse,
  //       uppercase,
  //     )('Léo'),
  //   ).toBe('OEL')
  // })
})
