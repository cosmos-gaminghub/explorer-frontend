import round from 'lodash/round'

const formatTime = (date) => {
  if (!date) { return '0s' }
  const now = new Date()
  const dateConvert = new Date(date)
  const days = Math.abs(now - dateConvert) / 86400000

  const year = days / 365
  if (year >= 1) { return parseInt(year) + ' years' }
  const month = days / 30
  if (month >= 1) { return parseInt(month) + ' months' }

  if (days >= 1) { return parseInt(days) + ((days < 2) ? ' day' : ' days') }

  const hours = (days - parseInt(days)) * 24
  if (hours >= 1) { return parseInt(hours) + 'h' }

  const minutes = (hours - parseInt(hours)) * 60
  if (minutes >= 1) { return parseInt(minutes) + 'm' }

  const seconds = (minutes - parseInt(minutes)) * 60
  return parseInt(seconds) + 's'
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
  let seconds = Math.round(convertDate.getSeconds())
  hour = (hour < 10) ? '0' + hour : hour
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return [[year, month, day].join('-'), [hour, minutes, seconds].join(':')].join(' ')
}

const getTypeTx = (messages, isGetFromArr = false) => {
  if (!messages) {
    return ''
  }
  const typeArr = {
    '/ibc.core.client.v1.MsgUpdateClient': 'IBC Update Client', /* DONE */
    '/cosmos.staking.v1beta1.MsgDelegate': 'Delegate', /* DONE */
    '/cosmos.staking.v1beta1.MsgUndelegate': 'Undelegate', /* DONE */
    '/cosmos.bank.v1beta1.MsgSend': 'Send', /* DONE */
    '/ibc.applications.transfer.v1.MsgTransfer': 'IBC Transfer', /* DONE */
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': 'Get Reward', /* DONE */
    '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': 'Get Commission', /* DONE */
    '/cosmos.bank.v1beta1.MsgMultiSend': 'Multi Send', /* DONE */
    '/cosmos.gov.v1beta1.MsgVote': 'Vote', /* DONE */
    '/cosmos.staking.v1beta1.MsgBeginRedelegate': 'Redelegate', /* DONE */
    '/cosmos.gov.v1beta1.MsgDeposit': 'Deposit',
    '/cosmos.staking.v1beta1.MsgCreateValidator': 'Create Validator',
    '/ibc.core.connection.v1.MsgConnectionOpenInit': 'IBC Connection Open Init',
    '/ibc.core.channel.v1.MsgChannelOpenInit': 'IBC Channel Open Init',
    '/ibc.core.channel.v1.MsgChannelOpenTry': 'IBC Channel Open Try',
    '/ibc.core.channel.v1.MsgAcknowledgement': 'IBC Acknowledgement', /* DONE */
    '/ibc.core.channel.v1.MsgRecvPacket': 'IBC Recv Packet', /* DONE */
    '/ibc.core.connection.v1.MsgConnectionOpenTry': 'IBC Connection Open Try',
    '/ibc.core.connection.v1.MsgConnectionOpenAck': 'IBC Connection Open Ack',
    '/ibc.core.channel.v1.MsgTimeout': 'IBC Timeout',
    '/ibc.core.channel.v1.MsgChannelOpenAck': 'IBC Channel Open Ack',
    '/ibc.core.connection.v1.MsgConnectionOpenConfirm': 'IBC Connection Open Confirm',
    '/cosmos.slashing.v1beta1.MsgUnjail': 'Unjail',
    '/cosmos.staking.v1beta1.MsgEditValidator': 'Edit Validator',
    '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': 'Vesting Account',
    '/cosmos.gov.v1beta1.MsgSubmitProposal': 'Submit Proposal',
    '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': 'Modify Withdraw Address',
    '/irismod.nft.MsgMintNFT': 'Mint NFT',
    '/irismod.nft.MsgIssueDenom': 'Issue Denom',
    '/irismod.random.MsgRequestRandom': 'Request Random',
    '/irismod.nft.MsgTransferNFT': 'Transfer NFT',
    '/irismod.nft.MsgEditNFT': 'Edit NFT',
    '/irismod.coinswap.MsgAddLiquidity': 'Add Liquidity',
    '/irismod.coinswap.MsgSwapOrder': 'Swap Order',
    '/irismod.htlc.MsgCreateHTLC': 'Create HTLC',
    '/irismod.htlc.MsgClaimHTLC': 'Claim HTLC',
    '/akash.cert.v1beta1.MsgCreateCertificate': 'Create Certificate',
    '/akash.deployment.v1beta1.MsgCreateDeployment': 'Create Deployment',
    '/akash.cert.v1beta1.MsgRevokeCertificate': 'Revoke Certificate',
    '/akash.deployment.v1beta1.MsgUpdateDeployment': 'Update Deployment',
    '/akash.deployment.v1beta1.MsgCloseGroup': 'Close Group',
    '/akash.market.v1beta1.MsgCreateLease': 'Create Lease',
    '/akash.market.v1beta1.MsgWithdrawLease': 'Withdraw Lease',
    '/akash.market.v1beta1.MsgCloseBid': 'Close Bid',
    '/gravity.v1.MsgSendToEth': 'Gravity Send To ETH',
    '/gravity.v1.MsgRequestBatch': 'Gravity Request Batch',
    '/gravity.v1.MsgConfirmBatch': 'Gravity Confirm Batch',
    '/gravity.v1.MsgConfirmLogicCall': 'Gravity Confirm Logic Call',
    '/gravity.v1.MsgSendToCosmosClaim': 'Gravity Send To Cosmos Claim',
    '/gravity.v1.MsgBatchSendToEthClaim': 'Gravity Batch Send To ETH Claim',
    '/gravity.v1.MsgValsetUpdatedClaim': 'Gravity Valset Updated Claim',
    '/gravity.v1.MsgERC20DeployedClaim': 'Gravity ERC20 Deployed Claim',
    '/gravity.v1.MsgLogicCallExecutedClaim': 'Gravity Logic Call Executed Claim',
    '/gravity.v1.MsgSetOrchestratorAddress': 'Gravity Set Orchestrator Address',
    '/gravity.v1.MsgCancelSendToEth': 'Gravity Canceel Send To ETH',
    '/gravity.v1.MsgSubmitBadSignatureEvidence': 'Gravity Submit Bad Signature Evidence',
    '/osmosis.gamm.v1beta1.Pool': 'Pool',
    '/osmosis.gamm.v1beta1.MsgCreatePool': 'Create Pool',
    '/osmosis.gamm.v1beta1.MsgJoinPool': 'Join Pool',
    '/osmosis.gamm.v1beta1.MsgExitPool': 'Exit Pool',
    '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn': 'Swap Exact Amount In',
    '/osmosis.gamm.v1beta1.MsgSwapExactAmountOut': 'Swap Exact Amount In',
    '/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn': 'Join Swap Extern Amount In',
    '/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut': 'Join Swap Share Amount Out',
    '/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn': 'Exit Swap Share Amount In',
    '/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut': 'Exit Swap Extern Amount Out',
    '/osmosis.incentives.MsgCreateGauge': 'Create Gauge',
    '/osmosis.incentives.MsgAddToGauge': 'Add To Gauge',
    '/osmosis.lockup.MsgLockTokens': 'Lock Tokens',
    '/osmosis.lockup.MsgBeginUnlockingAll': 'Begin Unlocking All',
    '/osmosis.lockup.MsgUnlockTokens': 'Unlock Tokens',
    '/osmosis.lockup.MsgBeginUnlocking': 'Begin Unlocking',
    '/osmosis.lockup.MsgUnlockPeriodLock': 'Unlock Period Lock',
    '/osmosis.poolincentives.v1beta1.UpdatePoolIncentivesProposal': 'Update Pool Incentives Proposal'
  }

  if (!isGetFromArr) {
    const objMsg = JSON.parse(messages)
    const strType = objMsg ? objMsg[0]['@type'] : ''
    let str = typeArr[strType] ? typeArr[strType] : strType
    if (objMsg.length > 1) {
      str += ' +' + (objMsg.length - 1)
    }
    return str
  } else {
    return typeArr[messages] ? typeArr[messages] : messages
  }
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
      totalAmount = 0
      for (const kAmount in obj[0].amount) {
        if (kAmount === 'amount') { return obj[0].amount[kAmount] }
        // eslint-disable-next-line eqeqeq
        totalAmount += parseFloat(obj[0].amount[kAmount].amount)
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
      if (!arr[i].entries) { continue }
      let j = 0
      for (; j < arr[i].entries.length; j++) {
        total += parseFloat(arr[i].entries[j].balance)
      }
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

const cumulativeShare = (validators, index, bondedTokens, type) => {
  let totalVotingPower = 0
  for (let i = 0; i < index + 1; i++) {
    totalVotingPower += validators[i].voting_power * Math.pow(10, 2)
  }
  return totalVotingPower ? ((type === 'active') ? (totalVotingPower / bondedTokens) : Math.abs(100 - totalVotingPower / bondedTokens)).toFixed(2) : 0.00
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
  if (!avatar) { return '#' }
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

const convertValidators = (data) => {
  if (!data) { return [] }

  let i = 0
  // eslint-disable-next-line prefer-const
  let dataConvert = {}
  for (; i < data.length; i++) {
    dataConvert[data[i].operator_address] = data[i].moniker
  }

  return dataConvert
}
export default {
  convertValidators, getTotalUnbondings, calculateValueFromArr, getTypeProposal, getRewardByAddress, getTotalRewards, formatTime, formatNumber, cumulativeShare, totalSupplyTokens, isActiveValidator, formatHash, getAvatarValidator, calcutatDelegations, convertTime, getTypeTx, getAddrTx, getFeeTx, getAmount
}
