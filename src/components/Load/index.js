require('@lib/turn');

export default {
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {
    $("#flipbook").turn({
      width: '100%',
      height: '100%',
      autoCenter: true
    });
  }
};
