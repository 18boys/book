export default {
  data() {
    return {
      showImgUrl: '',
      imgUrl: '',
      username: '',
    };
  },
  methods: {
    onGoto() {
      location.href = 'https://ke.youdao.com/wap/?outVendor=wdgkt_gwfw_0605&v=' + new Date().getTime();
    }
  },
  mounted: async function () {
    let { userName = '', max = 'hali' } = this.$route.query;
    this.username = userName;
    const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
    this.showImgUrl = `${host}/static/img/${max}.jpg`;
    const shareImgUrl = `${host}/static/img/${max}_share.jpg`;
    const img = new Image;
    const canvas = document.getElementById('canvas');


    img.src = shareImgUrl;
    img.onload = () => {
      console.log('shareImgUrl', shareImgUrl, canvasContext)
      const width = img.width; //确保canvas的尺寸和图片一样
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      const canvasContext = canvas.getContext('2d');
      canvasContext.drawImage(img, 0, 0, width, height);
      canvasContext.font = '30px FZZJ,Arial,黑体,宋体,sans-serif';
      canvasContext.textAlign = "center";
      canvasContext.fillText(this.username, 366, 860);
      this.imgUrl = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
    };
  }
};