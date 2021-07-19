<template>
  <li>
    <div class="title title-unset">
      {{ text }}
    </div>
    <div v-if="address && isAccount" class="detail">
      <a :href="'/account/'+address">
        {{ address }}
        <p v-if="validators[address]">({{ validators[address] }})</p>
      </a>
    </div>
    <div v-else-if="address" class="detail">
      <a :href="'/validators/'+address">
        {{ address }}
        <p v-if="validators[address]">({{ validators[address] }})</p>
      </a>
    </div>
  </li>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['address', 'validators', 'text'],
  computed: {
    isAccount () {
      console.log('this.address = ', this.address, /^(cosmosvaloper)[a-zA-Z0-9]{39}$/.test(this.address))
      if (/^(cosmosvaloper)[a-zA-Z0-9]{39}$/.test(this.address)) {
        return false
      }
      return true
    }
  }
}
</script>
