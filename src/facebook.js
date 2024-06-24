export default {
    install(Vue) {
      Vue.mixin({
        mounted() {
          if (window.FB) {
            window.FB.XFBML.parse();
            console.log("run facebook")
          }
     
        }
      });
    }
  };
  