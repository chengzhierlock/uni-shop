<template>
  <view>
    <swiper :indicator-dots="true" autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList"  :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
     <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image
          class="nav-img"
          :src="item.image_src"
          mode="scaleToFill"
        />
      </view>
     </view>

     <!-- 楼层 -->
      <view class="floor-list">
        <view class="floor-item"  v-for="(floor, fIndex) in floorList" :key="fIndex">
          <image :src="floor.floor_title.image_src" class="floor-title"></image>
          <view class="floor-img-box">
            <view class="left-imgbox">
              <image :src="floor.product_list[0].image_src" :style="{width: floor.product_list[0].image_width + 'rpx'}"></image>
            </view>
            <view class="right-img-box" >
              <navigator class="right-img-item"  v-for="(item2, index2) in floor.product_list" :key="index2" :url="item2.url">
                <image  v-if="index2 !== 0" :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
              </navigator>
            </view>
          </view>
        </view>
      </view>
  </view>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
export default defineComponent({
  components: {},
  data() {
    return {
      // 轮播图
      swiperList: [],
      navList: [],
      floorList: []
    }
  },
  computed: {},
  methods: {
    async getSwiperList() {
      const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
      // console.log(res);
      if (res.meta.status !== 200) {
        return uni.$showMsg()
      }
      this.swiperList = res.message
      uni.$showMsg('获取轮播图成功')
    },

    async getNavList() {
      const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
      if (res.meta.status !== 200) {
        return uni.$showMsg()
      }
      this.navList = res.message
      uni.$showMsg('获取导航数据成功')
      // console.log(res);
      
    },

    async getFloorList() {
      const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) {
        return uni.$showMsg()
      }
      res.message.forEach(prod => {
        prod.product_list.forEach( (item) => {
          // console.log(item);
          item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
      })
    })
      this.floorList = res.message
      uni.$showMsg('获取楼层数据成功')
      console.log(res);
    },

    navClickHandler(item) {
      // console.log(item);
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        })
      }
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}) 
</script>

<style lang="scss" scoped>
  swiper {
    height: 330rpx;
    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }

  .nav-list {
    display:flex;
    justify-content: space-around;
    margin: 15px 0;
    .nav-img {
      height: 140rpx;
      width:128rpx
    }
  }

  .floor-img-box {
    display: flex;
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>