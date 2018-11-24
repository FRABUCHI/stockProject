<template>
  <div id="app">
      <b-navbar style="padding-left:50px" toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand style="font-size: 2rem" href="/">
       <img src="https://i.imgur.com/LVjrCdt.png">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="ml-auto">
          <!--버튼-->
          <b-navbar-nav>
            <b-nav-item href="/">메인</b-nav-item>
            <b-nav-item v-if="!loggedIn" href="/login">로그인</b-nav-item>
            <b-nav-item v-if="!loggedIn" href="/signup">회원가입</b-nav-item>
            <b-nav-item v-if="loggedIn" href="/logout">로그아웃</b-nav-item>
          </b-navbar-nav>

          <!--드롭다운-->
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>마이페이지</em>
            </template>
            <b-dropdown-item href="/main/profile">프로필</b-dropdown-item>
            <b-dropdown-item href="/main/userlist">유저 리스트</b-dropdown-item>
            <b-dropdown-item href="/main/settings">설정</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    
    <router-view/>

    <footer>
      <section class= "footer">
        <div class = "inner">
        개발자: 이소연, 임문수, 전혁준&nbsp;&nbsp;대표번호: 010-5040-9375<br>
        주소: 경기도 수원시 영통구 월드컵로 206 아주대학교 미디어학과&nbsp;&nbsp;
        <br>Copyright © 2018 Ajou media Mr.Stock. All Rights Reserved.
        </div>
      </section>

    </footer>
  </div>

</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
};
</script>

<style>
html, body {
	width: 100%; height: 100%;
  background-color: white;
}
#app{
  height: 100%;
}
.nav-background {
  background-color: black;
  height: 80px;
}
.footer{
  position: absolute;
  width: 100%;
  left:0px;
  bottom:0px auto 0px;
  border-top:1px solid #666;
  background-color: #333;

}
.inner{
  max-width: 1400px;
  padding: 0;
  margin: 0 auto;
  padding-top: 14px;
  padding-bottom: 26px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;

}
.indigo{
  color: indigo;
}
</style>
