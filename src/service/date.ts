export function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`
}

export function format(value: Date): string {
  const year = value.getFullYear()
  const month = padZero(value.getMonth() + 1)
  const day = padZero(value.getDate())
  const hour = padZero(value.getHours())
  const minute = padZero(value.getMinutes())

  return `${year}-${month}-${day} ${hour}:${minute}`
}

export interface Countdown {
  value: string
  style: 'info' | 'warning' | 'danger'
}

export function countdown(date: Date): Countdown {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const dValue = Math.abs(diff)
  const outdated = diff < 0

  const minute = Math.floor(dValue / 1000 / 60)
  const second = outdated
    ? Math.ceil((dValue / 1000) % 60)
    : Math.floor((dValue / 1000) % 60)

  if (minute >= 10) {
    return {
      value: `${outdated ? '-' : ' '}${minute}m`,
      style: 'info',
    }
  }

  return {
    value: `${outdated ? '-' : ' '}${minute}m ${second}s`,
    style: outdated ? 'danger' : 'warning',
  }
}

export function outdated(date: Date, duration = 0): boolean {
  const d = date.getTime()
  const now = Date.now()

  return d < now - duration * 1000
}
