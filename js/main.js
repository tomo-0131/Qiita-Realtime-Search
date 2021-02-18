const app = new Vue ({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    items: null,
    keyword: '' + '',
    message: ''
  },
  // 監視 インプット内の文字変化を監視する
  watch: {
    keyword: function(newKeyword, oldKeyword) {
      this.message ='Waiting for you to stop styping...'
      this.debouncedGetAnswer()
    }
  },
  created: function(){
    //this.keyword = 'JavaScript'
    //this.getAnswer()
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    getAnswer: function() {
      if(this.keyword === '') {
        this.items = null
        this.message = ''
        return
      }
      this.message = 'Loading...'
      let vm = this
      let params = { page: 1, per_page: 20, query: this.keyword }
      axios.get('https://qiita.com/api/v2/items', { params })
        .then(function(response){
          console.log(response)
          vm.items = response.data
        })
        .catch(function(error){
          vm.message = 'Error!' + error
        })
        .finally(function() {
          vm.message = ''
        })
    }
  }
})
