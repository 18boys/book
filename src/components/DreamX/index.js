const MPReg = /^(13|15|18|14|17|16|19)\d{9}$/;

export default {
  data() {
    return {
      isClick: false,
      isClickToRight: false,
      index: -1,

      // userName:'',
      // dream:'',
      province: '',
      city: '',
      county: '',
      address: '',
      mobile: '',

      alertText:'',
      isShowAlert: false,
    };
  },
  computed: {
    userName: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.dreamObj.userName
      },
      set(userName) { // 当修改对应的数据的时候
        this.$store.commit('updateDream', { userName })
      }
    },
    dream: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.dreamObj.dream
      },
      set(dream) { // 当修改对应的数据的时候
        this.$store.commit('updateDream', { dream })
      }
    },
  },
  methods: {
    clickSelected(type) {
      if (type === this.select) {
        this.select = '';
        return;
      }
      this.select = type;
    },
    showError(msg) {
      this.error = msg;
      setTimeout(() => {
        this.error = '';
      }, 2000)
      alert(msg);
    },
    onclickPostcard(index) {
      this.index = index;
      this.isClick = true;
    },
    onclickButton() {
      if (!this.isClickToRight) {  // 说明点击向右移动的

        if (!this.$store.state.dreamObj.userName) {
          this.showError('请输入你的名字');
          return;
        }
        if (!this.$store.state.dreamObj.dream) {
          this.showError('请输入你的梦想');
          return;
        }
        this.isClickToRight = true;
        return;
      }

      if (!this.province) {
        this.showError('请输入你所在省份');
        return;
      }
      if (!this.city) {
        this.showError('请输入你所在城市');
        return;
      }
      if (!this.county) {
        this.showError('请输入你所在区县');
        return;
      }
      if (!this.address) {
        this.showError('请输入你的详细地址');
        return;
      }
      if (!this.mobile) {
        this.showError('请输入你的手机号码');
        return;
      }

      if (!MPReg.test(this.mobile)) {
        this.showError('你的手机号码格式有误');
        return;
      }

      $(".province").blur(() => {

      });

      // 发送保存的请求
      this.saveDream();

      setTimeout(() => {
        this.$router.push({
          path: 'result',
          query: {
            index: this.index,
          }
        });
      }, 500)
      // setTimeout(() => {
      //   this.$router.push('result');
      // }, 500)

    },

    saveDream() {
      const scriptEle = document.createElement('script');
      scriptEle.src = `https://impservice.youdao.com/shutup/submit.s?phone=${this.mobile}&name=${this.userName}&email=${this.province}省${this.city}市${this.county}区/县&area=${this.dream}&address=${this.address}&age=${this.index}&from=lettertomyself`;
      document.body.appendChild(scriptEle);
    },
    clickMash() {
      this.isShowAlert = false;
    },
    showError(msg) {
      this.isShowAlert = true;
      this.alertText = msg;
    },
  },
  mounted() {

  }
};
