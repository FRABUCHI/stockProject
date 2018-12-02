<template>
    <div class="detail">
      <h1> 상세보기: {{"  "+company}}</h1>
      <hr align="center" style="border: solid 0.5px black; width: 40%;">
     <br>
     <div class="table">
     <b-table style="max-width: 50rem" striped hover
              :fields="detail_fields"
              :items="stock">
     </b-table>
     </div>
    <b-card
          style="max-width: 50rem;margin-top:70px;margin-bottom:100px;padding:10px;padding-top:10px;margin-left:auto;margin-right:auto"
          tag="article">
        <img :src="stockUp.url" align="center" style="margin-left: auto; margin-right: auto; display: block; width: 100%"/>
        <div style="font-size: 28px;font-weight: bold"> 예측 가격 : {{" "+stockUp.predict_price+ " 원"}}</div>
        <div style="font-size: 28px;font-weight: bold"> 오차율 : {{" "+stockUp.loss+" %"}}</div>
    </b-card>
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
        this.stock[0].close = res.data.close.replace(/\,/g,'');
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
        this.stockUp.predict_price = Math.round(this.stock[0].close*(this.stockUp.predict_price/this.stockUp.present_price));
        this.stockUp.predict_price = this.numberWithCommas(this.stockUp.predict_price);
        this.stockUp.present_price = this.stock[0].close;
        this.stockUp.loss = Math.round(this.stockUp.loss*100)

        console.log('보정가격')
        console.log(this.stockUp.predict_price)
      })
      .catch(err => {
        console.log(err);
      });

      //
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>

<style >
.detail{
  margin-top: 50px;
  min-height: 100%;
}
.table{
  width:80%;
  border-color:black;
  text-align: center;
}
.detail{
  text-align: center;
  min-height:100%;
}
.table{
  margin-left:auto;
  margin-right:auto;
}
.bottomset{
  margin-left: auto;
  margin-right: auto;
}
</style>
