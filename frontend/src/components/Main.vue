<template>
  <div class="main">

    <b-container class="load-page">
      <b-row align-h="around">
          <b-col cols="4">
            <b-card class="text-center"
                    text-variant="black"
                    img-src="https://i.imgur.com/z4oSWVR.png"
                    img-alt="Card image"
                    img-top>
              <b-button href="/stock">등락 예측</b-button>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card class="text-center"
                    text-variant="black"
                    img-src="https://i.imgur.com/J64Eb1w.png"
                    img-alt="Card image"
                    img-top>
              <b-button href="/money" text-variant="black">종목 추천</b-button>
            </b-card>
          </b-col>
      </b-row>
    </b-container>


  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style>
.text-center{
  border-width: 1px;
  border-color: gray;
  margin-top: 50px;
  margin-bottom: 200px;
}
</style>
