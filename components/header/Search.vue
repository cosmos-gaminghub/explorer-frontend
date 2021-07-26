<template>
  <div class="main-search">
    <div class="header-fix">
      <div class="page-header">
        <div class="page-header-inner">
          <div class="header-search">
            <div class="input-search">
              <input
                v-model="search"
                class="form-control"
                type="text"
                placeholder="Search by Address, Block Height, TxHash…"
                @keyup="checkBeforeSearch($event, true)"
                @change="checkBeforeSearch($event)"
                @keydown="checkBeforeSearch($event)"
              >
              <i class="fa fa-search" aria-hidden="true" />
              <div v-show="errorSearch" class="error-search-invalid">
                Search Invalid
              </div>
              <button v-show="textSearchButton" class="success-search-invalid" @click="goToAddress()" v-text="textSearchButton" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      textSearchButton: '',
      errorSearch: false,
      linkToSearch: ''
    }
  },
  methods: {
    checkBeforeSearch (e, checkEnter = false) {
      if (!this.search) {
        this.textSearchButton = ''
        this.errorSearch = false
      } else {
        const value = this.search
        this.textSearchButton = ''
        this.errorSearch = true
        /** check regex: account, validator, block, tx */
        if (/^(cosmosvaloper)[a-zA-Z0-9]{39}$/.test(value)) {
          this.textSearchButton = 'Search validator'
          this.linkToSearch = '/validators/' + value
          this.errorSearch = false
        } else if (/^(cosmos)[a-zA-Z0-9]{39}$/.test(value)) {
          this.textSearchButton = 'Search Account'
          this.linkToSearch = '/account/' + value
          this.errorSearch = false
        } else if (/^[0-9]{2,}$/.test(value)) {
          this.textSearchButton = 'Search block'
          this.linkToSearch = '/blocks/' + value
          this.errorSearch = false
        } else if (/^[A-Z0-9]{64}$/.test(value)) {
          this.linkToSearch = '/transactions/' + value
          this.textSearchButton = 'Search tx'
          this.errorSearch = false
        }
        if (checkEnter && e.keyCode === 13 && !this.errorSearch) { this.goToAddress() }
      }
    },
    goToAddress () {
      this.search = ''
      this.textSearchButton = ''
      this.errorSearch = false
      if (this.linkToSearch.includes('account')) {
        window.location.href = this.linkToSearch
      } else {
        this.$router.replace(this.linkToSearch)
      }
    }
  }
}
</script>
