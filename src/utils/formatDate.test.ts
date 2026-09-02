import dayjs from 'dayjs';
import formatDate from './formatDate';
import { expect, it, describe, vi, beforeEach,afterEach } from 'vitest'

describe('test suite: formatDate',()=>{
    beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T10:00:00'))
  })
    afterEach(() => {
    vi.useRealTimers()
  })
  it('it convert dayjs date into date string in this format (h:mmA DD/MM/YYYY)', () => {
    expect(formatDate(dayjs())).toBe('10:00AM 15/01/2024')
  });
})