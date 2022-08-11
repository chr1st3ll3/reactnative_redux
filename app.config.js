module.exports = () => {
    if (process.env.MY_ENVIRONMENT === 'production') {
      return {
        /* your production config */
        CURRNT_API_URL: "https://currnt.com"
      };
    } else {
      return {
        /* your development config */
        name: 'Currnt',
        version: '1.0.0',
        extra: {
            CURRNT_API_URL: "http://192.168.100.16:9999" //ipconfig getifaddr en0
        }
      };
    }
  };