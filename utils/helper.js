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
  if (days > 0) { str += parseInt(days) + 'd ' }
  if (hours > 0) { str += parseInt(hours) + 'h ' }
  if (days > 0) { return ' > ' + str }
  if (minutes) { str += parseInt(minutes) + 'm ' }
  str += seconds + 's '

  return str
}

const formatNumber = (number) => {
  if (!number || isNaN(number)) { return 0 }
  number = round(number, 0)
  number = number.toString().replace(/,/g, '')
  return number.replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

const cumulativeShare = (validators, index, bondedTokens) => {
  let totalVotingPower = 0
  for (let i = 0; i < index + 1; i++) {
    totalVotingPower += validators[i].voting_power * Math.pow(10, 2)
  }
  return totalVotingPower ? (totalVotingPower / bondedTokens).toFixed(2) : 0.00
}

const totalSupplyTokens = (data) => {
  let totalSupplyTokens = 0

  if (data && data.total_supply_tokens && data.total_supply_tokens.supply) {
    for (let i = 0; i < data.total_supply_tokens.supply.length; i++) {
      totalSupplyTokens += parseInt(data.total_supply_tokens.supply[i].amount)
    }
  }

  return totalSupplyTokens
}

const isActiveValidator = (validator) => {
  // eslint-disable-next-line eqeqeq
  return (!validator.jailed && validator.status == 'BOND_STATUS_BONDED')
}

const formatHash = (value, startPos, endPos) => {
  return value.substr(0, startPos) + '...' + value.substr(value.length - endPos, value.length - 1)
}

const getAvatarValidator = (avatar) => {
  return 'https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/moniker/cosmoshub/' + avatar + '.png'
}

const calcutatDelegations = (delegations) => {
  let total = 0
  for (let i = 0; i < delegations.length; i++) {
    total += delegations[i].amount
  }
  return total
}

export default {
  formatTime, formatNumber, cumulativeShare, totalSupplyTokens, isActiveValidator, formatHash, getAvatarValidator, calcutatDelegations
}
