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
      $(`.page${number}`).addClass('current-page');
      if (number === 1) {
        $(`.page2`).show();
      }
      if (number === 2) {
        $(`.page3`).show();
        $(`.page3-front`).addClass('current-page');
        setTimeout(() => {
          $(`.page2`).hide().removeClass('current-page').removeClass('wrapper-animate');
        }, 2000);
      }
      if ( number === 3) {
        setTimeout(() => {
          $(`.page2`).show();
          $(`.page2-front`).addClass('current-page');
          $(`.page3`).hide().removeClass('current-page').removeClass('wrapper-animate');
        }, 2000);
      }
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
    }, 1000);
    setTimeout(() => {
      this.wrapperAnimate = true;
      this.bigAnimate = true;
      setTimeout(() => {
        this.pageNum = 1;
        $('.home-text').addClass('text-all-height');
      }, 2000)
    }, 1000)
  }
};
