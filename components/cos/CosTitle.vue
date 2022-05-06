<template>
    <div class="cos-title">
        <h3 class="title-cos">
            <span>{{ name }}</span>
        </h3>
    </div>
</template>
<script>

export default {
    props: {
        name: {
            type: String,
        }
    }
}
</script>
