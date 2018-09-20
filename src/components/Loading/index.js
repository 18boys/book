import { imgList } from './config'

export default {
  data() {
    return {
      fileLength: imgList.length,
      loadInterval: '',
      index: 0,
    }
  },

  methods: {
    loadImg() {
      const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
      const imgPath = `${host}/static/img/`;
      const fileAry = [];
      this.loadInterval = setInterval(() => {
        if (this.index < this.fileLength) {
          fileAry[this.index] = new Image();
          fileAry[this.index].onload = () => {
            this.percent = Math.floor(100 * parseInt(this.index) / parseInt(this.fileLength));
          };
          fileAry[this.index].src = imgPath + imgList[this.index];
          this.index++;
        } else {
          clearInterval(this.loadInterval);
          setTimeout(() => {
            this.$router.push('home');
            this.$store.commit('updateGlobleObj', { isShowLoading: false });
          }, 0)
        }
      }, 100);
    }
  },
  mounted() {
    this.loadImg();
    this.$store.commit('updateGlobleObj', { isShowLoading: true });
  }
};
