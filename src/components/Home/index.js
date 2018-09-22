let timer = '';
export default {
  data() {
    return {
      wrapperAnimate: false,
      bigAnimate: false,
      pageNum: 0,
    };
  },
  methods: {
    onclickNoticeButton() {
      this.$router.push('homePost');
    },
    trigWrap(number) {
      $(`.page${number}`).addClass('wrapper-animate');
      this.pageNum = number + 1;
    }
  },
  mounted() {
    setTimeout(() => {
      var screenWidth = document.body.clientWidth,
        screenHeight = document.body.clientHeight,
        originWidth = 375,
        originHeight = 604;
      $('#app').css({
        '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
        transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
      });
    }, 1000)
    // $('.notice-button')[0].addEventListener('touchstart', (e) => {
    //   e.preventDefault();
    //   timer = setTimeout(() => {
    //     this.onclickNoticeButton();
    //   }, 800)
    // });
    // $('.notice-button')[0].addEventListener('touchend', () => {
    //   if (timer) clearTimeout(timer);
    // });
    setTimeout(() => {
      this.wrapperAnimate = true;
      this.bigAnimate = true;
      setTimeout(() => {
        this.pageNum = 1;
      }, 2000)
    }, 1000)


  }
};
