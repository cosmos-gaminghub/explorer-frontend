<template>
  <li>
    <div class="title">
      {{ text }}
    </div>
    <div v-if="address" class="detail">
      <a :href="'/account/'+address">
        {{ address }}
        <p v-if="validators[address]">({{ validators[address] }})</p>
      </a>
    </div>
  </li>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['address', 'validators', 'text']
}
</script>
