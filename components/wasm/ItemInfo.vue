<template>
    <li class="inforow">
        <div class="inforow-label">
            {{ label }}
        </div>
        <div class="infor-value" v-if="type == 'string'">
            {{ value }}
        </div>
        <div class="infor-value" v-if="type == 'link'">
            <a class="contact-link" href="">
                {{ value }}
            </a>
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
    }
}
</script>
