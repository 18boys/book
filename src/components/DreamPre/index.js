require('@lib/js.fullpage')

export default {
  data() {
    return {};
  },
  methods: {
    onclickNoticeButton() {
      this.$router.push('dreamX');
    },
  },
  mounted() {
    // document.getElementsByClassName('wp-inner')[0].fullpage({
    //   start: 0,
    // });
    const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');

    setTimeout(() => {
      $('.dream-pre').css({
        'background': `url("${host}/static/img/dream-title-bg.jpg") no-repeat`,
        'background-size': 'cover',
      });
      $('.text-one').css('display', 'none');
      $('.text-two , .notice-button').css({
        'display': 'block',
        'animation': 'text-two 3s linear',
      });
    }, 8000)
  }
};
