<template>
    <li class="inforow">
        <div class="inforow-label">
            {{ label }}
        </div>
        <div class="infor-value" v-if="type == 'string'">
            {{ value }}
        </div>
        <div class="infor-value" v-if="type == 'link'">
            <nuxt-link class="contact-link" :to="route">
                {{ value }}
            </nuxt-link>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        label: {
            type: String
        },
        value: {
            type: [ String, Number ]
        },
        type: {
            type: String,
            default: "string"
        },
        route: {
            type: Object,
            default: function () { 
                return {}
            }
        }
    }
}
</script>
