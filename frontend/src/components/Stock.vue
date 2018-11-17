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
                       :items="like_items"
                       :fields="like_fields"
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
                         :items="total_items"
                         :fields="total_fields"
                         :current-page="currentPage"
                         :per-page="perPage">
                          <template slot="상세보기" slot-scope="row">
                           <b-button size="sm" v-on:click="'detail/:stockId'" 
                                     class="mr-2" variant="info">
                                보기
                           </b-button>
                          </template>
                          <template slot="즐겨찾기" slot-scope="row"> 
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
let like_items = [];
let total_items = [];

export default {
  name: "App",
  data() {
    return {
      like_fields: ["주식명", "시가", "종가", "고가", "저가", "거래량", "상세보기"],
      total_fields: ["주식명", "시가", "종가", "고가", "저가", "거래량", "상세보기", "즐겨찾기"],
      like_items: like_items,
      total_items: total_items,
      likeRows: like_items.length,
      totalRows: total_items.length,
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
        total_items = res.data
        console.log("Item: " + total_items)
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