<template>
  <ul v-if="obj" class="list-infor-detail">
    <other-text :text="'Amount'" :value="obj['amount']" />
    <other-text :text="'Denom'" :value="obj['denom']" />
    <acc-address :address="obj['receiver']" :text="'Receiver'" />
    <acc-address :address="obj['sender']" :text="'Sender'" />
  </ul>
</template>
<script>
import OtherText from '~/components/elements/tx/otherText'
import AccAddress from '~/components/elements/tx/accAddress'
export default {
  components: { AccAddress, OtherText },
  // eslint-disable-next-line vue/require-prop-types
  props: ['logsObj'],
  data () {
    return {
      objConvert: {}
    }
  },
  computed: {
    obj () {
      if (this.logsObj && this.logsObj.Events) {
        for (const kEvent in this.logsObj.Events) {
          const event = this.logsObj.Events[kEvent]
          if (event.Type === 'recv_packet') {
            for (const kAttr in event.Attributes) {
              const attr = event.Attributes[kAttr]
              if (attr.Key === 'packet_data' && attr.Value) {
                const valueObj = JSON.parse(attr.Value)
                if (valueObj) {
                  return valueObj
                }
              }
            }
          }
        }
      }
      return []
    }
  }
}
</script>
