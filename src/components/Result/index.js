export default {
  data() {
    return {
      rNameUrl: '',
      imgUrl: '',
      postImgUrl: '',
      receiveImgUrl: '',

      // showShare: false,
    };
  },
  mounted: async function () {
    let { rName } = this.$route.query;
    if (!rName) rName = 'rob';
    const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
    this.rNameUrl = `${host}/static/img/${rName}.jpg`;
    $('.background-img').css({
      background: `url('${this.rNameUrl}')  no-repeat`,
      'background-size': '100% 100%',
    });
  }
};