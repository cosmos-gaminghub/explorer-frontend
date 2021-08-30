<template>
  <div class="sidebar-left">
    <div class="left_col">
      <div class="left_col scroll-view">
        <div class="navbar nav_title" style="border: 0;">
          <nuxt-link to="/dashboard" class="site_title no-tablet">
            <img src="/assets/images/logo/logo.png" alt="logo">
          </nuxt-link>
          <nuxt-link to="/dashboard" class="site_title tablet">
            <img src="/assets/images/logo/logo_m.png" alt="logo">
          </nuxt-link>
        </div>
        <div class="clearfix" />
        <div class="header-option-link select-option">
          <div class="dropdown">
            <button v-if="current_network && current_network.id" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
              <img :src="current_network.logo" alt="index" width="15px">
              <span>{{ current_network.name }}</span>
              <span class="caret" />
            </button>
            <ul class="dropdown-menu">
              <li v-for="(network, index) in lst_network" :key="index">
                <a :href="network.link"> <img :src="network.logo" alt="index" width="18px"><span>{{ network.name }}</span></a>
              </li>
            </ul>
          </div>
        </div>
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
          <div class="icon-menu">
            <img src="/assets/images/icon/icon_menu.png" alt="menu">
          </div>
          <div class="menu_section">
            <ul class="side-menu">
              <li :class="isActiveMenu('dashboard')">
                <nuxt-link to="/dashboard" class="item-menu">
                  <div class="icon">
                    <img class="icon-black" src="/assets/images/icon/icon1.png" alt="demo">
                    <img class="tablet-icon" src="/assets/images/icon/icon1-mb.png" alt="demo-tablet">
                  </div>
                  <span>Dashboard</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('validators') || isActiveMenu('account')">
                <nuxt-link to="/validators" class="item-menu">
                  <div class="icon">
                    <img class="icon-black" src="/assets/images/icon/icon2.png" alt="demo">
                    <img class="tablet-icon" src="/assets/images/icon/icon2-mb.png" alt="demo">
                  </div>
                  <span>Validators</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('blocks')">
                <nuxt-link to="/blocks" class="item-menu">
                  <div class="icon">
                    <img class="icon-black" src="/assets/images/icon/icon.png" alt="demo">
                    <img class="tablet-icon" src="/assets/images/icon/icon-mb.png" alt="demo">
                  </div>
                  <span>Blocks</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('transactions')">
                <nuxt-link to="/transactions" class="item-menu">
                  <div class="icon">
                    <img class="icon-black" src="/assets/images/icon/icon3.png" alt="demo">
                    <img class="tablet-icon" src="/assets/images/icon/icon3-mb.png" alt="demo">
                  </div>
                  <span>Transactions</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('proposals')">
                <nuxt-link to="/proposals" class="item-menu">
                  <div class="icon">
                    <img class="icon-black" src="/assets/images/icon/printer.png" alt="demo">
                    <img class="tablet-icon" src="/assets/images/icon/printer-mb.png" alt="demo">
                  </div>
                  <span>Proposals</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    lst_network () {
      return this.$store.state.network.lst_networks
    },
    current_network () {
      return this.$store.state.network.current_network
    }
  },
  mounted () {
    this.$store.commit('network/SET_CURRENT_NETWORK')
  },
  methods: {
    isActiveMenu (route) {
      const currentRoute = this.$nuxt.$route.name

      return (currentRoute && currentRoute.includes(route)) ? 'active' : ''
    }
  }
}
</script>
