<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item" 
            @click="handleToRecommend"
            :class="{ on: type === 'recommend' }">每日推荐</div>
            <div class="daily-menu-item" 
            :class="{ on: type === 'daily' }" 
            @click="showThemes = !showThemes">栏目总览</div>
            <ul v-show="showThemes">
                <li v-for="(item,index) in themes" :key="index">
                    <a 
                    :class="{ on: item.id === themeId && type === 'daily' }"
                    @click="handleToTheme(item.id)">{{ item.name }}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list" ref="list">
            <template v-if="type === 'recommend'">
              <div v-for="(list,index) in recommendList" :key="index">
              <div class="daily-date">{{ formatDay(list.date) }}</div>
              <Item
                v-for="item in list.stories"
                :data="item" 
                :key="item.id" 
                @click.native="handleClick(item.id)"></Item>
              </div>
            </template>
            <template v-if="type === 'daily'">
              <Item
              v-for="item in list" 
              :data="item" 
              :key="item.id" 
              @click.native="handleClick(item.id)"></Item>
            </template>
        </div>
        <!-- 文章详情页开始 -->
        <!-- 加载内容开始 -->
        <!-- Item是组件，绑定原生事件要带事件修饰符.native，否则会认为监听的是来自Item组件的自定义事件click -->
        <daily-article :id="articleId"></daily-article>
        <!-- 加载内容结束 -->
        <!-- 文章详情页结束 -->
    </div>
</template>
<script>
import $ from './libs/util';
import Item from './components/item.vue';
import dailyArticle from './components/daily-article.vue';
export default {
  components: { Item, dailyArticle },
  data () {
    return {
      //每日推荐开始
      type: 'recommend',
      recommendList: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      // 每日推荐结束

      //主题日报开始
      themes: [], //主题日报的分类列表
      showThemes: false,
      list: [],
      themeId: 0,
      // 主题日报结束

      // 文章详情页开始
      // 加载内容开始
      articleId:0
      // 加载内容结束
      // 文章详情页结束


    };
  },
  methods: {
    //每日推荐开始
    handleToRecommend () {
      this.type = 'recommend';
      this.recommendList = [];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },
    getRecommendList () {
      //推荐文章列表
      //加载时设置为true，加载完成后置为false
      this.isLoading = true;
      //dailyTime默认获取今天0点的时间戳，请求时需要加多一天
      const prevDay = $.prevDay(this.dailyTime + 86400000);
      $.ajax.get('news/before/' + prevDay).then(res => {
        this.recommendList.push(res);
        this.isLoading = false;
      });
    },
    // 每日推荐结束
    //主题日报开始
    handleToTheme (id) {
      //改变菜单分类
      this.type = 'daily';
      //设置当前点击子类的主题日报id
      this.themeId = id;
      //清空中间栏的数据
      this.list = [];
      $.ajax.get('section/' + id).then(res => {
        //过滤掉类型为1的文章，该类型下的文章为空
        this.list = res.stories.filter(item => item.type !== 1);
      });
    },
    getThemes () {
      //axios发起get请求
      $.ajax.get('sections').then(res => {
        this.themes = res.data;
        // console.log()
      });
    },
    // 主题日报结束
    //转换为带汉字的月日
    formatDay (date) {
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      if (month.substr(0, 1) === '0') month = month.substr(1, 1);
      if (day.substr(0, 1) === '0') day = day.substr(1, 1);
      return `${month} 月 ${day} 日`;
    },
    // 文章详情页开始
    // 加载内容开始
    handleClick (id) {
      this.articleId = id;
    }
    // 加载内容结束
    // 文章详情页结束
  },
  mounted () {
    //初始化时调用
    //主题日报开始
    this.getThemes();
    // 主题日报结束
    //每日推荐开始
    this.getRecommendList();
    //获取到DOM
    const $list = this.$refs.list;
    //监听中栏的滚动事件
    $list.addEventListener('scroll', () => {
      //在“主题日报”或正在加载推荐列表时停止操作
      if (this.type === 'daily' || this.isLoading) return;
      //已经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
      if 
      (
        $list.scrollTop 
      + document.body.clientHeight 
      >= $list.scrollHeight
      ) 
      {
        //时间相对减少一天
        this.dailyTime -= 86400000;
        this.getRecommendList();
      }
    });
    // 每日推荐结束
  }
};
</script>