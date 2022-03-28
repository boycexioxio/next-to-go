import { describe, expect, test } from 'vitest'

import { format, padZero } from './date'

describe('pad zero', () => {
  test('should pad zero', () => {
    expect(padZero(1)).toBe('01')
  })

  test('should not pad zero', () => {
    expect(padZero(10)).toBe('10')
  })
})

describe('format', () => {
  test('show return formatted date string', () => {
    const date = new Date('2020-01-01T00:00:00')

    expect(format(date)).toBe('2020-01-01 00:00')
  })
})
