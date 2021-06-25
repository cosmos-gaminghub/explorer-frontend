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

const convertTime = (date) => {
  if (!date) { return null }
  const convertDate = new Date(date)
  const year = convertDate.getFullYear()
  let month = convertDate.getMonth() + 1
  let day = convertDate.getDate()
  month = (month < 10) ? '0' + month : month
  day = (day < 10) ? '0' + day : day

  let hour = convertDate.getHours()
  let minutes = convertDate.getMinutes()
  let seconds = convertDate.getSeconds()
  hour = (hour < 10) ? '0' + hour : hour
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return [[year, month, day].join('-'), [hour, minutes, seconds].join(':')].join(' ')
}

const getTypeTx = (messages) => {
  if (!messages) {
    return ''
  }
  const objMsg = JSON.parse(messages)
  const strType = objMsg ? objMsg[0]['@type'] : ''

  const typeArr = {
    '/ibc.core.client.v1.MsgUpdateClient': 'IBC Update Client',
    '/cosmos.staking.v1beta1.MsgDelegate': 'Delegate',
    '/cosmos.staking.v1beta1.MsgUndelegate': 'Undelegate',
    '/cosmos.bank.v1beta1.MsgSend': 'Send',
    '/ibc.applications.transfer.v1.MsgTransfer': 'IBC Transfer',
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': 'Get Reward',
    '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': 'Withdraw',
    '/cosmos.bank.v1beta1.MsgMultiSend': 'Multi Send',
    '/cosmos.gov.v1beta1.MsgVote': 'Vote',
    '/cosmos.staking.v1beta1.MsgBeginRedelegate': 'Redelegate',
    '/cosmos.gov.v1beta1.MsgDeposit': 'Deposite'
  }

  return typeArr[strType] ? typeArr[strType] : strType
}

const getAddrTx = (messages, type) => {
  if (messages && type) {
    let obj = JSON.parse(messages)
    if (obj) {
      obj = obj[0]
      // eslint-disable-next-line eqeqeq
      if (type == 'from') { return obj.from_address } else { return obj.to_address }
    }
  }

  return ''
}

const getAmount = (messages) => {
  if (messages) {
    const obj = JSON.parse(messages)
    let totalAmount = null

    if (obj[0] && obj[0].amount) {
      let i = 0
      totalAmount = 0
      for (; i < obj[0].amount.length; i++) {
        totalAmount += obj[0].amount[i].amount
      }
    }

    return totalAmount
  }

  return 0
}

const getFeeTx = (fee) => {
  if (!fee) { return (0).toFixed(6) }
  const obj = JSON.parse(fee)
  let amount = 0

  if (obj && obj.amount) {
    let i = 0
    for (; i < obj.amount.length; i++) {
      amount += obj.amount[i].amount
    }
  }

  return amount
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
  formatTime, formatNumber, cumulativeShare, totalSupplyTokens, isActiveValidator, formatHash, getAvatarValidator, calcutatDelegations, convertTime, getTypeTx, getAddrTx, getFeeTx, getAmount
}
