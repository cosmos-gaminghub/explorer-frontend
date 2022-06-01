<template>
    <li class="inforow">
        <div class="inforow-label">
            {{ label }}
        </div>
        <div class="infor-value" v-if="value">
            <vue-json-pretty :data="value" @click="handleClick"> </vue-json-pretty>
        </div>
    </li>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
export default {
    components: {
        VueJsonPretty
    },
    props: {
        label: {
            type: String
        },
        value: {
            type: [Object, Array]
        },
    },
    methods: {
        handleClick(value) {
            console.log(value)
        }
    }
}
</script>
