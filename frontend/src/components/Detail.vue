<template>
    <div class="detail">
     <br><h1>Detail 페이지임니당~ㅎ</h1>
     <br><br>
     <b-alert show variant="primary"> 주식명: {{" " + company}}</b-alert> 
     <b-table striped hover
         :items="stock"
         :fields="detail_fields">
    </b-table>
    <br><br>
    <div style="width:800px; height:400px; border:1px solid red; float:left; margin-left:80px">
      <img src="@/assets/exgraph.png" align="center" style="margin-left: auto; margin-right: auto; display: block;"/>
    </div>
    <div style="width:800px;height:400px; border:1px solid green; float:right; margin-right:80px">
      <b-list-group>
        <br>
       <b-list-group-item class="d-flex justify-content-between align-items-center">
         <strong>1일 후 >>>>>>>> {{" "+cost.day + " 원"}}</strong> 
       </b-list-group-item><br>
       <b-list-group-item class="d-flex justify-content-between align-items-center">
         <strong>한달 후 >>>>>>>> {{" "+cost.month + " 원"}}</strong>
       </b-list-group-item><br>
       <b-list-group-item class="d-flex justify-content-between align-items-center">
         <strong>6개월 후 >>>>>>>> {{" "+cost.half_year + " 원"}}</strong>
       </b-list-group-item><br>
       <b-list-group-item class="d-flex justify-content-between align-items-center">
         <strong>1년 후 >>>>>>>> {{" "+cost.year + " 원"}}</strong>
       </b-list-group-item>
     </b-list-group>
    </div>
    </div>
</template>

 
<script>
export default {

  created(){
    console.log(this.$route)
    this.company = this.$route.params.company
    this.stock[0].open = this.$route.params.open
    this.stock[0].close = this.$route.params.close
    this.stock[0].high = this.$route.params.high
    this.stock[0].low = this.$route.params.low
    this.stock[0].volume = this.$route.params.volume
  },

  name: "Detail",
  data() {
    return {
      detail_fields: ["open", "close", "high", "low", "volume"],
      //field와 data type 맞춤(due to table)
      stock: [
        { open: '', close: '', high: '', low: '', volume: ''}
      ],
      stockUp: [
        { open: '', close: '', high: '', low: '', volume: '',
                       predict: '', present: ''} 
      ],
      company : '',  //db로부터 company 받아옴
      cost : {
        day: '1', 
        month:'2', 
        half_year: '3', 
        year: '4' 
      },
    };
  },
  methods: {
    getStockDetail() {
      // 안불리는 이유좀(?)
      console.log('겟스톡디테일')
      this.$http.get(`/api/stock/one`,{
      }).then(res => {
        console.log(res.data) 
        console.log("stock: " + this.stock)
        //전달받은 stock - 원래stock 필드,present,predict,날짜별
        
        //날짜별 예측가격이 각각 넘어옴(오차있는)
        cost.day = this.stock.day;
        cost.month = this.stock.month;
        cost.half_year = this.stock.half_year;
        cost.year = this.year;

        //오차수정작업
        error = (this.stock[0].close - this.stock.present) 
        this.stock.predict += error
        this.stock.present += error
        cost.day += error
        cost.month += error
        cost.half_year += error
        cost.year += error

      }).catch(err => {
        console.log(err) 
      })
    },
  },
};
</script>

<style scoped>
.aligncenter {
    text-align: center;
}
.alignleft {
    text-align: left;
}
.alignright {
    text-align: right;
}
</style>
