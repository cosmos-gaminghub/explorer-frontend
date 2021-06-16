import round from 'lodash/round'

const formatTime = (date) => {
  if (!date) { return '0s' }
  const now = new Date()
  const dateConvert = new Date(date)
  const days = (now - dateConvert) / 86400000
  const hours = (days - parseInt(days)) * 24
  const minutes = (hours - parseInt(hours)) * 60
  const seconds = (minutes - parseInt(minutes)) * 60

  let str = ''
  if (days) { str += Math.round(days) + 'd ' }
  if (hours) { str += Math.round(hours) + 'h ' }
  if (days > 0) { return ' > ' + str }
  if (minutes) { str += Math.round(minutes) + 'm ' }
  str += seconds + 's '

  return str
}

const formatNumber = (number) => {
  if (!number || isNaN(number)) { return 0 }
  number = round(number, 0)
  number = number.toString().replace(/,/g, '')
  return number.replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

export default {
  formatTime, formatNumber
}
