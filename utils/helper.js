import round from 'lodash/round'

const arrTypeDefined = {
  '/cosmos.bank.v1beta1.MsgMultiSend': 'Multi Send', /* DONE */
  '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': 'Get Reward', /* DONE xong 59FD2893F445A2961AA27B2972D28AC6F049EB9268A205CAF161C8611783EFE7 */
  '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': 'Get Commission', /* DONE xong 59FD2893F445A2961AA27B2972D28AC6F049EB9268A205CAF161C8611783EFE7 */
  '/cosmos.gov.v1beta1.MsgVote': 'Vote', /* DONE Xong 5CCC05716E6F45BFC81B36FDE14EACA6483CF5B55818ADC539C3330C3F588B56 */
  '/cosmos.staking.v1beta1.MsgBeginRedelegate': 'Redelegate', /* DONE Xong BB2A8A8782E09888209CE1E70ED26DBB3DF7B71F133C80060EF1CD3CBE64C4E2 */
  '/cosmos.staking.v1beta1.MsgDelegate': 'Delegate', /* DONE Xong 4DFFBBC945A4693B3549C251F6CD96B2B08C9C6EAD5A9282BCCE5FD2C7EF821C */
  '/cosmos.staking.v1beta1.MsgUndelegate': 'Undelegate', /* DONE Xong A5E870F7B1D10F1C1422CA39B5A80BD92ECA3FCFE363CC93E06DB397129BC517 */
  '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': 'Modify Withdraw Address', /* DONE Xong EE330EF08ADE46FABD6D30EF491A7D1C54E838CB37A5243CFADDCF670A770CA5 */
  '/cosmos.staking.v1beta1.MsgCreateValidator': 'Create Validator', /* DONE */
  '/cosmos.staking.v1beta1.MsgEditValidator': 'Edit Validator', /* DONE */
  '/cosmos.gov.v1beta1.MsgSubmitProposal': 'Submit Proposal', /* DONE */
  '/cosmos.slashing.v1beta1.MsgUnjail': 'Unjail', /* DONE */
  '/cosmos.bank.v1beta1.MsgSend': 'Send', /* DONE */
  '/ibc.applications.transfer.v1.MsgTransfer': 'IBC Transfer', /* DONE Xong D6D0D2DD143DCCE7968693F11774F7BF9EEC91BBA59DCE764A3EECD28DC03B8A */
  '/ibc.core.client.v1.MsgUpdateClient': 'IBC Update Client', /* DONE Xong D65EB4038D1713D3F2EB80CF291AA4F3F118F8FC760EC9B3A149295E24F68DE8 */
  '/ibc.core.channel.v1.MsgChannelOpenTry': 'IBC Channel Open Try', /* DONE Xong D65EB4038D1713D3F2EB80CF291AA4F3F118F8FC760EC9B3A149295E24F68DE8 */
  '/ibc.core.channel.v1.MsgRecvPacket': 'IBC Recv Packet', /* DONE Xong 952BB01F4880101D18BA1A46BA84E4854451977D8C6AB8D45859D80D326C944D */
  '/ibc.core.channel.v1.MsgAcknowledgement': 'IBC Acknowledgement', /* DONE Xong */
  '/ibc.core.connection.v1.MsgConnectionOpenTry': 'IBC Connection Open Try', /* C674AE218E0C68883C1613D9808606869B319BA4ECB5451FB2B69964CE53E990 */

  '/cosmos.gov.v1beta1.MsgDeposit': 'Deposit', /* DONE */
  '/ibc.core.connection.v1.MsgConnectionOpenInit': 'IBC Connection Open Init',
  '/ibc.core.channel.v1.MsgChannelOpenInit': 'IBC Channel Open Init',
  '/ibc.core.connection.v1.MsgConnectionOpenAck': 'IBC Connection Open Ack',
  '/ibc.core.channel.v1.MsgTimeout': 'IBC Timeout',
  '/ibc.core.channel.v1.MsgChannelOpenAck': 'IBC Channel Open Ack',
  '/ibc.core.connection.v1.MsgConnectionOpenConfirm': 'IBC Connection Open Confirm',
  '/ibc.core.client.v1.MsgCreateClient': 'IBC Create Client',
  '/ibc.core.channel.v1.MsgChannelOpenConfirm': 'IBC Channel Open Confirm',
  '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': 'Vesting Account',
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
const arrTxNeedLogs = {
  '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': {
    text: 'Amount',
    type: 'withdraw_rewards'
  },
  '/cosmos.staking.v1beta1.MsgDelegate': {
    text: 'Auto Claim Reward',
    type: 'transfer'
  },
  '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': {
    text: 'Amount',
    type: 'withdraw_commission'
  },
  '/cosmos.staking.v1beta1.MsgBeginRedelegate': {
    text: 'Auto Claim Reward',
    type: 'transfer'
  },
  '/cosmos.staking.v1beta1.MsgUndelegate': {
    text: 'Auto Claim Reward',
    type: 'transfer'
  }
}

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

const getTypeTxFromStr = (msg) => {
  if (arrTypeDefined[msg]) { return arrTypeDefined[msg] }
  let textType = msg.split('.')
  if (textType.length) {
    textType = textType[textType.length - 1].split('Msg')
    textType = textType[textType.length - 1]
    let before = ''
    if (textType.search('ibc') >= 0) { before = 'IBC' }
    return before + textType.replaceAll(/[A-Z]?/gi, function (str) {
      if (str !== ' ' && str === str.toUpperCase()) { return ' ' + str }
      return str
    })
  }

  return textType
}

const getColumnFromMsgTx = (data, timestamp = null) => {
  if (!data) { return [] }
  let msg = data.messages
  // eslint-disable-next-line prefer-const
  let logs = data.logs || ''
  // eslint-disable-next-line prefer-const
  let currentDenom = data.current_denom || 'ATOM'
  // eslint-disable-next-line prefer-const
  let currentPrefix = data.current_prefix || 'cosmos'

  if (!msg || !JSON.parse(msg)) { return [] }
  msg = JSON.parse(msg)

  const arrKeyForAcc = [
    'delegator_address',
    'validator_addr',
    'from_address',
    'to_address',
    'validator_address',
    'validator_src_address',
    'validator_dst_address',
    'withdraw_address',
    'signer',
    'sender',
    'receiver',
    'proposer',
    'voter'
  ]
  const arrAmount = ['token', 'amount', 'value', 'min_self_delegation']
  const arrText = [
    'denom',
    'proposal_id',
    'source_port',
    'source_channel',
    'client_id',
    'client_type',
    'timestamp'
  ]
  const arrRate = ['commission_rate']
  const arrUnkownType = {
    '/ibc.core.connection.v1.MsgConnectionOpenInit': 'IBC Connection Open Init',
    '/ibc.core.channel.v1.MsgChannelOpenInit': 'IBC Channel Open Init',
    '/ibc.core.connection.v1.MsgConnectionOpenAck': 'IBC Connection Open Ack',
    '/ibc.core.channel.v1.MsgTimeout': 'IBC Timeout',
    '/ibc.core.channel.v1.MsgChannelOpenAck': 'IBC Channel Open Ack',
    '/ibc.core.connection.v1.MsgConnectionOpenConfirm': 'IBC Connection Open Confirm',
    '/ibc.core.client.v1.MsgCreateClient': 'IBC Create Client',
    '/ibc.core.channel.v1.MsgChannelOpenConfirm': 'IBC Channel Open Confirm',
    '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': 'Vesting Account',
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

  // eslint-disable-next-line prefer-const
  let arrColumns = []
  for (const key in msg) {
    // eslint-disable-next-line prefer-const
    let arrColumnPerType = []
    const type = msg[key]
    let title = ''
    let details = ''

    if (type['@type'] === '/ibc.core.channel.v1.MsgRecvPacket') {
      if (logs && JSON.parse(logs)) {
        const logsObj = JSON.parse(logs)
        if (logsObj[key] && logsObj[key].Events) {
          for (const kEvent in logsObj[key].Events) {
            const event = logsObj[key].Events[kEvent]
            if (event.Type === 'recv_packet') {
              for (const kAttr in event.Attributes) {
                const attr = event.Attributes[kAttr]
                if (attr.Key === 'packet_data' && attr.Value) {
                  const valueObj = JSON.parse(attr.Value)
                  if (valueObj) {
                    for (const voKey in valueObj) {
                      type[voKey] = valueObj[voKey]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (type['@type'] === '/ibc.core.client.v1.MsgCreateClient') {
      type.timestamp = timestamp ? (formatTime(timestamp) + ' ago (' + convertTime(timestamp) + ')') : ''
      if (logs && JSON.parse(logs)) {
        const logsObj = JSON.parse(logs)
        for (const kEvent in logsObj[key].Events) {
          const event = logsObj[key].Events[kEvent]
          if (event.Type === 'create_client') {
            for (const kAttr in event.Attributes) {
              const attr = event.Attributes[kAttr]
              type[attr.Key] = attr.Value
            }
          }
        }
      }
    }

    if ([
      '/ibc.core.channel.v1.MsgChannelOpenTry',
      '/ibc.core.channel.v1.MsgAcknowledgement',
      '/cosmos.staking.v1beta1.MsgCreateValidator',
      '/cosmos.staking.v1beta1.MsgEditValidator',
      '/ibc.core.channel.v1.MsgChannelOpenConfirm'
    ].includes(type['@type']) || !arrTypeDefined[type['@type']] || arrUnkownType[type['@type']]) {
      // eslint-disable-next-line prefer-const
      let arrObjOpenTry = getElementFromObj(type)

      for (const voKey in arrObjOpenTry) {
        const keyForCheck = arrObjOpenTry[voKey].title.toLowerCase()
        if (arrKeyForAcc.includes(keyForCheck) || arrAmount.includes(keyForCheck) || arrText.includes(keyForCheck) || arrRate.includes(keyForCheck)) {
          type[arrObjOpenTry[voKey].title] = arrObjOpenTry[voKey].details
        } else {
          arrColumnPerType.push(arrObjOpenTry[voKey])
        }
      }
    }
    console.log('type = ', type)

    if (type.initial_deposit) {
      const amount = calculateValueFromArr(type.initial_deposit) / Math.pow(10, 6)
      const decimal = (amount.toFixed(6).toString()).split('.')
      title = 'Initial Deposit'
      // eslint-disable-next-line camelcase
      details = `${[formatNumber(parseInt(amount)), decimal[1]].join('.')} ${currentDenom}`
      arrColumnPerType.push({ title, details })
    }

    for (const kAttr in type) {
      if (arrKeyForAcc.includes(kAttr.toLowerCase())) {
        title = kAttr.replaceAll('_', function (str) {
          return ' '
        })
        title = title[0].toUpperCase() + title.substring(1)
        details = accAddColumn(type[kAttr], currentPrefix)
        arrColumnPerType.push({ title, details })
      } else if (arrAmount.includes(kAttr.toLowerCase())) {
        if (type[kAttr] === null) { continue }
        let amount = type[kAttr].amount ? type[kAttr].amount : type[kAttr]
        if (typeof amount === 'object') {
          amount = calculateValueFromArr(amount)
        } else {
          amount = parseFloat(amount) / (type[kAttr].denom && ['uatom', 'game'].includes(type[kAttr].denom) ? Math.pow(10, 6) : 1)
        }
        const decimal = (amount.toFixed(6).toString()).split('.')
        title = 'Amount'
        details = [formatNumber(parseInt(amount)), decimal[1]].join('.') + ` ${currentDenom}`
        arrColumnPerType.push({ title, details })
      } else if (arrRate.includes(kAttr.toLowerCase())) {
        if (type[kAttr] === null) { continue }
        title = kAttr.replaceAll('_', function (str) {
          return ' '
        })
        title = title[0].toUpperCase() + title.substring(1)
        details = ((parseFloat(type[kAttr]) * Math.pow(10, 2)).toFixed(2)) + '%'
        arrColumnPerType.push({ title, details })
      } else if (arrText.includes(kAttr.toLowerCase())) {
        title = kAttr.replaceAll('_', function (str) {
          return ' '
        }).replaceAll('source_', function (str) {
          return ''
        })
        title = title[0].toUpperCase() + title.substring(1)
        details = type[kAttr]
        arrColumnPerType.push({ title, details })
      } else if (['client_state'].includes(kAttr)) {
        for (const kClKey in type[kAttr]) {
          if (['chain_id', 'trusting_period', 'unbonding_period'].includes(kClKey)) {
            title = kClKey.replaceAll('_', function (str) {
              return ' '
            })
            title = title[0].toUpperCase() + title.substring(1)
            details = type[kAttr][kClKey]
            arrColumnPerType.push({ title, details })
          }
        }
      }
    }

    if (type.header && type.header.signed_header && type.header.signed_header.header && type['@type'].search('ibc') >= 0) {
      const arrObj = getElementFromObj(type.header.signed_header.header)
      arrColumnPerType = arrColumnPerType.concat(arrObj)
    }

    if (type.option) {
      title = 'Option'
      details = {
        VOTE_OPTION_NO: 'No',
        VOTE_OPTION_YES: 'Yes',
        VOTE_OPTION_NO_WITH_VETO: 'No With Veto',
        VOTE_OPTION_ABSTAIN: 'Abstain'
      }[type.option]
      arrColumnPerType.push({ title, details })
    }

    if (type['@type'] === '/cosmos.bank.v1beta1.MsgMultiSend') {
      if (type.inputs) {
        for (const iptKey in type.inputs) {
          const input = type.inputs[iptKey]
          const senderCoins = calculateValueFromArr(input.coins) / Math.pow(10, 6)
          const decimal1 = (parseFloat(senderCoins).toFixed(6).toString()).split('.')
          title = 'Senders'
          // eslint-disable-next-line camelcase
          details = `${accAddColumn(input.address, currentPrefix)}<span>(${[formatNumber(parseInt(senderCoins)), decimal1[1]].join('.')} ${currentDenom})</span>`
          arrColumnPerType.push({ title, details })
          const receiversCoins = calculateValueFromArr(type.outputs[iptKey].coins) / Math.pow(10, 6)
          const decimal2 = (parseFloat(receiversCoins).toFixed(6).toString()).split('.')
          title = 'Receivers'
          // eslint-disable-next-line camelcase
          details = `${accAddColumn(type.outputs[iptKey].address, currentPrefix)}<span>(${[formatNumber(parseInt(receiversCoins)), decimal2[1]].join('.')} ${currentDenom})</span>`
          arrColumnPerType.push({ title, details })
        }
      }
    }

    if (arrTxNeedLogs[type['@type']] && logs && JSON.parse(logs)) {
      const logObj = JSON.parse(logs)
      let amount = 0
      if (logObj[key]) {
        const events = logObj[key].Events
        let out = false
        if (events) {
          for (const eKey in events) {
            if (out) { break }

            if (events[eKey].Type === arrTxNeedLogs[type['@type']].type) {
              const attr = events[eKey].Attributes
              for (const aKey in attr) {
                if (attr[aKey].Key === 'amount') {
                  const splitAmount = attr[aKey].Value.split('uatom')
                  amount = splitAmount ? parseFloat(splitAmount[0]) : 0
                  out = true
                  break
                }
              }
            }
          }
        }
      }
      amount /= Math.pow(10, 6)
      const decimal = (amount.toFixed(6).toString()).split('.')
      title = arrTxNeedLogs[type['@type']].text
      // eslint-disable-next-line camelcase
      details = `${[formatNumber(parseInt(amount)), decimal[1]].join('.')} ${currentDenom}`
      arrColumnPerType.push({ title, details })
    }

    /** remove double key */
    // eslint-disable-next-line prefer-const
    let arrToRemove = []
    const convArrColumnPerType = arrColumnPerType
    for (const rvKey in convArrColumnPerType) {
      const titl = convArrColumnPerType[rvKey].title
      if (arrToRemove[titl]) {
        const pos = arrToRemove[titl]
        arrColumnPerType.splice(pos, 1)
      }
      arrToRemove[titl] = rvKey
    }
    arrColumns.push({
      type: getTypeTxFromStr(type['@type']),
      columns: arrColumnPerType
    })
  }
  return arrColumns
}

const accAddColumn = (address, prefix) => {
  const preValidator = new RegExp(`(${prefix}valoper)[a-zA-Z0-9]{39}`)
  const isValidator = !!preValidator.test(address)
  const href = (isValidator ? '/validators/' : '/account/') + address
  let html = '<a href="' + href + '">' + address + '</a>'
  if (isValidator) { html = '<a href="' + href + '">' + address + '<p class="validator-moniker display-none">' + address + '</p></a>' }

  return html
}

const getElementFromObj = (obj) => {
  // eslint-disable-next-line prefer-const
  let arrRs = []
  for (const hKey in obj) {
    const item = obj[hKey]
    if (typeof item !== 'string' && typeof item !== 'number' && hKey !== 'connection_hops') {
      const arrToMerge = getElementFromObj(item)
      arrRs = arrRs.concat(arrToMerge)
    } else {
      // eslint-disable-next-line use-isnan,eqeqeq
      if (!isNaN(parseInt(hKey))) { continue }
      const title = hKey[0].toUpperCase() + hKey.substring(1)
      const details = item
      arrRs.push({ title, details })
    }
  }

  return arrRs
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
    total += (arr[i].denom === 'uatom' || arr[i].denom === 'game') ? parseFloat(arr[i].amount) / Math.pow(10, 6) : parseFloat(arr[i].amount)
  }

  return Math.round(total * Math.pow(10, 6)) / Math.pow(10, 6)
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

  total /= Math.pow(10, 6)
  return Math.round(total * Math.pow(10, 6)) / Math.pow(10, 6)
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
  if (!bondedTokens) { return (0).toFixed(2) }
  let totalVotingPower = 0
  for (let i = 0; i < index + 1; i++) {
    totalVotingPower += validators[i].voting_power * Math.pow(10, 2)
  }
  return totalVotingPower ? ((type === 'active') ? (totalVotingPower / bondedTokens) : Math.abs(100 - totalVotingPower / bondedTokens)).toFixed(2) : 0.00
}

const totalSupplyTokens = (data) => {
  let totalSupplyTokens = 0

  if (data && data.total_supply_tokens && data.total_supply_tokens.supply) {
    const supplyTokens = data.total_supply_tokens.supply[data.total_supply_tokens.supply.length - 1]
    totalSupplyTokens = supplyTokens.amount
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
        total += (rewards[i].reward[j].denom === 'uatom' || rewards[i].reward[j].denom === 'game') ? parseFloat(rewards[i].reward[j].amount) / Math.pow(10, 6) : parseFloat(rewards[i].reward[j].amount)
      }
    }
  }

  return Math.round(total * Math.pow(10, 6)) / Math.pow(10, 6)
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

const convertValueTxs = (data) => {
  if (!data) { return [] }

  for (const i in data) {
    data[i].total_amount = getAmount(data[i].messages)
    const objMsg = JSON.parse(data[i].messages)
    const strType = objMsg ? objMsg[0]['@type'] : ''
    let str = getTypeTxFromStr(strType)
    if (objMsg.length > 1) {
      str += ' +' + (objMsg.length - 1)
    }
    data[i].type_tx_convert = str
  }

  return data
}

const clearInterval = (type = 'all') => {
  if (!type.includes('dasboard')) {
    if (localStorage.getItem('TxIntervalDashboard')) {
      window.clearInterval(localStorage.getItem('TxIntervalDashboard'))
      localStorage.removeItem('TxIntervalDashboard')
    }
    if (localStorage.getItem('blockIntervalDashboard')) {
      window.clearInterval(localStorage.getItem('blockIntervalDashboard'))
      localStorage.removeItem('blockIntervalDashboard')
    }
  }
  if (!type.includes('blocks-height')) {
    if (localStorage.getItem('blockDetailInterval')) {
      window.clearInterval(localStorage.getItem('blockDetailInterval'))
      localStorage.removeItem('blockDetailInterval')
    }
  }
  if (!type.includes('blocks') || type.includes('blocks-height')) {
    if (localStorage.getItem('blockInterval')) {
      window.clearInterval(localStorage.getItem('blockInterval'))
      localStorage.removeItem('blockInterval')
    }
  }
  if (!type.includes('transactions')) {
    if (localStorage.getItem('TxInterval')) {
      window.clearInterval(localStorage.getItem('TxInterval'))
      localStorage.removeItem('TxInterval')
    }
  }
}

export default {
  clearInterval, convertValueTxs, getColumnFromMsgTx, getTypeTxFromStr, convertValidators, getTotalUnbondings, calculateValueFromArr, getTypeProposal, getRewardByAddress, getTotalRewards, formatTime, formatNumber, cumulativeShare, totalSupplyTokens, isActiveValidator, formatHash, calcutatDelegations, convertTime, getAddrTx, getFeeTx, getAmount
}
