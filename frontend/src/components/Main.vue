<template>
  <div class="main">
    <h1>This is Main Page!!</h1>

    <b-container class="load-page">
      <b-row align-h="around">
          <b-col cols="4">
            <b-card class="text-center"
                    text-variant="black"
                    title="Stock"
                    sub-title="등락 예측">
              <b-button href="/stock">GO!!</b-button>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card class="text-center"
                    text-variant="black"
                    title="Money"
                    sub-title="종목 추천">
              <b-button href="/money">GO!</b-button>
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
