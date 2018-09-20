import { downloadImage, previewImage, chooseImage, uploadImage, getLocalImgData } from '@utils/ydk';
import { filterWord } from './config'
import html2canvas from 'html2canvas';
import { mapState } from 'vuex'

export default {
  data() {
    return {
      img: '',
      imgUrl: '',
      postImgUrl: '',
      receiveImgUrl: '',

      showShare: false,
    };
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'dreamObj', 'addressObj'
  ]),
  methods: {
    onShare() {
      this.showShare = !this.showShare;
    }
  },

  filters: {
    processWord: function (value, type) {
      if (!value) return '';
      filterWord.forEach((word) => {
        const reg = new RegExp(word, 'g');
        value = value.replace(reg, '*');
      });
      if (type === 'name') value = value.slice(0, 4);
      if (type === 'dream') value = value.slice(0, 60);
      return value;
    }
  },
  mounted: async function () {
    let { index } = this.$route.query;
    if (!index) index = 1;
    const imgName = ['last-one', 'last-two', 'last-three'][index - 1];
    const host = `${location.origin}${location.pathname}`.split('#')[0].replace(/index(\d)?\.html/, '');
    this.imgUrl = `${host}/static/img/last-postcard.png`;
    this.postImgUrl = `${host}/static/img/${imgName}.jpeg`;
    this.receiveImgUrl = `${host}/static/img/dream-has-receive.png`;
    // let imgHeight = window.document.querySelector('#target').offsetHeight // 获取DOM高度
    // let imgWidth = window.document.querySelector('#target').offsetWidth // 获取DOM宽度
    // let scale = window.devicePixelRatio // 获取设备像素比

    let name = '';
    // 处理敏感词
    filterWord.forEach((word) => {
      name = name.replace(word, '**');
    });
    // this.userName = name;
    // const canvasR = await html2canvas(document.querySelector('#target'), {
      // scale: scale,
      // width: imgWidth,
      // height: imgHeight
    // });
    const canvasR = await drawCanvas('#target');
    this.img = await canvasR.toDataURL("image/jpeg", 1.0);//转成base64
  }
};

/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
}
/**
 *  将传入值转为整数
 */
function parseValue(value) {
  return parseInt(value, 10);
};
/**
 * 绘制canvas
 */
async function drawCanvas(selector) {
  // 获取想要转换的 DOM 节点
  const dom = document.querySelector(selector);
  const box = window.getComputedStyle(dom);
  // DOM 节点计算后宽高
  const width = parseValue(box.width);
  const height = parseValue(box.height);
  // 获取像素比
  const scaleBy = DPR();
  // 创建自定义 canvas 元素
  const canvas = document.createElement('canvas');

  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  canvas.width = width * scaleBy;
  canvas.height = height * scaleBy;
  // 设定 canvas css宽高为 DOM 节点宽高
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  // 获取画笔
  const context = canvas.getContext('2d');

  // 将所有绘制内容放大像素比倍
  context.scale(scaleBy, scaleBy);

  // 将自定义 canvas 作为配置项传入，开始绘制
  return await html2canvas(dom, {canvas});
}