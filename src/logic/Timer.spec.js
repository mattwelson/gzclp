import Timer from './Timer'

import moment from 'moment'

describe('timer', () => {
  it('instantiates', () => {
    const timer = new Timer()
    expect(timer instanceof Timer).toBe(true)
  })

  it('logs the time when start is called', () => {
    const timer = new Timer()
    timer.start()

    expect(timer.startTime.isSame(moment(), 'second')).toBe(true)
  })

  it('returns the elapsed time in milliseconds', async () => {
    const timer = new Timer()
    const now = moment()
    timer.start(now.clone().subtract(1, 'seconds'))
    expect(timer.getTime(now)).toBeCloseTo(1000)
  })

  it('pause clears the start time', () => {
    const timer = new Timer()
    timer.start()
    timer.pause()
    expect(timer.startTime).toBeNull()
  })

  it('pause sets the ellapsed time', () => {
    const timer = new Timer()
    const now = moment()

    timer.start(now.clone().subtract(0.2, 'seconds'))
    timer.pause(now)

    expect(timer.getTime()).toBe(200)
  })

  it('pause sets the ellapsed time', () => {
    const timer = new Timer()
    const now = moment()

    timer.start(now.clone().subtract(12, 'seconds'))
    timer.pause(now.clone().subtract(10, 'seconds'))
    expect(timer.getTime(now)).toBe(2000)

    timer.start(now.clone().subtract(5, 'seconds'))
    timer.pause(now)

    expect(timer.getTime(now)).toBe(7000)
  })
})
