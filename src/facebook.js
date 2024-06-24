export default {
    install(Vue) {
      Vue.mixin({
        mounted() {
          if (window.FB) {
            window.FB.XFBML.parse();
            console.log("run facebook")
          }
          if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
              client_id: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com',
              callback: (response) => console.log(response)
            });
            window.google.accounts.id.prompt();
          }
        }
      });
    }
  };
  