<template>
    <div class="page-content header-smaller">
        <div class="main-body-content">
        <div class="cos-notice custom-page-title">
            <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12">
                <h2 class="page-title">
                Wasm Contracts
                </h2>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12">
                <header-data />
            </div>
            </div>
            <div class="main-md-content delegated-missed md-full">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <section class="Section_container PopularContracts_container">
                            <div class="SectionHeader_sectionHeader">
                                <h2 class="SectionHeader_sectionHeading">Popular Contracts</h2>
                            </div>
                            <div class="SectionContent_sectionContent">
                                <section class="PopularContracts_cardContainer">
                                    <PopularItem 
                                        name="NETA Token" 
                                        contract_address="juno168c...8s4j5awr" 
                                        contract_version="CW20 Contract" 
                                        execute="54399" 
                                        instantiated_at="2022-01-27 02:37:41" 
                                    />
                                    <div class="Card_container">
                                        <div class="Card_cardHeader Card_border">
                                            <div class="PopularContracts_cardHeader">
                                                <img class="PopularContracts_contractIcon" src="icon.svg" alt="img" />
                                                <a class="PopularContracts_link" href="#">NETA Token</a>
                                            </div>
                                        </div>
                                        <div class="Card_cardContent">
                                            <div class="CardItem_container">
                                                <div class="CardItem_label">Contract</div>
                                                <div class="CardItem_value">CW20 Contract</div>
                                            </div>
                                            <div class="CardItem_container">
                                                <div class="CardItem_label">Contract Address</div>
                                                <div class="CardItem_value">
                                                <a class="PopularContracts_link" href="#">juno168c...8s4j5awr</a>
                                                </div>
                                            </div>
                                            <div class="CardItem_container">
                                                <div class="CardItem_label">Executes</div>
                                                <div class="CardItem_value">54399</div>
                                            </div>
                                            <div class="CardItem_container">
                                                <div class="CardItem_label">Instantiated At</div>
                                                <div class="CardItem_value">2022-01-27 02:37:41</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import PopularItem from '~/components/wasm/PopularContractItem.vue'

export default {
    components: {
        PopularItem
    },
    data () {
        return {
            popular_contracs: []
        }
    }
}
</script>

<style scoped>
</style>