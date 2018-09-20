<template>
  <div>
    <div id="app">
      <!--<img src="./img/home.jpg">-->
      <router-view />

    </div>
    <div class="music-bg music-bg-open" @click="onClick" v-if="isPlay"></div>
    <div class="music-bg music-bg-close" @click="onClick" v-if="!isPlay"></div>
    <!--<audio id="video-bg" src="/dict/market/wdgkt/static/voice/bgm.mp3" loop autoplay></audio>-->
    <audio id="video-bg" src="../static/voice/bgm.mp3" loop autoplay></audio>
    <div class="outer-star" v-if="isShowLoading">
      <img class="star" src="../static/img/star.png" />
    </div>
    <div class="process" v-if="isShowLoading">
      Loading<span>{{points}}</span>
    </div>
  </div>

</template>

<script>
  let index = 0;
  const numList = [".", "..", "...", "..", ".", ""];
  export default {
    name: 'App',
    data() {
      return {
        isPlay: true,
        points: '',
      };
    },
    computed: {
      isShowLoading: {
        get() { // 当拿取 对应的数据的时候
          return this.$store.state.globleObj.isShowLoading
        },
      },
    },
    methods: {
      onClick() {
        this.isPlay = !this.isPlay;
        if (this.isPlay) {
          $("#video-bg")[0].play();
        } else {
          $("#video-bg")[0].pause();
        }
      },
      showPoint() {
        this.points = numList[index];
        if (index === numList.length - 1) {
          index = -1;
        }
        index = index + 1;
        setTimeout(() => {
          this.showPoint();
        }, 1000);
      }
    },
    mounted() {
      this.showPoint();

      function change() {
        var screenWidth = document.body.clientWidth,
          screenHeight = document.body.clientHeight,
          originWidth = 375,
          originHeight = 604;
        $('#app').css({
          '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
          transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
        });
      }

      $(() => {
        $("#video-bg")[0].play();
        document.addEventListener("WeixinJSBridgeReady", function () {
          $("#video-bg")[0].play();
        });
        change();
        // window.addEventListener("resize", function () {
        //   change();
        // }, false);

      })

      window.alert = function (name) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
      }

    }
  }
</script>

<style>
  .music-bg {
    position: absolute;
    right: 0.1rem;
    top: 0.2rem;
    width: 0.3rem;
    height: 0.3rem;
  }

  .music-bg-open {
    background: url("../static/img/mu-open.png") no-repeat;
    background-size: cover;
    animation: rotate 2s linear infinite;
  }

  .music-bg-close {
    background: url("../static/img/mu-close.png") no-repeat;
    background-size: cover;
  }

  .outer-star {
    position: relative;
    background: url("../static/img/outer-star.png") no-repeat;
    background-size: cover;
    width: 0.7rem;
    height: 0.74rem;
    top: -4.05rem;
    margin: 0 auto;
    text-align: center;
  }

  .star {
    width: 0.44rem;
    height: 0.52rem;
    margin: 0.11rem;
    animation: rotate infinite 2s;
  }

  .process {
    position: relative;
    top: -3.85rem;
    font-size: 0.16rem;
    text-align: center;
    color: #f6d063;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {

    color: #666;
    font-size: 12px;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #666;
    font-size: 12px;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #666;
    font-size: 12px;
  }

  @keyframes rotate {
    0% {
      transform: rotateY(0);
    }
    25% {
      transform: rotateY(90deg);
    }
    50% {
      transform: rotateY(180deg);
    }
    75% {
      transform: rotateY(270deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
</style>
