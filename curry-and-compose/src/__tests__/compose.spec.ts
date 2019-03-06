import compose from './../compose'

describe('compose', () => {
  it('should throw an error if no argument are provided', () => {
    try {
      compose()
      fail('Something did not reject')
    } catch (err) {
      expect(String(err)).toMatch('...')
    }
  })

  it('should compose two functions', () => {
    function reverse() {
      return function(value) {
        return value
          .split()
          .reverse()
          .join('')
      }
    }
    function uppercase() {
      return function(value) {
        return value.toUpperCase()
      }
    }
    expect(
      compose(
        reverse,
        uppercase,
      )('Léo'),
    ).toBe('OEL')
  })

  it('should compose two functions', () => {
    function reverse() {
      return function(value) {
        return value
          .split()
          .reverse()
          .join('')
      }
    }
    function uppercase() {
      return function(value) {
        return value.toUpperCase()
      }
    }
    expect(
      compose(
        reverse(),
        uppercase(),
      )('Léo'),
    ).toBe('OEL')
  })

  it('should compose two functions without arguments', () => {
    function reverse() {
      return function(value) {
        return value
          .split()
          .reverse()
          .join('')
      }
    }
    function uppercase() {
      return function(value) {
        return value.toUpperCase()
      }
    }
    expect(
      compose(
        reverse,
        uppercase,
      )('Léo'),
    ).toBe('OEL')
  })
})
