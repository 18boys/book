export default {
  data() {
    return {};
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
    onclickButton() {
      if (!this.$store.state.dreamObj.userName) {
        this.showError('请输入你的名字');
        return;
      }
      if (!this.$store.state.dreamObj.dream) {
        this.showError('请输入你的梦想');
        return;
      }
      $(".name").blur(() => {

      });

      setTimeout(() => {
        this.$router.push('address');
      }, 100)
    },
  },
  mounted() {

  }
};
