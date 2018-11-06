export default {
  data() {
    return {
      showImgUrl: '',
      imgUrl: '',
      lookupUrl: '',
      username: '',

      showShare: false,
    };
  },
  methods: {
    onGoto() {
      this.showShare = true;
      // location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1MzM5MDYwMQ==&scene=110&from=singlemessage&isappinstalled=0#wechat_redirect'
    },
    onShare() {
      this.showShare = !this.showShare;
    }
  },
  mounted: async function () {
    setTimeout(() => {
      var screenWidth = document.body.clientWidth,
        screenHeight = document.body.clientHeight,
        originWidth = 375,
        originHeight = 604;
      $('#app').css({
        '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
        transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
      });
    }, 1000);
    let { userName = '', max = 'hali' } = this.$route.query;
    this.username = userName;
    if (window.gl_use_name) {
      this.username = window.gl_use_name;
    }
    const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
    this.showImgUrl = `${host}/static/img/${max}.jpg`;
    this.lookupUrl = `${host}/static/img/lookup-qrcode.jpg`;
    const shareImgUrl = `${host}/static/img/${max}_share.jpg`;
    const qrcodeImgUrl = `${host}/static/img/qrcode.png`;
    const img = new Image;
    const canvas = document.getElementById('canvas');


    img.src = shareImgUrl;
    img.onload = () => {
      const width = img.width; //确保canvas的尺寸和图片一样
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      const canvasContext = canvas.getContext('2d');
      canvasContext.drawImage(img, 0, 0, width, height);
      canvasContext.font = '30px FZZJ,Arial,黑体,宋体,sans-serif';
      canvasContext.textAlign = "center";
      canvasContext.fillText(this.username, 366, 860);
      const qrImg = new Image;
      qrImg.src = qrcodeImgUrl;
      console.log(qrcodeImgUrl);
      qrImg.onload = () => {
        canvasContext.drawImage(qrImg, 460, 1200);
        this.imgUrl = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
      }
    };
  }
};