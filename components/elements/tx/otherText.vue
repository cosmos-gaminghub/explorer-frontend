<template>
  <li>
    <div class="title">
      {{ text }}
    </div>
    <div class="detail">
      <a v-if="text.toLowerCase() === 'website'" :href="value" target="_blank">
        {{ value }}
      </a>
      <span v-else>{{ value }}</span>
    </div>
  </li>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['text', 'value']
}
</script>
