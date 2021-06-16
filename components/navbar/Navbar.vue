<template>
  <div class="sidebar-left">
    <div class="left_col">
      <div class="left_col scroll-view">
        <div class="navbar nav_title" style="border: 0;">
          <a class="site_title no-tablet" href="/dist/html/admin/"><img src="/assets/images/logo/logo.png" alt="logo"></a><a class="site_title tablet" href="/dist/html/admin/"><img src="/assets/images/logo/logo_m.png" alt="logo"></a>
        </div>
        <div class="clearfix" />
        <div class="header-option-link select-option">
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
              <img src="/assets/images/icon/atom.png" alt="index" width="15px"><span>Cosmos</span><span class="caret" />
            </button>
            <ul class="dropdown-menu">
              <li><a href="#"> <img src="/assets/images/icon/atom.png" alt="cosmoshub-2" width="18px"><span>cosmoshub-2</span></a></li>
              <li><a href="#"> <img src="/assets/images/icon/atom.png" alt="irishub" width="18px"><span>irishub</span></a></li>
              <li><a href="#"> <img src="/assets/images/icon/atom.png" alt="kava-testnet-3000" width="18px"><span>kava-testnet-3000</span></a></li>
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
                <nuxt-link to="/dashboard">
                  <div class="icon"><img src="/assets/images/icon/icon1.png" alt="demo"></div><span>Dashboard</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('validators')">
                <nuxt-link to="/validators">
                  <div class="icon"><img src="/assets/images/icon/icon2.png" alt="demo"></div><span>Validators</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('blocks')">
                <nuxt-link to="/blocks">
                  <div class="icon"><img src="/assets/images/icon/icon.png" alt="demo"></div><span>Blocks</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('transactions')">
                <nuxt-link to="/transactions">
                  <div class="icon"><img src="/assets/images/icon/icon3.png" alt="demo"></div><span>Transactions</span>
                </nuxt-link>
              </li>
              <li :class="isActiveMenu('proposals')">
                <nuxt-link to="/proposals">
                  <div class="icon"><img src="/assets/images/icon/printer.png" alt="demo"></div><span>Proposals</span>
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
  methods: {
    isActiveMenu (route) {
      const currentRoute = this.$nuxt.$route.name

      return currentRoute.includes(route) ? 'active' : ''
    }
  }
}
</script>
