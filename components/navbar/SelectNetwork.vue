<template>
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
</template>
<script>
export default { 
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
}
</script>
