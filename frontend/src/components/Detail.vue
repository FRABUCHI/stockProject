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
         <strong>1일 후 >>>>>>>> {{" "+cost+ " 원"}}</strong> 
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
  name: "App",
  data() {
    return {
      detail_fields: ["open", "close", "high", "low", "volume"],
      //field와 data type 맞춤(due to table)
      company: "", //db로부터 company 받아옴
      stock: [{open: '', close: '', high: '', low: '', volume: ''}],
      stockUp: [],
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
    this.$http.get(`/api/stock/${this.company}`)
      .then((res) => {
        console.log(res.data)
        //this.stock = res.data
        console.log(this.stock)
        this.stock[0].open = res.data.open
        this.stock[0].close = res.data.close
        this.stock[0].high = res.data.high
        this.stock[0].low = res.data.low
        this.stock[0].volume = res.data.volume
      }).catch((err) => [
        console.log(err)
      ])

    this.$http.get(`/api/detail/${this.company}`)
      .then(res => {
        //console.log(res.data);
        this.stockUp = res.data

        //오차수정작업
        let error = this.stock.close - this.stockUp.present_price;
        console.log(this.stock.close)
        this.stockUp.present_price += error;
        this.stockUp.predict_price += error;
        console.log(error)
        
        console.log(this.stockUp.predict_price)
        this.cost = this.stockUp.predict_price;
        console.log(this.cost)
        //cost.month = this.stockUp.predict_month
        //cost.half_year = this.stockUp.predict_half_year
        //cost.year = this.stockUp.predict_year
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
