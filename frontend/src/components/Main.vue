<template>
  <div class="main">
    <div style="margin-top:50px">
      <b-img width="300" height="100" center src="https://i.imgur.com/mznWiTz.png" alt="center image" />
    </div>
    <div>
      <b-card-group deck style="margin:auto">
        <b-card class="text-center"
                style="margin-left:auto;margin-right:100px"
                text-variant="black"
                img-src="https://i.imgur.com/z4oSWVR.png"
                img-alt="Card image"
                img-top>
          <b-button href="/stock">등락 예측</b-button>
        </b-card>
        <b-card class="text-center"
                text-variant="black"
                style="margin-right:auto;"
                img-src="https://i.imgur.com/J64Eb1w.png"
                img-alt="Card image"
                img-top>
          <b-button href="/money" text-variant="black">종목 추천</b-button>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style>
.main{
  min-height: 100%;
  margin-bottom: auto;
}
.text-center{
  border-width: 1px;
  border-color: lightgray;
  margin-top: 50px;
  max-width: 25rem;
}
</style>
