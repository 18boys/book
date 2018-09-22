let timer = '';
export default {
  data() {
    return {
      "wrapperAnimate": false,
    };
  },
  methods: {
    onclickNoticeButton() {
      this.$router.push('homePost');
    },
  },
  mounted() {
    // setTimeout(() => {
    //   var screenWidth = document.body.clientWidth,
    //     screenHeight = document.body.clientHeight,
    //     originWidth = 375,
    //     originHeight = 604;
    //   $('#app').css({
    //     '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
    //     transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
    //   });
    // }, 1000)
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
    }, 1000)
  }
};
