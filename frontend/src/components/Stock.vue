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
            <b-tab title="관심종목" active>
              <b-table striped hover
                       :items="favorites"
                       :fields="favorites_fields"
                       :current-page="currentPage"
                       :per-page="perPage">
                        <template slot="상세보기" slot-scope="row">
                         <b-button size="sm" v-on:click="'/detail/:stockId'" 
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
                           <b-button size="sm" v-on:click="'detail/:stockId'" 
                                     class="mr-2" variant="info">
                                보기
                           </b-button>
                          </template>
                          <template slot="favorites" slot-scope="row"> 
                           <b-button size="sm" class="mr-2" @click="showAlert" variant="info">
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
      dismissCountDown: 0
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
      this.$http.get('/api/stock/:userId')
      .then((res) => {
        console.log('Response Data: ' + res.data)
        this.favorites = res.data
        this.favoritesRows = this.favorites.length
        this.totalRows = this.favorites.length
        console.log("stock: " + this.stock)
      }).catch((err) => [
        console.log(err)
      ])
    },
    addFavorites() {
      this.$http.post('/api/stock/:userId', {
        id
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