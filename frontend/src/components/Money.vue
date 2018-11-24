<template>
  <div class="Money">
    <h2 style="text-align:center;height:60px">주식 추천</h2>

    <b-container class="bv-example-row">
      <b-row>
          <b-col cols>
            <b-form-radio-group id="btnradios"
                            buttons
                            button-variant="outline-dark"
                            size="lg"
                            v-model="numselected"
                            :options="numoptions"
                            name="radioBtnOutline" />
          </b-col>
        <b-col cols><b-form-select v-model="moneyselected" :options="moneyoptions" class="mb-3" />
        </b-col>

        <b-col cols>
          <b-button size="lg" v-on:click="runAnaliysis()" >검색</b-button>
        </b-col>
      </b-row>
    </b-container>

    <div v-if="viewtype === 'A'">
      <br>
      <h4 style="height:120px;text-align:center">Mr.Stock이 데이터를 분석 중 입니다.</h4>
      <center>
      <ring-loader :loading="loading" :color="color" :size="size"></ring-loader>
      </center>
    </div>

    <div v-else-if="viewtype === 'B'">
      <br>

      <div style="margin-left: 150px">
        <b-card-group deck>
            <b-card img-src="https://i.imgur.com/GDb8E5Q.jpg"
                    img-alt="Card image"
                    img-top
                    style="max-width: 20rem;">
                <div class="card-text">
                  <b-list-group>
                    <b-list-group-item href="#"><h5>총 예상이익 : {{testList[0].totalprofit}}원</h5></b-list-group-item>
                    <b-list-group-item href="#"><h5>총 구매비용 : {{testList[0].totalcost}}원</h5></b-list-group-item>
                    <div v-for="j in testList[0].data" v-bind:data="j" v-bind:key="j.company">
                      <b-list-group-item href="#"><h5>{{j.company}} :&nbsp; {{j.stockNum}} 주</h5></b-list-group-item>
                    </div>
                  </b-list-group>
              </div>
            </b-card>

            <b-card v-if="testList.length>1" img-src="https://i.imgur.com/XLpKK1m.jpg"
                  img-alt="Card image"
                  img-top
                  style="max-width: 20rem;">
              <div class="card-text">
                  <b-list-group>
                    <b-list-group-item href="#"><h5>총 예상이익 : {{testList[1].totalprofit}}원</h5></b-list-group-item>
                    <b-list-group-item href="#"><h5>총 구매비용 : {{testList[1].totalcost}}원</h5></b-list-group-item>
                    <div v-for="j in testList[1].data" v-bind:data="j" v-bind:key="j.company">
                      <b-list-group-item href="#"><h5>{{j.company}} :&nbsp; {{j.stockNum}} 주</h5></b-list-group-item>
                    </div>
                  </b-list-group>
              </div>
             </b-card>


            <b-card v-if="testList.length>2" img-src="https://i.imgur.com/PZTP8H7.jpg"
                  img-alt="Card image"
                  img-top
                  style="max-width: 20rem;">
              <div class="card-text">
                  <b-list-group>
                    <b-list-group-item href="#"><h5>총 예상이익 : {{testList[2].totalprofit}}원</h5></b-list-group-item>
                    <b-list-group-item href="#"><h5>총 구매비용 : {{testList[2].totalcost}}원</h5></b-list-group-item>
                    <div v-for="j in testList[2].data" v-bind:data="j" v-bind:key="j.company">
                      <b-list-group-item href="#"><h5>{{j.company}} :&nbsp; {{j.stockNum}} 주</h5></b-list-group-item>
                    </div>
                  </b-list-group>
              </div>
             </b-card>

         </b-card-group>
      <br>
      <b-table style=  striped hover
                           :items="showList"
                           :fields="fields">
                            <template slot="상세보기" slot-scope="row">
                             <b-button size="sm" v-on:click="'/detail/:stockId'" class="mr-2">
                                  보기
                             </b-button>
                            </template>
      </b-table>
      </div>

    </div>

    <div style="padding-bottom: 160px" v-else>
      <br>
      <h5 style="text-align:center;line-height:35px">종목수, 금액을 결정하고 검색버튼을 눌러주세요.<br>
      (단, 조건에 해당 하는 조건의 상한가 상품이 없을 경우 분석 서비스를 제공하지 않습니다.) </h5>
    </div>

    <!--

    -->

  </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/RingLoader.vue'
