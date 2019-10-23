<template>
<div class="index">
    <v-head></v-head>
    <div class="main">
        <v-left></v-left>
        <v-right></v-right>
    </div>
</div>
</template>
<script>
import API from '../../common/js/API'
import vHead from '../views/head'
import vLeft from '../views/left'
import vRight from '../views/right'

export default { 
    components: {
        vHead,
        vLeft,
        vRight
    }
}
</script>
<style lang='stylus'  scoped>

.index{
    display: flex;
    flex-direction column
    width: 100vw;
    height: 100vh;
}
.main{
    flex: 1;
    display: flex;
    background-color: $up;
}

</style>