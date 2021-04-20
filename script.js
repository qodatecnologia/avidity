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
          apikey: "a5837db97d72016c81a7a776f4240db9",
          ts: "1",
          hash: "56e8c7c3ce1e8b6fbf21380cb44d5e0d",
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