<template>
  <div class="">
    <div class="showBox">
        <div class="items" 
            v-for="(item, index) in data" 
            :key="index" 
            :style="{width: item.width+'px', height: item.height + 'px', left: item.x+'px', top: item.y+'px'}">
            <div class="inner" :style="{background: item.background}"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
        data: []
    }
  },
  created(){
      this.data = JSON.parse(localStorage.getItem('data'))
  }

}
</script>

<style lang='scss' scoped>
.showBox{
    height: calc(100vh);
    margin: 0 auto;
    position: relative;
    background: #eee;
    .items{
        position: absolute;
        .inner{
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
        }
    }
}
</style>
