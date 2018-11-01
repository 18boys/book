import './turn';
import { pageConfig } from './config'

const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
let isClick = false;
let pageConfigIndex = 0;
let score = {
  eli: 0,
  xiaowang: 0,
  tangji: 0,
  lubin: 0,
  shita: 0,
  fuer: 0,
  hali: 0,
};

let namex = {
  eli: '伊丽莎白',
  xiaowang: '小王子',
  tangji: '堂吉柯德',
  lubin: '鲁宾逊',
  shita: '罗柏史塔克',
  fuer: '福尔摩斯',
  hali: '哈利波特',
};
export default {
  data() {
    return {
      name: '',
      wrapperAnimate: false,
      bigAnimate: false,
    };
  },
  methods: {
    getMax() {
      let max = 'eli';
      Object.keys(score).forEach((item) => {
        if (score[item] > score[max]) {
          max = item;
        }
      })
      return max;
    },
    addScore(list=[]) {
      // console.log(list);
      list.forEach((item) => {
        score[item] = score[item] + 1;
      })
    },
    trigOne() {
      // if (!this.name) return alert('请输入你的名字');
      $('#magazine').turn('page', 2);
    },
    trigWrap(e, imgNum) {
      if (isClick) return;
      isClick = true;
      if (e.target.classList[0] !== 'select') {
        return isClick = false;
      }
      const currentPageConfig = pageConfig[imgNum - 1];
      // console.log('e.target.classList[0]', e.target.classList[0], pageConfigIndex, currentPageConfig)
      // 判断点击元素
      if (e.target.classList[0] === 'select' && currentPageConfig.selectList) {
        const order = e.target.classList[1].substr(6, 1);
        // console.log("order", order,);
        const position = currentPageConfig.selectList[order];
        this.addScore(position.person);
        $(e.target).html(`<img src='${host}/static/img/gou.png' class='gou-sign'/>`)
        setTimeout(() => {
          isClick = false;
          // $('#magazine').turn('next');
          // return;
          if (position.jump) return $("#magazine").turn("page", position.jump * 2);

          // 最后一页 计算可能角色
          const max = this.getMax();
          window.share(max + '.jpg', namex[max]);
          // console.log('max', max);
          // this.$router.push('result');
          this.$router.push({
            path: 'result',
            query: {
              max,
              userName: this.name,
            }
          });
        }, 500)
      }
    },
    renderSelect(selectList) {
      if (!selectList) return '';
      return selectList.reduce((acc, item, index) => {
        return `${acc}<div class='select select${index}' style='left:${item.left};top:${item.top}'></div>`
      }, '')
    },
  },
  mounted() {
    isClick = false;
    pageConfigIndex = 0;
    score = {
      eli: 0,
      xiaowang: 0,
      tangji: 0,
      lubin: 0,
      shita: 0,
      fuer: 0,
      hali: 0,
    };

    // setTimeout(() => {
    //   var screenWidth = document.body.clientWidth,
    //     screenHeight = document.body.clientHeight,
    //     originWidth = 375,
    //     originHeight = 604;
    //   $('#app').css({
    //     '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
    //     transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
    //   });
    // }, 1000);

    setTimeout(() => {
      this.wrapperAnimate = true;
      this.bigAnimate = true;
      setTimeout(() => {
        $('.face-page').css({
          'z-index': -1,
        }).find('.face-back').css({
          transform: 'rotateY(0)'
        });

        $('#magazine')
          .show()
          .turn({
            display: 'double',
            acceleration: true, //设置硬件加速模式，对于触摸设备这个值必须是真的
            gradients: true,  //在转换过程中显示渐变和阴影。
            elevation: 100, //设置过渡期间页面的高程
            when: {
              turning: (e, page, view) => {
                // console.log('turning', page);
                isClick = false;
                if (page === 1) {
                  return;
                }
              },

              turned: (e, page) => {
                // console.log('page turned', page);
                if (page === 1) {
                  $('.home-text').addClass('text-all-height');
                  return;
                }
                if (page === 2) {
                  pageConfigIndex = 0;

                  const currentPageConfig = pageConfig[0];
                  const selectDom = this.renderSelect(currentPageConfig.selectList);
                  $(`.p${page + 1} .page-content`).append(selectDom);
                  return;
                }

                const currentPageConfig = pageConfig[(page / 2) - 1];
                const selectDom = this.renderSelect(currentPageConfig.selectList);
                // console.log('select配置为', page, currentPageConfig, selectDom, $(`.p${page + 1} .page-content`))
                $(`.p${page + 1} .page-content`).append(selectDom);
                pageConfigIndex = page / 2 - 1;
                // console.log('pageConfigIndex', pageConfigIndex)
              }
            }
          })
      }, 1700)
    }, 1000)
  }
};
