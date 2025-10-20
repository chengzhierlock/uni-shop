<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script lang="ts">
// import uniIcons from '@/components/uni-icons/uni-icons.vue';
import {defineComponent} from 'vue';
export default defineComponent({
  name: "my-search",
  data() {
    return {
      wh: 0
    }
  },
  props: {
    bgcolor: {
      type: String,
      default: '#C00000'
    },
    radius: {
      type: String,
      default: '18'
    }
  },
  // components: {uniIcons},
  computed: {},
  methods: {
    searchBoxHandler() {
      this.$emit('click')
    }
  },
  watch: {},
  mounted() {
    const sysInfo = uni.getSystemInfoSync()
    this.wh = sysInfo.windowHeight
  }
}) 
</script>

<style lang="scss" scoped>
  .my-search-container {
    height: 50px;
    padding: 0 10px;
    display:flex;
    align-items: center;
  }

  .my-search-box {
    display: flex;
    height: 36px;
    background-color: #ffffff;
    width:100%;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px
    }
  }
</style>