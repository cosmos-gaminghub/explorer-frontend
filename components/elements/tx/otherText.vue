<template>
  <li>
    <div class="title">
      {{ text }}
    </div>
    <div class="detail">
      {{ value }}
    </div>
  </li>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['text', 'value', 'attribute'],
  computed: {
    valueFormat () {
      if (this.attribute) {
        if (this.value && this.value.Events) {
          let i = 0
          for (; i < this.value.length; i++) {
            if (this.value[i].key === 'recv_packet') {
              let attr
              for (attr in this.value[i].attributes) {
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

        return []
      }
    }
  }
}
</script>
