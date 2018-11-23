<template>
  <div id="app">
      <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">Mr. Stock</b-navbar-brand>

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
    <b-button @click="loggedIn">하이</b-button>
    <router-view/>
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
body {
  background-color: lightgray;
}
.nav-background {
  background-color: black;
}
</style>
