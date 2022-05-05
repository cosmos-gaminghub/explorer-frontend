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
        <SelectNetwork />
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
          <div class="icon-menu">
            <img src="/assets/images/icon/icon_menu.png" alt="menu">
          </div>
          <div class="menu_section">
            <ul class="side-menu">
              <li :class="isActiveMenu(menu.key)" v-for="menu in menus" :key="menu.key">
                <nuxt-link :to="menu.href" class="item-menu">
                  <div class="icon">
                    <img class="icon-black" :src="menu.icon_black" alt="demo">
                    <img class="tablet-icon" :src="menu.tablet_icon" alt="demo-tablet">
                  </div>
                  <span>{{ menu.name }}</span>
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
import menus from '@/menu'
import SelectNetwork from '@/components/navbar/SelectNetwork.vue'
export default {
  data () {
    return {
      menus: menus
    }
  },
  components: {
    SelectNetwork
  },
  methods: {
    isActiveMenu (route) {
      const currentRoute = this.$nuxt.$route.name

      return (currentRoute && currentRoute.includes(route)) ? 'active' : ''
    }
  }
}
</script>
