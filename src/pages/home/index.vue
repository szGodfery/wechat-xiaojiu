<template>
  <div>
    <!-- 1.0 轮播图 -->
    <swiper indicator-dots autoplay interval="3000" duration="1000" indicator-color="#fff" indicator-active-color="#999" circular>
      <block v-for="item in swiperData" :key="item.goods_id">
        <navigator :url='item.navigator_url'>
          <swiper-item>
            <image :src="item.image_src" class="slide-image" />
          </swiper-item>
        </navigator>
      </block>
    </swiper>
    <!-- 2.0 菜单项目 -->
    <view class="categorys">
      <block v-for="(item,index) in cateitems" :key="index">
        <image :src="item.image_src" />
      </block>
    </view>

    <!-- 3.0 楼层数据渲染 -->

    <view class="floor">
      <!-- 遍历每一个楼层 -->
      <view v-for="(item,index) in floorData" :key="index">
        <!-- 楼层头部 -->
        <view class="floor-head">
          <image :src="item.floor_title.image_src" />
        </view>
        <!-- 楼层body -->
        <view class="floor-body">
          <!-- 楼层body的左边 -->
          <view class="floor-body-left">
            <image :src="item.product_list[0].image_src" />
          </view>
          <!-- 楼层body的右边 -->
          <view class="floor-body-right">
            <!-- 由于图片数组有5条数据,所以按照条件进行遍历,,,也就是v-if="subIndex>0" -->
            <!-- 注意事项:两个循环里面的,index必须起不一样的名字 -->
            <view v-if="subIndex > 0" v-for="(subitem,subIndex) in item.product_list" :key="subIndex">
              <image :style="{width:subitem.image_width+'rpx;'}" :src="subitem.image_src" />
            </view>
          </view>
        </view>
      </view>

    </view>

    <!-- 4.0 底部提示 -->
    <view class="end-tips">
      <view class="iconfont icon-xiao"></view>
      <text class="bottomline">我是有底线的</text>
    </view>

    <!-- 5.0 回到顶部 -->
    <view v-show="isShowGoToTop" @click="goToTop" class="gotop">
      <view class="to-top">
        <image src="/static/img/arrow_top@2x.png" />
        <text>顶部</text>
      </view>
    </view>
  </div>

</template>


<script>
export default {
  data() {
    return {
      swiperData: [], //轮播图数据
      cateitems: [], //菜单分类数据
      floorData: [], //楼层数据
      isShowGoToTop: false //是否显示去顶部按钮
    };
  },
  created() {
    this.getSwiperData();
    this.getCategoryData();
    this.getFloorData();
  },
  onPageScroll(e) {
    if (e.scrollTop > 100) {
      if (this.isShowGoToTop) return;
      this.isShowGoToTop = true;
    } else {
      if (!this.isShowGoToTop) return;
      this.isShowGoToTop = false;
    }
  },
  methods: {
    //获取轮播图数据
    // getSwiperData(){
    //    this.$axios.get('api/public/v1/home/swiperdata').then(res=>{
    //      this.swiperData=res.data.message
    // })
    // },
    // 使用异步函数来改进 轮播图数据
    async getSwiperData() {
      const res = await this.$axios.get("api/public/v1/home/swiperdata");
      this.swiperData = res.data.message;
    },
    // 获取分类数据
    getCategoryData() {
      this.$axios.get("api/public/v1/home/catitems").then(res => {
        this.cateitems = res.data.message;
      });
    },
    // 获取楼层数据
    async getFloorData() {
      const res = await this.$axios.get("api/public/v1/home/floordata");
      this.floorData = res.data.message;
    },

    // 回到顶部
    goToTop() {
      wx.pageScrollTo({
        scrollTop: 0, //滚动到页面的目标位置（单位px）,
        duration: 300 //滚动动画的时长，默认300ms，单位 ms,
      });
    }
  }
};
</script>

<style lang="less" scoped>
swiper {
  width: 750rpx;
  height: 400rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.categorys {
  width: 750rpx;
  height: 140rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  image {
    width: 100rpx;
    height: 100rpx;
  }
}

.floor {
  margin-top: 20rpx;
  background-color: white;
  &-head {
    width: 750rpx;
    height: 59rpx;
    image {
      margin: 10rpx 0rpx 0rpx 10rpx;
      width: 100%;
      height: 100%;
    }
  }
  &-body {
    display: flex;
    padding: 20rpx 16rpx 10rpx 16rpx;
    &-left {
      width: 232rpx;
      height: 386rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      view {
        margin: 0 0 10rpx 10rpx;
        image {
          display: block;
          height: 188rpx;
          // margin: 0 0 10rpx 10rpx;
        }
        &:nth-child(n + 2) {
          margin-bottom: 0;
        }
      }
    }
  }
}

.end-tips {
  display: flex;
  height: 100rpx;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #888;
  .bottomline {
    margin-left: 5rpx;
  }
}
.gotop {
  position: fixed;
  right: 40rpx;
  bottom: 50rpx;
  .to-top {
    width: 90rpx;
    height: 90rpx;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // border: 1px solid rgba(92,92,92,0.3);
    image {
      width: 24rpx;
      height: 14rpx;
    }
    text {
      margin-top: 20rpx;
      color: #999;
    }
  }
}
</style>




