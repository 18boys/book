import { provinceList, yearList, topicMap, topicTypeList, randomMap } from './config';

const list = {
  provinceList,
  yearList,
};

const MPReg = /^(13|15|18|14|17|16|19)\d{9}$/;
export default {
  data() {
    return {
    };
  },
  computed: {
    province: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.addressObj.province
      },
      set(province) { // 当修改对应的数据的时候
        this.$store.commit('updateAddress', { province })
      }
    },
    city: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.addressObj.city
      },
      set(city) { // 当修改对应的数据的时候
        this.$store.commit('updateAddress', { city })
      }
    },
    county: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.addressObj.county
      },
      set(county) { // 当修改对应的数据的时候
        this.$store.commit('updateAddress', { county })
      }
    },
    address: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.addressObj.address
      },
      set(address) { // 当修改对应的数据的时候
        this.$store.commit('updateAddress', { address })
      }
    },
    mobile: {
      get() { // 当拿取 对应的数据的时候
        return this.$store.state.addressObj.mobile
      },
      set(mobile) { // 当修改对应的数据的时候
        this.$store.commit('updateAddress', { mobile })
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
    async onclickButton() {
      if (!this.$store.state.addressObj.province) {
        this.showError('请输入你所在省份');
        return;
      }
      if (!this.$store.state.addressObj.city) {
        this.showError('请输入你所在城市');
        return;
      }
      if (!this.$store.state.addressObj.county) {
        this.showError('请输入你所在区县');
        return;
      }
      if (!this.$store.state.addressObj.address) {
        this.showError('请输入你的详细地址');
        return;
      }
      if (!this.$store.state.addressObj.mobile) {
        this.showError('请输入你的手机号码');
        return;
      }

      if (!this.$store.state.addressObj.mobile) {
        this.showError('请输入你的手机号码');
        return;
      }

      if (!MPReg.test(this.$store.state.addressObj.mobile)) {
        this.showError('你的手机号码格式有误');
        return;
      }

      $(".name").blur(() => {

      });

      setTimeout(() => {
        this.$router.push('result');
      }, 100)
    },
  },
  mounted() {
  }
};
