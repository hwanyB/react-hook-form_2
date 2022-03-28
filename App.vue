<template>
    <router-view />
</template>
<script>
    export default {
         created () {
            console.log('Router:', this.$router)
            console.log('Route:', this.$route)
         }
    }
</script>