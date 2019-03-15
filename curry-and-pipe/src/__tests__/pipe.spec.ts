import pipe from '../pipe'

describe('pipe', () => {
  it('should throw an error if no argument are provided', () => {
    try {
      pipe()
      fail('Something did not reject')
    } catch (err) {
      expect(String(err)).toMatch('At least one argument must be provided')
    }
  })

  it('should execute function', () => {
    const spy = jest.fn()
    pipe(spy)()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should pipe basic stuff', () => {
    const init = () => {
      return 5
    }
    const add1 = (value: number) => {
      return value + 1
    }
    const add4 = (value: number) => {
      return value + 4
    }
    expect(
      pipe(
        init,
        add1,
        add4,
      )(),
    ).toBe(10)
  })

  it('should pipe double functions', () => {
    const init = (a: number) => () => {
      return a
    }
    const add = (a: number) => (b: number) => {
      return a + b
    }
    expect(
      pipe(
        init(5),
        add(1),
        add(4),
      )(),
    ).toBe(10)
  })

  it('should curry pipe', () => {
    const add = (a: number) => (b: number) => {
      return a + b
    }
    expect(
      pipe(
        add(1),
        add(4),
      )(5),
    ).toBe(10)
  })
})
