<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
        <MyGoods :goods="item"></MyGoods>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MyGoods from '@/components/my-goods/index.vue';
export default defineComponent({
  components: { MyGoods },
  data() {
    return {
      queryObj: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0,
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      isLoading: false
    }
  },
  computed: {},
  methods: {
    async getGoodsList(cb) { 
      this.isLoading = true
      const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
      if(res.meta.status !== 200) return uni.$showMsg();
      this.total = res.message.total
      this.goodsList = [...this.goodsList, ...res.message.goods]
      this.isLoading = false
      cb && cb()
      // console.log(this.goodsList);
    },

    gotoDetail(item) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?id=' + item.goods_id
      })
    }
  },
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
    if (this.isLoading) return
    this.queryObj.pagenum += 1
    this.getGoodsList()
  },
  onPullDownRefresh() {
    this.queryObj.pagenum = 1
    this.total = 0
    this.isloading = false
    this.goodsList = []

    // 2. 重新发起请求
    this.getGoodsList(() => uni.stopPullDownRefresh())
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.queryObj.query = options.query || ''
    this.queryObj.cid = options.cid || ''
    console.log(options);
    this.getGoodsList()
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
</style>