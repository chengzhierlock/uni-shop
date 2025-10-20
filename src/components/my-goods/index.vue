<template>
  <view>
      <block>
        <view class="goods-item">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">￥{{ formattedPrice }}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'MyGoods',
  components: {},
  props: {
    goods: {
      type: Object,
      required: true,
      // default: () => ({}) // 加默认空对象，避免初始无数据时警告
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    }
  },
  computed: {
    formattedPrice() {
      // 1. 从 goods 中获取价格，默认空字符串
      const price = this.goods.goods_price || '';
      // 2. 检查是否为有效数字，无效则显示 0.00
      const validNum = Number(price);
      if (isNaN(validNum)) {
        return '0.00';
      }
      // 3. 保留两位小数（toFixed 返回字符串，避免小数精度问题）
      return validNum.toFixed(2);
    }
  },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
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
  .goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>