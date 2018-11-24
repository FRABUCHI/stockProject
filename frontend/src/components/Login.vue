<template>
<div id="login">
  <b-card
          style="max-width: 22rem;margin-top:100px;margin-bottom:100px;padding:20px;padding-top:35px;margin-left:auto;margin-right:auto"
          img-src="https://i.imgur.com/1D1xFBN.png"
          img-alt="login logo"
          img-top
          tag="article">
          <div style="padding-top:5px;padding-bottom:17px;font-size:20px">
            <p1>Login</p1>
          </div>
        <b-form @submit.prevent="login" @reset="onReset">
          <b-form-group id="id"
                        label="ID"
                        label-for="input1">
            <b-form-input id="input1"
                          type="text"
                          v-model="user.id"
                          required
                          placeholder="아이디">
            </b-form-input>
          </b-form-group>
          <b-form-group id="password"
                        label="Password"
                        label-for="input2">
            <b-form-input id="input2"
                          type="password"
                          v-model="user.password"
                          required
                          placeholder="비밀번호">
            </b-form-input>
          </b-form-group>
          <div style="margin-top:30px; margin-left:auto; margin-right:auto;width:57%">
            <b-button type="submit" variant="primary">로그인</b-button>
            <b-button type="reset" variant="danger">초기화</b-button>
          </div>
          <div style="margin-top:15px;margin-left:auto;margin-right:auto;width:90%">Don’t have an account?&nbsp;&nbsp;&nbsp;<a href="/SignUp">Sign Up</a></div>
        </b-form>
    </b-card>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      user: {
        id: '',
        password: ''
      }
    };
  },
  methods: {
    login(event) {

      this.$store.dispatch('retrieveToken', {
        id: this.user.id,
        password: this.user.password,
      })
      .then(res => {
        this.$router.push({name: 'Main'})
      })
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.user.id = ''
      this.user.password = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style>
  #login{
    min-height: 100%;
  }
</style>
