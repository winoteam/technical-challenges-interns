import lighten from './../lighten'

describe('lighten', () => {
  it('should lighten a color by 10%', () => {
    expect(lighten(0.1, '#444')).toBe('#5e5e5e')
  })

  it('should lighten a hex color by 20%', () => {
    expect(lighten(0.2, '#CCCD64')).toBe('#e5e6b1')
  })

  it('should lighten an 8-digit hex color by 20%', () => {
    expect(lighten(0.2, '#6564CDB3')).toBe('rgba(178,177,230,0.7)')
  })

  it('should lighten an 4-digit hex color by 20%', () => {
    expect(lighten(0.2, '#0f08')).toBe('rgba(102,255,102,0.53)')
  })

  it('should lighten a color with opacity by 20%', () => {
    expect(lighten(0.2, 'rgba(101,100,205,0.7)')).toBe('rgba(178,177,230,0.7)')
  })

  it('should lighten a color but not go beyond 255', () => {
    expect(lighten(0.8, 'rgba(255,200,200,0.7)')).toBe('rgba(255,255,255,0.7)')
  })
})
