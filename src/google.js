export default {
    install(Vue) {
      Vue.mixin({
        mounted() {
          // Initialize Google One Tap
          if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
              client_id: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com', // Replace with your actual Google client ID
              callback: (response) => {
                console.log('Google One Tap response:', response);
                // Handle the response as needed
              }
            });
  
            // Prompt the One Tap UI
            window.google.accounts.id.prompt();
            console.log("Google One Tap initialized");
          }
        }
      });
    }
  };
  