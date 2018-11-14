<template>
  <div id="app">
      <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">Mr. Stock</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="/">메인</b-nav-item>
            <b-nav-item href="/login">로그인</b-nav-item>
            <b-nav-item href="/signup">회원가입</b-nav-item>
            <b-nav-item >로그아웃</b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
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
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      state: false
    };
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