export default {
  name: 'Money',
  components : {
    RingLoader
  },
  data () {
    return {
      isrewite: false,
      viewtype: '',
      loading: '',
      color: '',
      size: '150px',
      msg: 'This page is money',
      recomandNumber: 0,
      numselected: 1,
      numoptions: [
        { text: '단일종목', value: 1},
        { text: '2개 종목', value: 2 },
        { text: '3개 종목', value: 3 }
      ],
      moneyselected: null,
      moneyoptions: [
        { value: null, text: '금액을 입력해주세요.' },
        { value: 1000000, text: '0 ~ 100만원 미만' },
        { value: 2000000, text: '100 ~ 200만원 미만' },
        { value: 3000000, text: '200 ~ 300만원 미만' },
        { value: 4000000, text: '300 ~ 400만원 미만' },
        { value: 5000000, text: '400 ~ 500만원 미만' },
        { value: 6000000, text: '500 ~ 600만원 미만' },
        { value: 7000000, text: '600 ~ 700만원 미만' },
        { value: 8000000, text: '700 ~ 800만원 미만' },
        { value: 9000000, text: '800 ~ 900만원 미만' },
        {value: 10000000, text: '900 ~ 1000만원 미만'}
      ],
      fields: ['company', 'open', 'close', 'high', '상세보기'],
      stockUpList: [
        // 상한가 주식 목록
        { company: '삼성전자', present_price: 290000, predict_price: 320000},
        { company: 'LG전자', present_price: 33500, predict_price: 36500},
        { company: 'SK하이닉스', present_price: 26800, predict_price: 29000},
        { company: '아주대', present_price: 48000, predict_price: 62000},
        { company: 'Tonez', present_price: 21800, predict_price: 33300},
        { company: 'LG화학', present_price: 25200, predict_price: 28300},
        { company: '현대자동차', present_price: 32200, predict_price: 40300},
      ],
      stockList: [
        { company: '삼성전자', open: 100, close: 340000, high: 3500},
        { company: 'LG전자', open: 120, close: 34000, high: 3600},
        { company: 'SK하이닉스', open: 130, close: 27000, high: 2900},
        { company: '아주대', open: 105, close: 50000, high: 7200},
        { company: 'Tonez', open: 111, close: 22200, high: 3330},
        { company: 'LG화학', open: 142, close: 26200, high: 3830},
        { company: '현대자동차', open: 152, close: 32400, high: 4030}
      ],
      testList: [{totalprofit: 3000, data: [{ company: '삼성전자', open: 100, close: 340000, high: 3500},
        { company: 'LG전자', open: 120, close: 34000, high: 3600},
        { company: 'SK하이닉스', open: 130, close: 27000, high: 2900}]}],
      showList:[],
      recomandList: [],
      resultList:[]
    }
  },
  created() {
    //회사 정보 다 받아오기
    this.$http.get('/api/stock/all')
      .then((res) => {
        console.log('Response Data: ' + res.data)
        this.stockList = res.data
        console.log("stock: " + this.stock)
      }).catch((err) => [
        console.log(err)
      ]),

    //예측가격 정보 다 받아오기
    this.$http.get(`/api/money`)
      .then(res => {
        console.log(res.data);
        this.stockUpList = res.data  
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    runAnaliysis(){
      this.showList = [];
      this.recomandList = [];
      this.resultList = [];
      this.testList = [];
      this.recomandNumber=this.numselected;
      if(this.isrewite == false){
        this.rewriteStockUpList();
      }
      if(this.moneyselected == null){
        alert('금액을 선택해주세요.');
      }
      else if(this.recomandNumber>this.stockUpList.length){
        alert('상승주의 정보가 부족하여 종목추천이 불가능합니다.');
      }
      else{
        this.viewtype = 'A';
        this.recomandList = [];
        this.showList = [];

        this.findReconmandStock();
        this.getRecomand();
        this.setShowList();
        setTimeout(()=> {this.viewtype = 'B';}, 2000);
      }
      // predict에서 상한가 6종목 먼저 뽑음.
      // 1개2개3개 알고리즘돌림.
      // stockUpList.company, predict.price[0]
    },
    rewriteStockUpList(){
      for(var i in this.stockUpList){
        for(var j in this.stockList){
          if(this.stockUpList[i].company==this.stockList[j].company){
            this.stockUpList[i].predict_price += (this.stockList[j].close-this.stockUpList[i].present_price);
            this.stockUpList[i].present_price += (this.stockList[j].close-this.stockUpList[i].present_price);
            break;
          }
        }
      }
      this.isrewite = true;
    }
    ,
    findReconmandStock(){
      for(var i in this.stockUpList){
        if(this.stockUpList[i].present_price<(this.moneyselected/this.recomandNumber)){
          var moneyLimit = this.moneyselected/this.recomandNumber;
          var profit = this.stockUpList[i].predict_price-this.stockUpList[i].present_price;
          var stockNum = 0;
          if(this.recomandNumber!=1){
              moneyLimit += this.moneyselected/10;
          }
          while(stockNum*this.stockUpList[i].present_price<moneyLimit){
            stockNum++;
          }
          stockNum--;
          if(this.recomandList.length<6){
            this.recomandList.push({company: this.stockUpList[i].company, stockNum: stockNum, preditprofit:profit*stockNum,
            cost: this.stockUpList[i].present_price*stockNum, close: this.stockUpList[i].present_price, predict_price: this.stockUpList[i].predict_price});
          }
          else{
            var minIndex = 0;
            var minProfit=this.recomandList[0].preditprofit;
            for(var k in this.recomandList){
              if(minProfit > this.recomandList[k].preditprofit){
                minProfit = this.recomandList[k].preditprofit;
                minIndex = k;
              }
            }
            if(profit*stockNum>minProfit){
              this.recomandList[k].company = this.stockUpList[i].company;
              this.recomandList[k].stockNum = stockNum;
              this.recomandList[k].preditprofit = profit*stockNum;
              this.recomandList[k].cost =this.stockUpList[i].present_price*stockNum;
              this.recomandList[k].close = this.stockUpList[i].present_price;
              this.recomandList[k].predict_price = this.stockUpList[i].predict_price;
            }
          }
        }
      }
    },
    getRecomand(){
      var gridyNum = 0;
      var gridyNum_two = 0;
      var balanceNum = 0;
      var numberResultList = 3;
      var tempdata = [];
      this.sortRecomandList();
      if(this.recomandNumber==1){
        if(this.recomandList.length<3){
          numberResultList=this.recomandList.length;
        }
        for(var i=0; i<numberResultList; i++){
          this.testList.push({totalprofit: this.numberWithCommas(this.recomandList[i].preditprofit),totalcost: this.numberWithCommas(this.recomandList[i].cost), data: []});
          this.testList[i].data.push(this.recomandList[i]);
        }
      }
      else{
        if(this.recomandNumber==2){
          for(var i=0; i<this.recomandList.length-1;i++){
            for(var j=i+1; j<this.recomandList.length; j++){
              if(this.recomandList[i].preditprofit>this.recomandList[j].preditprofit){
                gridyNum = i;
                balanceNum = j;
              }
              else{
                balanceNum = i;
                gridyNum = j;
              }
              var balance = this.moneyselected - this.recomandList[gridyNum].cost;
              var stockNum = 0;
              while(this.recomandList[balanceNum].close*stockNum<balance){
                stockNum++;
              }
              stockNum--;
              var balancedata = {company: this.recomandList[balanceNum].company, stockNum: stockNum, preditprofit:this.recomandList[balanceNum].predict_price*stockNum,
              cost: this.recomandList[balanceNum].close*stockNum, close: this.recomandList[balanceNum].present_price};
              tempdata.push({totalprofit: this.recomandList[gridyNum].preditprofit+balancedata.preditprofit,totalcost: this.recomandList[gridyNum].cost+balancedata.cost, data: []});
              tempdata[tempdata.length-1].data.push(this.recomandList[gridyNum]);
              tempdata[tempdata.length-1].data.push(balancedata);
            }
          }
        }
        else if(this.recomandNumber==3){
          for(var i=0; i<this.recomandList.length-2;i++){
            for(var j=i+1; j<this.recomandList.length-1; j++){
              for(var k =j+1; k<this.recomandList.length;k++){
                if(this.recomandList[i].preditprofit<this.recomandList[j].preditprofit&&this.recomandList[i].preditprofit<this.recomandList[k].preditprofit){
                  gridyNum = j;
                  gridyNum_two = k;
                  balanceNum = i;
                }
                else if(this.recomandList[j].preditprofit<this.recomandList[i].preditprofit&&this.recomandList[j].preditprofit<this.recomandList[k].preditprofit){
                  gridyNum = i;
                  gridyNum_two = k;
                  balanceNum = j;
                }
                else{
                  gridyNum = i;
                  gridyNum_two = j;
                  balanceNum = k;
                }
                var balance = this.moneyselected - this.recomandList[gridyNum].cost - this.recomandList[gridyNum_two].cost;
                var stockNum = 0;
                while(this.recomandList[balanceNum].close*stockNum<balance){
                  stockNum++;
                }
                stockNum--;
                var balancedata = {company: this.recomandList[balanceNum].company, stockNum: stockNum, preditprofit:this.recomandList[balanceNum].predict_price*stockNum,
                cost: this.recomandList[balanceNum].close*stockNum, close: this.recomandList[balanceNum].present_price};
                tempdata.push({totalprofit: this.recomandList[gridyNum].preditprofit+this.recomandList[gridyNum_two].preditprofit+balancedata.preditprofit,
                totalcost: this.recomandList[gridyNum].cost+this.recomandList[gridyNum_two].cost+balancedata.cost, data: []});
                tempdata[tempdata.length-1].data.push(this.recomandList[gridyNum]);
                tempdata[tempdata.length-1].data.push(this.recomandList[gridyNum_two]);
                tempdata[tempdata.length-1].data.push(balancedata);
              }
            }
          }
        }
        var temp;
        for(var i=0; i<tempdata.length-1; i++) {
          for(var j=0; j<tempdata.length-1-i;j++){
            if(tempdata[j].totalprofit<tempdata[j+1].totalprofit){
             temp = tempdata[j+1];
             tempdata[j+1] = tempdata[j];
             tempdata[j] = temp;
            }
          }
        }
        if(tempdata.length<3){
          numberResultList=tempdata.length;
        }
        for(var i=0; i<numberResultList;i++){
            this.testList[i] = tempdata[i];
            this.testList[i].totalprofit = this.numberWithCommas(this.testList[i].totalprofit);
            this.testList[i].totalcost = this.numberWithCommas(this.testList[i].totalcost);
        }
      }
    },    
    setShowList(){
      for(var i in this.recomandList){
        for(var j in this.stockList){
          if(this.recomandList[i].company==this.stockList[j].company){
            this.showList.push(this.stockList[j]);
          }
        }
      }
    },
    numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getStockList(){ //페이지들어오자마자
      this.$http.get('/api/stock')
      .then((res) => {
        console.log('Response Data: ' + res.data)
        this.stock = res.data
        console.log("stock: " + this.stock)
      }).catch((err) => [
        console.log(err)
      ])
    },
    sortRecomandList(){
      var temp;
      for(var i=0; i<this.recomandList.length-1; i++) {
        for(var j=0; j<this.recomandList.length-1-i;j++){
          if(this.recomandList[j].preditprofit<this.recomandList[j+1].preditprofit){
           temp = this.recomandList[j+1];
           this.recomandList[j+1] = this.recomandList[j];
           this.recomandList[j] = temp;
          }
        }
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mb-3{
  height: 3rem;
}
</style>
<style>
.Money{
  padding:90px;
}
</style>

