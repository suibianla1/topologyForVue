<template>
  <div class="test">
    <div class="left" @click.self="cancelClick"> 
      <div class="component" draggable="true" @dragstart="dragStart($event)" @dragend="dragStop($event)">1</div>
      <div class="component" draggable="true" @dragstart="dragStart($event)" @dragend="dragStop($event)">2</div>
    </div>
    <div class="right" ref="box" @click.self="cancelClick">
      <div class="componentItem" 
        v-for="(item, index) in itemList" :key="index" 
        :style="{left: item.x + 'px', top: item.y + 'px', zIndex: item.zIndex, background: item.background, width: item.width + 'px', height: item.height + 'px'}" 
        @mousedown="itemMoveStart($event, index)"
        @keydown.ctrl="mutipleGet($event)">
        <div class="borderLayer" v-if="itemIndex === index">
          <div class="resize resize-left-top" @mousedown.stop="resize($event, 'left-top')"></div>
          <div class="resize resize-left-center" @mousedown.stop="resize($event, 'left')"></div>
          <div class="resize resize-left-bottom" @mousedown.stop="resize($event, 'left-bottom')"></div>
          <div class="resize resize-right-top" @mousedown.stop="resize($event, 'right-top')"></div>
          <div class="resize resize-right-center" @mousedown.stop="resize($event, 'right')"></div>
          <div class="resize resize-right-bottom" @mousedown.stop="resize($event, 'right-bottom')"></div>
          <div class="resize resize-center-top" @mousedown.stop="resize($event, 'top')"></div>
          <div class="resize resize-center-bottom" @mousedown.stop="resize($event, 'bottom')"></div>
        </div>
        <div class="bgLayer" @click.stop="getItem(index)"></div>
      </div>

      <!-- <VueDragResize 
        v-for="(item, index) in itemList" 
        :key="index"  
        :isActive="false" 
        :x="item.x" 
        :y="item.y" 
        :w="item.width" 
        :h="item.height" 
        :parentLimitation="true" 
        @resizing="resize"
        @resizestop="getIndex(index)" 
        @dragging="resize"
        @dragstop="getIndex(index)" 
        @clicked='clickItem($event, item.id)'>
        <div class="bgLayer" :style="{background: item.background}"></div>
      </VueDragResize> -->
    </div>
    <div class="bottom">
      <button @click="getData">实时数据</button>
      <button @click="preview">预览</button>
      <button @click="delComponent">删除组件</button>
    </div>
  </div> 
</template>

