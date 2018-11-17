<template>
    <div class="detail">
     <h1>여긴 Detail 페이지임니당~ㅎ</h1>
     <br><br>
     <b-table striped hover
         :items="detail_items"
         :fields="detial_fields">
    </b-table>
    <br><br>
    <img src="@/assets/exgraph.png" 
         width="1300dp" height="500dp" style="margin-left:250px"/>

    </div>
</template>

<script>
let detail_items = [
  { 주식명: "혁준이", 시가: 7, 고가: 777, 저가: 444, 종가: 789, 거래량: 777777 }
];

export default {
  name: "App",
  data() {
    return {
      detail_fields: ["주식명", "시가", "고가", "저가", "종가", "거래량"],
      detail_items: detail_items
    };
  },
  methods: {
    getStockDetail() {},
    showAlert() {}
  }
};
</script>
