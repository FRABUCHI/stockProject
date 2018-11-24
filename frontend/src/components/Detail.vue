<template>
    <div class="detail">
     <br><h1>Detail 페이지임니당~ㅎ</h1>
     <br><br>
     <div class="table">
     <b-alert show variant="primary"> 주식명: {{" " + company}}</b-alert> 
     <b-table striped hover
              :fields="detail_fields"
              :items="stock">
     </b-table>
     </div>
    <br><br>
    <div style="width:800px; height:400px; border:1px solid red; float:left; margin-left:80px">
      <img src="@/assets/exgraph.png" align="center" style="margin-left: auto; margin-right: auto; display: block;"/>
    </div>
    <div style="width:800px;height:400px; float:right; margin-right:80px">
      <b-list-group>
        <br>
       <b-list-group-item class="d-flex justify-content-between align-items-center">
         <strong>1일 후 >>>>>>>> {{" "+stockUp.predict_price+ " 원"}}</strong> 
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
  name: "Detail",
  data() {
    return {
      detail_fields: ["open", "close", "high", "low", "volume"],
      //field와 data type 맞춤(due to table)
      stock: [{open: '', close: '', high: '', low: '', volume: ''}],
      stockUp: [],
      company: "", //db로부터 company 받아옴
      //cost: {
      //  day: ""
      //  //month:'2',
      //  //half_year: '3',
      //  //year: '4'
      //}
      cost: ''
    };
  },
  created() {
    this.company = this.$route.params.company;
    
    //한개 회사 정보 가져오기
    this.$http.get(`/api/stock/${this.company}`)
      .then((res) => {
        console.log(`${this.company} 현재 정보`)
        console.log(res.data)
        this.stock[0].open = res.data.open
        this.stock[0].close = res.data.close
        this.stock[0].high = res.data.high
        this.stock[0].low = res.data.low
        this.stock[0].volume = res.data.volume
      }).catch((err) => [
        console.log(err)
      ])

    //한개 회사 예측 가격 가져오기
    this.$http.get(`/api/detail/${this.company}`)
      .then(res => {
        console.log(`${this.company} 예측 정보`)
        console.log(res.data);
        this.stockUp = res.data
        
        //오차수정작업
        let error = this.stock[0].close - this.stockUp.present_price;
        this.stockUp.present_price += error;
        this.stockUp.predict_price += error;
        
        console.log('오차가격')
        console.log(error)
        console.log('보정가격')
        console.log(this.stockUp.predict_price)
      })
      .catch(err => {
        console.log(err);
      });
  },

}
</script>

<style >
.table{
  width:80%;
  border-color:black;
  text-align: center;
}
</style>