<script>
import VueDragResize from 'vue-drag-resize';
export default {

  components: {
    VueDragResize
  },

  data () {
    return {
      itemIndex: -1,
      zIndex: 0,
      boxData: {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      },
      itemList: [],
      tempObj: {},
      delList: []
    }
  },

  created(){
    // this.itemList = JSON.parse(localStorage.getItem('data'))
  },

  mounted(){
    this.boxData = {
      width: this.$refs.box.offsetWidth,
      height: this.$refs.box.offsetHeight,
      x: this.$refs.box.offsetLeft,
      y: this.$refs.box.offsetTop
    }
  },

  methods: {
    mutipleGet(e){
      console.log(e.keycode)
    },
    getData(){
      alert(JSON.stringify(this.itemList))
    },

    dragStart(event){
      this.delList = []
      document.onmousemove = (e)=> {
        // this.dragMove(e)
      }
    },

    dragStop(event){
      document.onmousemove = null
      let x = event.clientX - this.boxData.x
      let y = event.clientY
      if(x < 0) {
        return
      }
      console.log(this.itemList)
      this.itemList.push({
        id: new Date().getTime(),
        name: 'item',
        zIndex: this.zIndex + 1,
        x,
        y,
        background: '#' + Math.floor((Math.random()*1000000)),
        width: 100,
        height: 100
      })
      this.zIndex ++
    },

    itemMoveStart(e, index){
      //获取目标元素
      let odiv = e.target.parentElement        
            
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop

      document.onmousemove = (e)=>{       //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;    
        let top = e.clientY - disY;
        
        //绑定元素位置到positionX和positionY上面
        if(left < 0 ) {
          left = 0
        }
        if(left > this.boxData.width - odiv.offsetWidth) {
          left = this.boxData.width - odiv.offsetWidth
        }
        if(top < 0) {
          top = 0
        } 
        if(top > this.boxData.height - odiv.offsetHeight) {
          top = this.boxData.height - odiv.offsetHeight
        }

        odiv.style.left = left + 'px'
        odiv.style.top = top + 'px'

        this.itemList[index].x = left
        this.itemList[index].y = top
      }

      document.onmouseup = (e) => {
        document.onmousemove = document.onmouseup = null
      } 
    },

    resize(e, derection){
      let startX = e.clientX
      let startY = e.clientY

      let pWidth = this.itemList[this.itemIndex].width
      let pHeight =  this.itemList[this.itemIndex].height

      let pPositionX = this.itemList[this.itemIndex].x
      let pPositionY = this.itemList[this.itemIndex].y

      document.onmousemove = event => {
        let disX = 0
        let disY = 0

        switch (derection){
          case 'left':
            // 左点，如果相对鼠标点击的位置向左拉，拉动的距离 = 鼠标的位置 - 鼠标点击的位置的绝对值，如果是向右拉，拉动的距离 = 鼠标的位置 - 鼠标点击的位置
            disX = event.clientX > startX ? (startX - event.clientX) : Math.abs(event.clientX - startX)
            this.itemList[this.itemIndex].width = pWidth + disX
            // 同时拉动了多少，宽度变化多少，元素的x轴位置也要相对变化多少
            this.itemList[this.itemIndex].x = pPositionX - disX
            break
          case 'right':
            disX = event.clientX - startX
            this.itemList[this.itemIndex].width = pWidth + disX
            break
          case　'top':
            // 同上
            disY = event.clientY > startY ? (startY - event.clientY) : Math.abs(event.clientY - startY)
            this.itemList[this.itemIndex].height = pHeight + disY
            this.itemList[this.itemIndex].y = pPositionY - disY
            break
          case 'bottom': 
            disY = event.clientY - startY
            this.itemList[this.itemIndex].height = pHeight + disY
            break
          case 'left-top': 
            disX = event.clientX > startX ? (startX - event.clientX) : Math.abs(event.clientX - startX)
            disY = event.clientY > startY ? (startY - event.clientY) : Math.abs(event.clientY - startY)
            this.itemList[this.itemIndex].width = pHeight + disX
            this.itemList[this.itemIndex].height = pHeight + disY
            this.itemList[this.itemIndex].x = pPositionX - disX
            this.itemList[this.itemIndex].y = pPositionY - disY
            break
          case 'left-bottom':
            disX = event.clientX > startX ? (startX - event.clientX) : Math.abs(event.clientX - startX)
            disY = event.clientY - startY
            this.itemList[this.itemIndex].width = pWidth + disX
            this.itemList[this.itemIndex].height = pHeight + disY
            this.itemList[this.itemIndex].x = pPositionX - disX
            break
          case 'right-top': 
            disX = event.clientX - startX
            disY = event.clientY > startY ? (startY - event.clientY) : Math.abs(event.clientY - startY)
            this.itemList[this.itemIndex].height = pHeight + disY
            this.itemList[this.itemIndex].width = pWidth + disX
            this.itemList[this.itemIndex].y = pPositionY - disY
            break
          case 'right-bottom': 
            disX = event.clientX - startX
            disY = event.clientY - startY
            this.itemList[this.itemIndex].height = pHeight + disY
            this.itemList[this.itemIndex].width = pWidth + disX
            break
        }
      }

      document.onmouseup = event => {
        document.onmouseup = document.onmousemove = null
      }
    },

    getItem(i){
      this.itemIndex = i
    },

    // getIndex(i){
    //   this.itemIndex = i
    //   this.itemList[i].x = this.tempObj.left
    //   this.itemList[i].y = this.tempObj.top
    //   this.itemList[i].width = this.tempObj.width
    //   this.itemList[i].height = this.tempObj.height
    // }, 

    // onDeactivated(){
    //   console.log(this.itemIndex)
    // },

    // resize(newRect) {
    //   this.tempObj = newRect
    // },

    cancelClick(){
      this.delList = []
    },

    // clickItem(event, id){
    //   if(event.target.parentElement.className === 'vdr inactive'){
    //     if(this.delList.includes(id)){
    //       // let index = this.delList.indexOf(element)
    //       // this.delList.splice(index, 1)
    //     }else(
    //       this.delList.push(id)
    //     )
    //   }
    //   console.log(this.delList)
    // },

    delComponent(){
      for(let i=0; i<this.delList.length; i++){
        let item = this.delList[i]
        for(let k=0; k<this.itemList.length; k++){
          if(item === this.itemList[k].id){
            this.itemList.splice(k, 1)
          }
        }
        // this.delList.splice(this.delList.indexOf(item), 1)
      }
    },

    preview(){
      localStorage.setItem('data', JSON.stringify(this.itemList))
      this.$router.push({name: 'TopoFullscreen'})
    }
  }

}
</script>

<style lang='scss' scoped>
.test{
  display: flex;
  .left{
    width: 200px;
    height: calc(100vh - 100px);
    border: 1px solid #666;
    padding: 10px;
    .component{
      width: 50px;
      height: 50px;
      background: #aaa;
      float: left;
      margin: 0 10px 10px 0; 
    }
  }
  .right{
    width: calc(100% - 200px);
    background: #eee;
    position: relative;
    .componentItem{
      width: 100px;
      height: 100px;
      position: absolute;
      background: #aaa;
      .borderLayer{
        height: calc(100% - 2px);
        width: calc(100% - 2px);
        border: 1px solid rgb(0, 204, 255);
        position: absolute;
        background: none;
        z-index: 1;
        .resize{
          position: absolute;
          height: 5px;
          width: 5px;
          background-color: white;
          border: 1px solid #0cf;
          
        }
        .resize-left-top{
          top: -5px;
          left: -5px;
          cursor: nw-resize;
        }
        .resize-left-center{
          top: 50%;
          left: -5px;
          transform: translateY(-50%);
          cursor: w-resize;
        }
        .resize-left-bottom{
          left: -5px;
          bottom: -5px;
          cursor: sw-resize;
        }
        .resize-center-top{
          left: 50%;
          top: -5px;
          transform: translateX(-50%);
          cursor: n-resize;
        }
        .resize-center-bottom{
          left: 50%;
          bottom: -5px;
          transform: translateX(-50%);
          cursor: s-resize;
        }
        .resize-right-top{
          top: -5px;
          right: -5px;
          cursor: ne-resize;
        }
        .resize-right-center{
          top: 50%;
          right: -5px;
          transform: translateY(-50%);
          cursor: e-resize;
        }
        .resize-right-bottom{
          right: -5px;
          bottom: -5px;
          cursor: se-resize;
        }
      }
      .bgLayer{
        width: 100%;
        height: 100%;
      }
    }
    .bgLayer{
      width: 100%;
      height: 100%;
    }
  }
  .bottom{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 80px;
    line-height: 80px;
    padding: 0 10px;
    button{
      width: 200px;
      height: 40px;
      text-align: center;
      
    }
  }
}
</style>
