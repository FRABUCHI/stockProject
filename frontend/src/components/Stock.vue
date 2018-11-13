<template>
    <div class='Stock'>
        <b-nav-form>
           <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
           <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-tabs>
            <b-tab title="관심종목" active>
                <b-table striped hover
                         :items="like_items"
                         :fields="like_fields"
                         :current-page="currentPage"
                         :per-page="perPage">
                          <template slot="상세보기" slot-scope="row">
                           <b-button size="sm" v-on:click="'/detail/:stockId'" class="mr-2">
                                보기
                           </b-button>
                          </template>
                </b-table>
            </b-tab>
            <b-tab title="전체종목" active>
                <b-table striped hover
                         :items="total_items"
                         :fields="total_fields"
                         :current-page="currentPage"
                         :per-page="perPage">
                          <template slot="상세보기" slot-scope="row">
                           <b-button size="sm" v-on:click="'detail/:stockId'" class="mr-2">
                                보기
                           </b-button>
                          </template>
                          <template slot="즐겨찾기" slot-scope="row">
                           <b-button size="sm" v-on:click="'/detail/:stockId'" class="mr-2">
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
let like_items = [
  { 주식명: "삼성전자", 시가: 100, 종가: 300, 고가: 150 },
  { 주식명: "LG전자", 시가: 120, 종가: 340, 고가: 120 },
  { 주식명: "SK하이닉스", 시가: 130, 종가: 270, 고가: 200 },
  { 주식명: "아주대", 시가: 105, 종가: 500, 고가: 720 },
  { 주식명: "Tonez", 시가: 111, 종가: 222, 고가: 333 }
];
let total_items = [
  { 주식명: "A", 시가: 100, 종가: 300, 고가: 150 },
  { 주식명: "B", 시가: 120, 종가: 340, 고가: 120 },
  { 주식명: "C", 시가: 130, 종가: 270, 고가: 200 },
  { 주식명: "D", 시가: 105, 종가: 500, 고가: 720 },
  { 주식명: "E", 시가: 111, 종가: 222, 고가: 333 }
];

export default {
  name: "App",
  data() {
    return {
      like_fields: ["주식명", "시가", "종가", "고가", "상세보기"],
      total_fields: ["주식명", "시가", "종가", "고가", "상세보기", "즐겨찾기"],
      like_items: like_items,
      total_items: total_items,
      currentPage: 1,
      perPage: 3
    };
  },
  method: {
    getStockDetail() {}
  }
};
</script>