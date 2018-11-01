<template>
  <div>
    <div id="app">
      <!--<img src="./img/home.jpg">-->
      <router-view />

    </div>
    <div class="music-bg music-bg-open" @click="onClick" v-if="isPlay"></div>
    <div class="music-bg music-bg-close" @click="onClick" v-if="!isPlay"></div>
    <!--<audio id="video-bg" src="/dict/market/wdgkt/static/voice/bgm.mp3" loop autoplay></audio>-->
    <audio id="video-bg" src="../static/voice/music-bg.mp3" loop autoplay></audio>
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

      function getCookie(sName) {
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
          var aCrumb = aCookie[i].split("=");


          if (encodeURIComponent(sName) == aCrumb[0])
            return decodeURIComponent(aCrumb[1]);
        }
        return null;
      }

      $(document).ready(function () {
        if (browser.versions.weixin) { //微信端调用公众号授权接口
          let user = getCookie('face_user');
          let gl_use_name = '';
          if (user) {
            user = eval('(' + user + ')');
            gl_use_name = user.nick_name;
            alert(gl_use_name)
          } else {
            window.location.href = "https://bnbuyk-8080-dlqrjv.dev.ide.live/php/index.php?method=outh";
          }
        }
      });


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

  @font-face {
    font-family: 'FZZJ';
    src: url('../static/font/FZZJ-XSS.ttf');
  }

  #app {
    font-family: "FZZJ", "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif !important;
  }
  /**{*/
    /*moz-user-select: -moz-none;*/
    /*-moz-user-select: none;*/
    /*-o-user-select:none;*/
    /*-khtml-user-select:none;*/
    /*-webkit-user-select:none;*/
    /*-ms-user-select:none;*/
    /*user-select:none;*/
  /*}*/
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
    animation: rotateZ 2s linear infinite;
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
    animation: rotateY infinite 2s;
  }

  .process {
    position: relative;
    top: -3.85rem;
    font-size: 0.16rem;
    text-align: center;
    color: #f6d063;
  }

  @keyframes rotateY {
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

  @keyframes rotateZ {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
