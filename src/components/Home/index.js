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
      isShow2Sign: false,  // 是否展示勾
      isShow3Sign: false,  // 是否展示勾
    };
  },
  methods: {
    onclickNoticeButton() {
      this.$router.push('result');
    },
    trigWrap(e, number) {
      if (isClick) return;
      isClick = true;
      const currentPageConfig = pageConfig[pageConfigIndex];
      let prePageConfig = pageConfigIndex > 0 ? pageConfig[pageConfigIndex - 1] : '';
      console.log('pageConfigIndex', pageConfigIndex, currentPageConfig, number)
      const selectDom = pageConfigIndex < pageConfig.length ? this.renderSelect(currentPageConfig.selectList) : '';
      console.log("selectDom", selectDom);
      // 判断点击元素
      if (e.target.classList[0] !== 'select' && e.target.classList[0] !== 'start-button') return;
      if (e.target.classList[0] === 'select' && prePageConfig.selectList) {
        // const order = e.target.classList[1].substr(6, 1);
        // console.log("order", order,e.target)
        // const position = currentPageConfig.selectList[order];
        $(e.target).html(`<img src='${host}/static/img/gou.png' class='gou-sign'/>`)
      }
      if (number === 1) {
        $(`.page1`).addClass('wrapper-animate');
        $('#page2-content').html(selectDom).css({
          background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
          'background-size': 'cover',
        });
      }
      if (number === 2) {
        $('.page2').css({ 'z-index': 10000 }).addClass('wrapper-animate');
        setTimeout(() => {
          $(`.page3`).css({ 'z-index': 9999 }).show().find('#page3-content').html(selectDom).css({
            background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
            'background-size': 'cover',
          });
        }, 1000);
        setTimeout(() => {
          $(`.page2`).hide().removeClass('wrapper-animate').css({ 'z-index': 0 });
        }, 2000);
      }
      if (number === 3) {
        $('.page3').css({ 'z-index': 10000 }).addClass('wrapper-animate');
        setTimeout(() => {
          $(`.page2`).css({ 'z-index': 9999 }).show().find('#page2-content').css({
            background: `url('${host}/static/img/${currentPageConfig.background}') no-repeat`,
            'background-size': 'cover',
          }).html(selectDom);
        }, 1000);
        setTimeout(() => {
          $(`.page3`).hide().removeClass('wrapper-animate').css({ 'z-index': 0 });
        }, 2000);
      }
      setTimeout(() => {
        isClick = false;
        if (pageConfigIndex >= pageConfig.length) return this.$router.push('result');
        pageConfigIndex = pageConfigIndex + 1;
      }, 1000)
    },
    renderSelect(selectList) {
      if (!selectList) return '';
      return selectList.reduce((acc, item, index) => {
        return `${acc}<div class='select select${index}' style="left:${item.left};top:${item.top}"></div>`
      }, '')
    }
  },
  mounted() {
    isClick = false;
    pageConfigIndex = 0;
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
        $('.face-page').css({
          'z-index': 0,
        });
        $('.home-text').addClass('text-all-height');
      }, 2000)
    }, 1000)
  }
};
