var app = new Vue({
  el: '#app',
  
  data: {
    posts: {},
    character: "Hulk",
    loadInfo: false,
    notFound: false,
    isInfo: false,
    noDesc: false
  },
  
  methods: {
    callAPI(){
      this.isInfo = false;
      axios.get(`https://gateway.marvel.com/v1/public/characters`,{
        params: {
          apikey: "3d59dd3b828c6400b39fba42bc21007e",
          ts: "1618940257",
          hash: "1cef5f39390013e91ed88afc14484353",
          name: this.character
        }
      })
      .then(response => {
        if(response.data.data.total == 0) {
          
          this.notFound = true
          setTimeout(()=>{ 
            this.notFound = false 
          }, 2000);
          
        } else {
          
          if (response.data.data.results[0].description == '') {
            this.noDesc = true
          } else {
            this.noDesc = false
          }
          
          this.posts = response.data
          this.loadInfo = true
          
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  
  mounted(){
    this.callAPI();
  }
})

Vue.config.devtools = false
