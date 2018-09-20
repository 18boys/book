import { provinceList, yearList, topicMap, topicTypeList, randomMap } from './config';

const list = {
  provinceList,
  yearList,
};
export default {
  data() {
    return {
      province: '',
      year: '',
      select: '',  // wenke  like
      userName: '',

      bigFrameType: '',
      list: [],
      isShowBigFrame: false,

      error: ''
    };
  },
  methods: {
    clickSelected(type) {
      if (type === this.select) {
        this.select = '';
        return;
      }
      this.select = type;
    },
    showError(msg) {
      this.error = msg;
      setTimeout(() => {
        this.error = '';
      }, 2000)
      alert(msg);
    },
    async onclickButton() {
      if (!this.province) {
        this.showError('请选择高考所在地');
        return;
      }
      if (!this.year) {
        this.showError('请选择高考年份');
        return;
      }
      if (!this.select) {
        this.showError('请选择文理科');
        return;
      }
      if (!this.userName) {
        this.showError('请输入你的名字');
        return;
      }
      const key = `${this.year}_${this.province}`;
      const randomMapKey = topicMap[key];
      const randomList = randomMap[randomMapKey];
      const topic = randomList[Math.floor(Math.random() * randomList.length)];
      const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
      const imgUrl = `${host}/static/topic/${topic}`;
      const commentkey = topic.split('_')[3];
      const commentUrl = `${host}/static/comment/${commentkey}_${1 + Math.floor(Math.random() * 6)}.png`;
      $(".name").blur(() => {

      });

      setTimeout(() => {
        this.$router.push({
          path: 'topic',
          query: {
            imgUrl,
            userName: this.userName,
            commentUrl,
          }
        });
      }, 100)
    },
    onclickFrameSelect(type) {
      this.list = list[type + 'List'];
      this.bigFrameType = type;
      this.isShowBigFrame = true;
    },
    onclickCancelSelect() {
      this.list = [];
      this.isShowBigFrame = false;
    },
    onclickItem(item) {
      this[this.bigFrameType] = item;
      this.isShowBigFrame = false;
      this.list = [];
      this.bigFrameType = '';
    }
  },
  mounted() {
  }
};
