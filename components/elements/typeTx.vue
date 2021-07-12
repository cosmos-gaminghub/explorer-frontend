<template>
  <div class="main-md-content transaction-detail-message">
    <div v-if="tx && tx.messagesObj" class="cos-table-item">
      <div v-for="(typeTx, index) in tx.messagesObj" :key="index" class="cos-item-content">
        <div class="cos-title">
          <h3 class="title-cos">
            <span>MESSAGES: </span><span>{{ typeTx['@type'] | getTypeTx }}</span>
          </h3>
        </div>
        <ul v-if="typeTx['@type'] === '/cosmos.bank.v1beta1.MsgMultiSend' && typeTx.inputs" class="list-owl-block">
          <li v-for="(input, indexInput) in typeTx.inputs" :key="indexInput">
            <ul class="list-infor-detail">
              <acc-address :address="input.address" :text="'Senders'" :amount="input.coins" />
              <acc-address :address="typeTx.outputs[indexInput].address" :text="'Receivers'" :amount="typeTx.outputs[indexInput].coins" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <acc-address :address="typeTx.delegator_address" :text="'Delegator Address'" :amount="0" />
              <validator-address :address="typeTx.validator_address" :validators="validators" :text="'Validator Address'" />
              <claim-reward :logs-obj="tx.logsObj" :index="index" :type="'withdraw_rewards'" :text="'Amount'" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <validator-address :address="typeTx.validator_address" :validators="validators" :text="'Validator Address'" />
              <claim-reward :logs-obj="tx.logsObj" :index="index" :type="'withdraw_commission'" :text="'Amount'" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/cosmos.gov.v1beta1.MsgVote'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <li>
                <div class="title">
                  Proposal Id
                </div>
                <div v-if="typeTx.proposal_id" class="detail">
                  {{ typeTx.proposal_id }}
                </div>
              </li>
              <acc-address :address="typeTx.voter" :text="'Voter'" :amount="0" />
              <li>
                <div class="title">
                  Option
                </div>
                <div class="detail">
                  {{ typeTx.option | getOptions }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/cosmos.staking.v1beta1.MsgBeginRedelegate'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <validator-address :address="typeTx.delegator_address" :validators="validators" :text="'Delegator Address'" />
              <validator-address :address="typeTx.validator_src_address" :validators="validators" :text="'Source Validator Address'" />
              <validator-address :address="typeTx.validator_dst_address" :validators="validators" :text="'Destination Validator Address'" />
              <amount :amount="typeTx.amount" :text="'Amount'" />
              <claim-reward :logs-obj="tx.logsObj" :index="index" :type="'transfer'" :text="'Auto Claim Reward'" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/cosmos.staking.v1beta1.MsgDelegate'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <acc-address :address="typeTx.delegator_address" :text="'Delegator Address'" :amount="0" />
              <validator-address :address="typeTx.validator_address" :validators="validators" :text="'Validator Address'" />
              <amount :amount="typeTx.amount" :text="'Amount'" />
              <claim-reward :logs-obj="tx.logsObj" :index="index" :type="'withdraw_delegator_reward'" :text="'Auto Claim Reward'" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/cosmos.staking.v1beta1.MsgUndelegate'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <acc-address :address="typeTx.delegator_address" :text="'Delegator Address'" :amount="0" />
              <validator-address :address="typeTx.validator_address" :validators="validators" :text="'Validator Address'" />
              <amount :amount="typeTx.amount" :text="'Amount'" />
              <claim-reward :logs-obj="tx.logsObj" :index="index" :type="'transfer'" :text="'Auto Claim Reward'" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/ibc.applications.transfer.v1.MsgTransfer'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <acc-address :address="typeTx.sender" :text="'Sender'" :amount="0" />
              <acc-address :address="typeTx.receiver" :text="'Receiver'" :amount="0" />
              <other-text :text="'Channel'" :value="typeTx.source_channel" />
              <other-text :text="'Port'" :value="typeTx.source_port" />
              <amount :amount="typeTx.token" :text="'Amount'" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/ibc.core.client.v1.MsgUpdateClient'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <acc-address :address="typeTx.signer" :text="'Signer'" :amount="0" />
              <other-text :text="'Client ID'" :value="typeTx.client_id" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'block'" :value="typeTx.header.signed_header.header.version.block" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'app'" :value="typeTx.header.signed_header.header.version.app"/>
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'chain_id'" :value="typeTx.header.signed_header.header.chain_id" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'height'" :value="typeTx.header.signed_header.header.height" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'time'" :value="typeTx.header.signed_header.header.time" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'hash'" :value="typeTx.header.signed_header.header.last_block_id.part_set_header.hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'total'" :value="typeTx.header.signed_header.header.last_block_id.part_set_header.total" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'last_commit_hash'" :value="typeTx.header.signed_header.header.last_commit_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'data_hash'" :value="typeTx.header.signed_header.header.data_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'validators_hash'" :value="typeTx.header.signed_header.header.validators_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'next_validators_hash'" :value="typeTx.header.signed_header.header.next_validators_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'consensus_hash'" :value="typeTx.header.signed_header.header.consensus_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'app_hash'" :value="typeTx.header.signed_header.header.app_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'last_results_hash'" :value="typeTx.header.signed_header.header.last_results_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'evidence_hash'" :value="typeTx.header.signed_header.header.evidence_hash" />
              <other-text v-if="typeTx.header && typeTx.header.signed_header && typeTx.header.signed_header.header" :text="'proposer_address'" :value="typeTx.header.signed_header.header.proposer_address" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/ibc.core.channel.v1.MsgAcknowledgement'" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <other-text :text="'@type'" :value="typeTx['@type']" />
              <other-text v-if="typeTx.packet" :text="'sequence'" :value="typeTx.packet.sequence" />
              <other-text v-if="typeTx.packet" :text="'source_port'" :value="typeTx.packet.source_port" />
              <other-text v-if="typeTx.packet" :text="'source_channel'" :value="typeTx.packet.source_channel" />
              <other-text v-if="typeTx.packet" :text="'destination_port'" :value="typeTx.packet.destination_port" />
              <other-text v-if="typeTx.packet" :text="'destination_channel'" :value="typeTx.packet.destination_channel" />
              <other-text v-if="typeTx.packet" :text="'data'" :value="typeTx.packet.data" />
              <other-text v-if="typeTx.proof_height" :text="'revision_number'" :value="typeTx.proof_height.revision_number" />
              <other-text v-if="typeTx.proof_height" :text="'revision_height'" :value="typeTx.proof_height.revision_height" />
              <other-text v-if="typeTx.packet" :text="'timeout_timestamp'" :value="typeTx.packet.timeout_timestamp" />
              <other-text :text="'acknowledgement'" :value="typeTx.acknowledgement" />
              <other-text :text="'proof_acked'" :value="typeTx.proof_acked" />
              <other-text :text="'signer'" :value="typeTx.signer" />
            </ul>
          </li>
        </ul>
        <ul v-else-if="typeTx['@type'] === '/ibc.core.channel.v1.MsgRecvPacket'" class="list-owl-block">
          <li>
            <denom :logs-obj="tx.logsObj[index]" />
          </li>
        </ul>
        <ul v-else class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <acc-address :address="typeTx.from_address" :text="'From Address'" :amount="0" />
              <acc-address :address="typeTx.to_address" :text="'To Address'" :amount="0" />
              <li>
                <div class="title">
                  Amount
                </div>
                <div class="detail">
                  {{ tx.messages | getAmount(true) }}.{{ tx.messages | getAmount(false) }} ATOM
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import helper from '~/utils/helper'
import ClaimReward from '~/components/elements/tx/claimReward'
import ValidatorAddress from '~/components/elements/tx/validatorAddress'
import AccAddress from '~/components/elements/tx/accAddress'
import Amount from '~/components/elements/tx/amount'
import OtherText from '~/components/elements/tx/otherText'
import Denom from '~/components/elements/tx/denom'

export default {
  components: { Denom, OtherText, Amount, AccAddress, ValidatorAddress, ClaimReward },
  filters: {
    getTypeTx (value) {
      return helper.getTypeTx(value, true)
    },
    getAmount (value, isInt = false) {
      const total = helper.getAmount(value) / Math.pow(10, 6)
      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    },
    getOptions (value) {
      return {
        VOTE_OPTION_NO: 'No',
        VOTE_OPTION_YES: 'Yes',
        VOTE_OPTION_NO_WITH_VETO: 'No With Veto',
        VOTE_OPTION_ABSTAIN: 'Abstain'
      }[value]
    },
    getDenom (value) {
      if (!value) { return '' }
      let i = 0
      for (; i < value.length; i++) {
        if (value[i].key === 'recv_packet') {
          let attr
          for (attr in value[i].attributes) {
            if (attr.key === 'packet_data' && attr.value) {
              const packerData = JSON.parse(attr.value)
              if (packerData) {
                return packerData.denom
              }
            }
          }
        }
      }
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['tx'],
  computed: {
    ...mapState('validators', [])
  },
  data () {
    return {
      validators: {},
      denom: {}
    }
  },
  mounted () {
    this.getValidators().then((validators) => {
      this.validators = helper.convertValidators(validators)
    })
  },
  methods: {
    ...mapActions({
      getValidators: 'validators/GET_DATA'
    })
  }
}
</script>
