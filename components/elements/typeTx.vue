<template>
  <div class="main-md-content transaction-detail-message">
    <div v-if="tx && tx.columns" class="cos-table-item">
      <div v-for="(typeTx, index) in tx.columns" :key="index" class="cos-item-content">
        <div class="cos-title">
          <h3 class="title-cos">
            <span>MESSAGES: </span><span>{{ typeTx.type }}</span>
          </h3>
        </div>
        <ul v-if="typeTx.columns" class="list-owl-block">
          <li>
            <ul class="list-infor-detail">
              <li v-for="(column, keyColumn) in typeTx.columns" :key="'key_' + keyColumn">
                <div class="title">
                  {{ column.title }}
                </div>
                <div class="detail" v-html="column.details"></div>
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

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['tx'],
  computed: {
    ...mapState('validators', [])
  },
  data () {
    return {
      validators: {}
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
