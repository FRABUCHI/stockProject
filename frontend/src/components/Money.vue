<template>
  <div class="Money">
    <h1>{{ msg }}</h1>
    <h2>금액 설정</h2>
    <b-container class="bv-example-row">
    <b-row>
        <b-col cols="4">
          <b-form-radio-group id="btnradios2"
                          buttons
                          button-variant="outline-primary"
                          size="lg"
                          v-model="numselected"
                          :options="numoptions"
                          name="radioBtnOutline">
          </b-form-radio-group>
        </b-col>
        <b-col cols="5"><b-form-select v-model="moneyselected" :options="moneyoptions" class="mb-3" />
    <div>
      <!--Selected: <strong>{{ moneyselected }}
        </strong>-->
        </div>
    </b-col>
        <b-col cols="2">
          <b-button size="lg"  >검색</b-button>
        </b-col>
    </b-row>
</b-container>
     <b-table striped hover
                         :items="stockList2"
                         :fields="fields">
                          <template slot="상세보기" slot-scope="row">
                           <b-button size="sm" v-on:click="'/detail/:stockId'" class="mr-2">
                                보기
                           </b-button>
                          </template>
                </b-table>

  <div v-for="item in stockList" v-bind:data="item" v-bind:key="item.id">
    {{item.title}}

  </div>

  </div>
</template>

<script>
export default {
  name: 'Money',
  data () {
    return {
      msg: 'This page is money',
      numselected: 'radio1',
      numoptions: [
        { text: '단일종목', value: 'radio1' },
        { text: '2개 종목', value: 'radio2' },
        { text: '3개 종목', value: 'radio3' }
      ],
      moneyselected: null,
      moneyoptions: [
        { value: null, text: '금액을 입력해주세요.' },
        { value: 'a', text: '0 ~ 100만원 미만' },
        { value: 'b', text: '100 ~ 200만원 미만' },
        { value: 'c', text: '200 ~ 300만원 미만' },
        { value: 'd', text: '300 ~ 400만원 미만' },
        { value: 'e', text: '400 ~ 500만원 미만' },
        { value: 'f', text: '500 ~ 600만원 미만' },
        { value: 'g', text: '600 ~ 700만원 미만' },
        { value: 'h', text: '700 ~ 800만원 미만' },
        { value: 'i', text: '800 ~ 900만원 미만' },
        {value: 'j', text: '900 ~ 1000만원 미만'}
      ],
      fields: ['주식명', '시가', '종가', '고가', '상세보기'],
      stockList: [
        {id: 0, title: '삼성전자'},
        {id: 1, title: '엘지전자'},
        {id: 2, title: '보시'}
      ],
      stockList2: [
        { 주식명: '삼성전자', 시가: 100, 종가: 300, 고가: 150},
        { 주식명: 'LG전자', 시가: 120, 종가: 340, 고가: 120},
        { 주식명: 'SK하이닉스', 시가: 130, 종가: 270, 고가: 200},
        { 주식명: '아주대', 시가: 105, 종가: 500, 고가: 720},
        { 주식명: 'Tonez', 시가: 111, 종가: 222, 고가: 333}
      ]
    }
  }
  /* 
  method: {
  //  getStockList() {
  //    this.$http.get('/api/stock')
  //    .then((res) => {
  //      this.stockList = res.data
  //    })
  //  }
  //} 
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mb-3{
  height: 3rem;
}
</style>
