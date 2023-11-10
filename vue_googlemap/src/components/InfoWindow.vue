<template>
    <div class="flex">
        <img :src="data.img" alt="">
        <center>
            <h1>{{ data.name }}</h1>
            <p>{{ data.des }}</p>
        </center>
    </div>
</template>

<script>

export default {
    props: ['data'],
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
    justify-content: space-around;
}

img {
    object-fit: cover;
    height: 50px;
    width: 50px;
}

</style>