import { pageConfig } from './config'

const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
let isClick = false;
let pageConfigIndex = 0;
let page2Dom = '';
let page3Dom = '';
export default {
  data() {
    return {
      wrapperAnimate: false,
      bigAnimate: false,
    };
  },
  methods: {
    onclickNoticeButton() {
      this.$router.push('homePost');
    },
    trigWrap(number) {
      if (isClick) return;
      isClick = true;
      const currentPageConfig = pageConfig[pageConfigIndex];
      console.log('pageConfigIndex', pageConfigIndex, currentPageConfig, number)
      if (number === 1) {
        $(`.page1`).addClass('wrapper-animate');
        $('#page2-content').css({
          background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
          'background-size': 'cover',
        });
      }
      if (number === 2) {
        $('.page2').css({ 'z-index': 10000 }).addClass('wrapper-animate');
        // $('.page3').show().find('#page3-content').css({
        //   background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
        //   'background-size': 'cover',
        // });
        setTimeout(() => {
          $(`.page3`).css({ 'z-index': 9999 }).show().find('#page3-content').css({
            background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
            'background-size': 'cover',
          });
        }, 1000);
        setTimeout(() => {
          $(`.page2`).hide().removeClass('wrapper-animate').css({ 'z-index': 0 });
        }, 2000);
      }
      if ( number === 3) {
        $('.page3').css({ 'z-index': 10000 }).addClass('wrapper-animate');
        setTimeout(() => {
          $(`.page2`).css({ 'z-index': 9999 }).show().find('#page2-content').css({
            background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
            'background-size': 'cover',
          });
        }, 1000);
        setTimeout(() => {
          $(`.page3`).hide().removeClass('wrapper-animate').css({ 'z-index': 0 });
        }, 2000);
      }
      setTimeout(() => {
        isClick = false;
        pageConfigIndex = pageConfigIndex + 1;
      }, 2000)
    },
  },
  mounted() {
    page2Dom = $('#page2-content');
    page3Dom = $('#page3-content');
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
        // this.pageNum = 1;
        $('.face-page').css({
          'z-index': 0,
        });
        $('.home-text').addClass('text-all-height');
      }, 2000)
    }, 1000)
  }
};
