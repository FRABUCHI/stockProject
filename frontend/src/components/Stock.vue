<template>
    <div class='stock'>
      <h1>종목 추천</h1><br><br>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
        <b-alert :show="dismissCountDown"
             dismissible
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
          <p>즐겨찾기에 추가되었습니다.</p>
        </b-alert>
        <b-tabs>
            <b-tab title="관심종목" v-on:click="getFavoritesList" active>
              <b-table striped hover stcked="md"
                       :items="favorites"
                       :fields="favorites_fields"
                       :current-page="currentPage"
                       :per-page="perPage"
                       :filter="filter"
                       @filtered="onFiltered">
                        <template slot="detail" slot-scope="row">
                         <b-button size="sm" variant="info" class="mr-2"
                                   @click="pushDetails(row.index)">
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
                           <b-button size="sm" v-on:click="'#'" class="mr-2" variant="info"
                                     @click="pushDetails(row.index)">
                                보기
                           </b-button>
                          </template>
                          <template slot="favorites" slot-scope="row"> 
                           <b-button size="sm" class="mr-2" variant="info" 
                                      @click="pushFavorites(row.index)">
                                추가
                           </b-button>
                          </template>
                </b-table>
            </b-tab>
        </b-tabs> 
         <b-row class="paging">
            <b-col md="6" class="page">
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
      stock_fields: [
        "company", "open", "close", "high", "low", "volume", "detail", "favorites"
      ],
      favorites: [],
      stock: [],
      favoritesRows: 0,
      stockRows: 0,
      totalRows: 0,
      currentPage: 1,
      perPage: 7,
      dismissSecs: 1,
      dismissCountDown: 0,
      id:  'hj',
      filter: null,
    };
  },
  methods: {
    getStockList() {
      console.log('겟스톡리스트')
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
    pushFavorites(index) {
      this.dismissCountDown = this.dismissSecs;
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
    //동적라우팅
    pushDetails(index){
      //console.log(this.stock[index].company)
      this.$router.push({
        name: 'Detail',
        params: { company : this.stock[index].company, 
                  open : this.stock[index].open,
                  close : this.stock[index].close,
                  high : this.stock[index].high,
                  low : this.stock[index].low,
                  volume : this.stock[index].volume
        }
      }
      )
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
};
</script>

<style>
.paging{
  padding-left:530px;
  padding-right:600px;
  padding-top:15px;
}
.stock{
  padding:250px;
  padding-right:300px;
  padding-top:75px;
  text-align: center;
}
</style>