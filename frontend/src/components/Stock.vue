<template>
    <div class='Stock'>
      <h1>종목 추천</h1><br><br>
        <input class='searchbar' type="text" v-on:input="search = $event.target.value"  placeholder="  주식명 입력"/>
        <b-alert :show="dismissCountDown"
             dismissible
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
          <p>즐겨찾기에 추가되었습니다.</p>
        </b-alert>
        <b-tabs>
            <b-tab title="관심 종목" border=true v-on:click="getFavoritesList" active>
            <div class="tables">
             <b-table striped hover stcked="md"
                      :items="favorFilteredList"
                      :fields="favorites_fields"
                      :current-page="currentPage"
                      :per-page="perPage">
                       <template slot="detail" slot-scope="row">
                        <b-button size="sm" class="btn1"
                                  @click="pushDetails(favorFilteredList[row.index].company)">
                             보기
                        </b-button>
                       </template>
                       <template slot="delete" slot-scope="row"> 
                          <b-button size="sm" class="btn1"  
                                     @click="deleteFavorites(favorFilteredList[row.index].company)">
                               삭제
                          </b-button>
                       </template>
             </b-table>
             </div>
            </b-tab>

            <b-tab title="전체 종목" border=true v-on:click="getStockList" active>
              <div class="tables">
                <b-table striped hover
                         :items="stockFilteredList"
                         :fields="stock_fields"
                         :current-page="currentPage"
                         :per-page="perPage"> 
                          <template slot="detail" slot-scope="row">
                           <b-button size="sm" v-on:click="'#'" class="btn1" variant="info"
                                     @click="pushDetails(stockFilteredList[row.index].company)">
                                보기
                           </b-button>
                          </template>
                          <template slot="favorites" slot-scope="row"> 
                           <b-button size="sm" class="btn1" variant="info" 
                                      @click="pushFavorites(stockFilteredList[row.index].company)">
                                추가
                           </b-button>
                          </template>
                </b-table>
              </div>
            </b-tab>

        </b-tabs> 
         <b-row class="paging">
            <b-col md="6" class="page">
             <b-pagination list-style="color: black"
               :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
         </b-row>
    </div>
</template>
<script>
import { store } from '../store/store'

export default {
  name: "App",
  data() {
    return {
      favorites_fields: ["company", "open", "close", "high", "low", "volume", "detail", "delete"],
      stock_fields: ["company", "open", "close", "high", "low", "volume", "detail", "favorites"],
      favorites: [],
      stock: [],
      favoritesRows: 0,
      stockRows: 0,
      totalRows: 0,
      currentPage: 1,
      perPage: 9,
      dismissSecs: 1,
      dismissCountDown: 0,
      id: store.getters.id,
      search: ""
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
      this.$http.post('/api/stock/favorites', {
        userId: this.id
      })
      .then((res) => {
        for(var i = 0; i < res.data.length; i++){
            let name = res.data[i].company
            let num = -1
            console.log('Response Data: ' + name)
            for(var j = 0; j < this.stock.length; j++){
              //즐겨찾는 회사 index찾기
              num = this.stock[j].company.indexOf(name)
              if (num != -1) {//있으면 favorites배열에 회사 정보 넣기
                console.log(j); 
                this.favorites.push(this.stock[ j ])
                break;
              }
            }
            this.favoritesRows = this.favorites.length
            this.totalRows = this.favorites.length
          }
        }).catch((err) => [
        console.log(err)
      ])
    },
    deleteFavorites(company){
      console.log(company)

      this.$http.post('/api/stock/deleteFavorites', {
        userId: this.id,
        company: company
      })
      .then((res) => {
        console.log(res.status)
        this.getFavoritesList()
      }).catch((err) => [
        console.log(err)
      ])
    },
    pushFavorites(company) {
      //즐겨찾기 추가 알람
      this.dismissCountDown = this.dismissSecs;
  
      console.log(company)

      this.$http.post('/api/stock/addFavorites', {
        userId: this.id,
        company: company
      })
      .then((res) => {
        console.log(res.status)
      }).catch((err) => [
        console.log(err)
      ])
    },
    //동적라우팅
    pushDetails(company){
      //console.log(this.stock[index].company)
      this.$router.push({
        name: 'Detail',
        params: {
          company: company 
        }
      }
      )
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  computed: {
    stockFilteredList: function() {
      return this.stock.filter(item => {
        //console.log('필터들어옴')
        //console.log(item.company)
        if( item.company.includes(this.search) ){
          //console.log(this.search)
          console.log(item.company.includes(this.search))
          return {
            company: item.company.includes(this.search)
          }
        }
      });
    },
    favorFilteredList: function() {
      return this.favorites.filter(item => {
        //console.log('필터들어옴')
        //console.log(item.company)
        if( item.company.includes(this.search) ){
          //console.log(this.search)
          console.log(item.company.includes(this.search))
          return {
            company: item.company.includes(this.search)
          }
        }
      });
    }
  }
};
</script>

<style>
.paging{
  padding-left:550px;
  padding-right:550px;
  padding-top:15px;
}
.Stock{
  min-height:100%;
  padding:250px;
  padding-right:300px;
  padding-top:75px;
  text-align: center;
}
.searchbar{
  width: 400px; 
  height :40px;
  border-width: 1px;
  border-color :lightgrey;
}
.btn1{
  background-color: black;
}
</style>