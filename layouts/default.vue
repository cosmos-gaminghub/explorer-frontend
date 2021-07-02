<template>
  <section>
    <div class="mobi-overlay"><span class="close"></span></div>
    <navbar />

    <div class="page-container main-page">
      <div class="page-content-wrapper">
        <div class="container">
          <search />
          <nuxt />
        </div>
      <!-- .page-content-->
      </div>
    <!-- .member-->
    </div>

    <page-footer />
  </section>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import PageFooter from '@/components/pageFooter/Footer.vue'
import Search from '@/components/header/Search.vue'

export default {
  components: {
    Navbar, PageFooter, Search
  },
  mounted () { // or other hook function
    const externalScript = document.createElement('script')
    externalScript.setAttribute('src', '/assets/js/custom.js')
    document.head.appendChild(externalScript)

    document.getElementsByTagName('body')[0].classList.add(`page-${this.$nuxt.$route.name}`)
  },
  header: {
    bodyAttrs: {
      class: 'page-header-fixed page-quick-sidebar-over-content'
    }
  }
}
</script>
