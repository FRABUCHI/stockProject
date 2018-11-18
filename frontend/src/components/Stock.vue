<template>
    <div class='Stock'>
      <h1>여긴 Stock 페이지입니당~~</h1>
        <b-nav-form>
           <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
           <b-button size="sm" class="my-2 my-sm-0" type="submit">검색</b-button>
        </b-nav-form>
        <b-alert :show="dismissCountDown"
             dismissible
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
          <p>즐겨찾기에 추가되었습니다.</p>
        </b-alert>
        <b-tabs>
            <b-tab title="관심종목" v-on:click="getFavoritesList" active>
              <b-table striped hover
                       :items="favorites"
                       :fields="favorites_fields"
                       :current-page="currentPage"
                       :per-page="perPage">
                        <template slot="detail" slot-scope="row">
                         <b-button size="sm" v-on:click="'#'" 
                                   variant="info" class="mr-2">
                              보기
                         </b-button>
                        </template>
              </b-table>
            </b-tab>
            <b-tab title="전체종목" v-on:click="getStockList" active>
                <b-table striped hover
                         :items="stock"
                         :fields="stock_fields"
                         :current-page="currentPage"
                         :per-page="perPage">
                          <template slot="detail" slot-scope="row">
                           <b-button size="sm" v-on:click="'#'" class="mr-2" variant="info">
                                보기
                           </b-button>
                          </template>
                          <template slot="favorites" slot-scope="row"> 
                           <b-button size="sm" class="mr-2"  
                           @click="addFavorites(row.index)" variant="info">
                                추가
                           </b-button>
                          </template>
                </b-table>
            </b-tab>
        </b-tabs>

         <b-row>
            <b-col md="6" class="my-1">
             <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
         </b-row>
    </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      favorites_fields: ["company", "open", "close", "high", "low", "volume", "detail"],
      stock_fields: ["company", "open", "close", "high", "low", "volume", "detail", "favorites"],
      favorites: [],
      stock: [],
      favoritesRows: 0,
      stockRows: 0,
      totalRows: 0,
      currentPage: 1,
      perPage: 3,
      dismissSecs: 1,
      dismissCountDown: 0,
      id: 'syl'
    };
  },
  methods: {
    getStockList() {
      this.$http.get('/api/stock/all')
      .then((res) => {
        console.log('Response Data: ' + res.data)
        this.stock = res.data
        this.stockRows = this.stock.length
        this.totalRows = this.stock.length
        console.log("stock: " + this.stock)
      }).catch((err) => [
        console.log(err)
      ])
    },
    getFavoritesList() {
      this.favorites = []
      this.favoritesRows = 0
      this.totalRows = 0
      this.$http.get('/api/stock/favorites', {
        id: this.id//유저아이디
      })
      .then((res) => {
        res.data.map((item)=>{
          for(var i = 0; i < item.id.length; i++){
            let name = item.id[i]
            let num = -1
            console.log('Response Data: ' + name)
            for(var j = 0; j < 4; j++){
              num = this.stock[j].company.indexOf(name)
              if (num != -1) {
                console.log(j); 
                this.favorites.push(this.stock[ j ])
                break;
              }
            }
            this.favoritesRows = this.favorites.length
            this.totalRows = this.favorites.length
          }
        })
      }).catch((err) => [
        console.log(err)
      ])
    },
    addFavorites(index) {
      console.log(this.stock[index].company)
      let company = this.stock[index].company
      this.$http.post('/api/stock/addFavorites', {
        userId: 'syl',
        company: company
      })
      .then((res) => {
        console.log(res.status)
      }).catch((err) => [
        console.log(err)
      ])
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>