<template>
    <div class="Card_container">
        <div class="Card_cardHeader Card_border">
            <div class="PopularContracts_cardHeader">
                <img class="PopularContracts_contractIcon" src="icon.svg" alt="img" />
                <a class="PopularContracts_link" href="#">{{ name }}</a>
            </div>
        </div>
        <div class="Card_cardContent">
            <div class="CardItem_container">
                <div class="CardItem_label">Contract</div>
                <div class="CardItem_value">{{ contract_version }}</div>
            </div>
            <div class="CardItem_container">
                <div class="CardItem_label">Contract Address</div>
                <div class="CardItem_value">
                <a class="PopularContracts_link" href="#">{{ contract_address }}</a>
                </div>
            </div>
            <div class="CardItem_container">
                <div class="CardItem_label">Executes</div>
                <div class="CardItem_value">{{ execute }}</div>
            </div>
            <div class="CardItem_container">
                <div class="CardItem_label">Instantiated At</div>
                <div class="CardItem_value">{{ instantiated_at }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        contract_address: {
            type: String,
            default: ''
        },
        instantiated_at: {
            type: String,
            default: ''
        },
        execute: {
            type: String,
            default: ''
        },
        contract_version: {
            type: String,
            default: ''
        }
    }
}
</script>
