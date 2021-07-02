import round from 'lodash/round'

const formatTime = (date, isUnbonding = false) => {
  if (!date) { return '0s' }
  const now = new Date()
  const dateConvert = new Date(date)
  const days = (now - dateConvert) / 86400000

  const year = days / 365
  if (year > 1) { return Math.round(year) + ' years' }
  const month = days / 30
  if (month > 1) { return Math.round(month) + ' months' }

  const hours = (days - parseInt(days)) * 24
  const minutes = (hours - parseInt(hours)) * 60
  const seconds = (minutes - parseInt(minutes)) * 60

  let str = ''
  if (days > 1) { str += parseInt(days) + 'd ' }

  if (isUnbonding) { return days }

  if (hours > 1) { str += parseInt(hours) + 'h ' }
  if (days > 1) { return ' > ' + str }
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
    '/cosmos.gov.v1beta1.MsgDeposit': 'Deposite',

    '/cosmos.staking.v1beta1.MsgCreateValidator': 'Create Validator',
    '/ibc.core.connection.v1.MsgConnectionOpenInit': 'IBC Connection Open Init',
    '/ibc.core.channel.v1.MsgChannelOpenInit': 'IBC Channel Open Init',
    '/ibc.core.channel.v1.MsgChannelOpenTry': 'IBC Channel Open Try',
    '/ibc.core.channel.v1.MsgAcknowledgement': 'IBC Acknowledgement',
    '/ibc.core.channel.v1.MsgRecvPacket': 'IBC Recv Packet',
    '/ibc.core.connection.v1.MsgConnectionOpenTry': 'IBC Connection Open Try',
    '/ibc.core.connection.v1.MsgConnectionOpenAck': 'IBC Connection Open Ack',
    '/ibc.core.channel.v1.MsgTimeout': 'IBC Timeout',
    '/ibc.core.channel.v1.MsgChannelOpenAck': 'IBC Channel Open Ack',
    '/ibc.core.connection.v1.MsgConnectionOpenConfirm': 'IBC Connection Open Confirm',
    '/cosmos.slashing.v1beta1.MsgUnjail': 'Unjail',
    '/cosmos.staking.v1beta1.MsgEditValidator': 'Edit Validator',
    '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': 'Create Vesting Account',
    '/cosmos.gov.v1beta1.MsgSubmitProposal': 'Submit Proposal'
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

const calculateValueFromArr = (arr) => {
  if (!arr) { return 0 }

  let i = 0
  let total = 0
  for (; i < arr.length; i++) {
    total += parseFloat(arr[i].amount)
  }

  return total
}

const getTotalUnbondings = (arr) => {
  if (!arr) { return 0 }

  let i = 0
  let total = 0
  for (; i < arr.length; i++) {
    if (arr[i].entries) {
      total += arr[i].entries.balance
    }
  }

  return total
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
  if (!value) { return '' }
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

const getTotalRewards = (rewards) => {
  if (!rewards) { return 0 }

  let total = 0
  let i = 0
  for (; i < rewards.length; i++) {
    if (rewards[i].reward) {
      let j = 0
      for (; j < rewards[i].reward.length; j++) {
        total += parseFloat(rewards[i].reward[j].amount)
      }
    }
  }

  return total
}

const getRewardByAddress = (rewards, address) => {
  if (!rewards || !address) { return (0).toFixed(6) }

  let i = 0
  let total = 0
  for (; i < rewards.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (rewards[i].reward && rewards[i].validator_address == address) {
      let j = 0
      for (; j < rewards[i].reward.length; j++) {
        total += parseFloat(rewards[i].reward[j].amount)
      }
      break
    }
  }

  return (total / Math.pow(10, 6)).toFixed(6)
}

const getTypeProposal = (value) => {
  const arrayType = {
    PROPOSAL_STATUS_PASSED: 'PASSED',
    PROPOSAL_STATUS_REJECTED: 'REJECTED',
    PROPOSAL_STATUS_DEPOSIT_PERIOD: 'DEPOSIT PERIOD',
    PROPOSAL_STATUS_VOTING_PERIOD: 'VOTING PERIOD'
  }

  return arrayType[value] ? arrayType[value] : ''
}

export default {
  getTotalUnbondings, calculateValueFromArr, getTypeProposal, getRewardByAddress, getTotalRewards, formatTime, formatNumber, cumulativeShare, totalSupplyTokens, isActiveValidator, formatHash, getAvatarValidator, calcutatDelegations, convertTime, getTypeTx, getAddrTx, getFeeTx, getAmount
}
