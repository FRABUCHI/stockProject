<template>
<div id="signup">
  <h1>This is SignUp Page!!!</h1>
  <b-form @submit.prevent="signUp" @reset="onReset">
    <b-form-group id="id"
                  label="ID:"
                  label-for="input1">
      <b-form-input id="input1"
                    type="text"
                    v-model="user.id"
                    required
                    placeholder="아이디">
      </b-form-input>
    </b-form-group>
    <b-form-group id="password"
                  label="Password:"
                  label-for="input2">
      <b-form-input id="input2"
                    type="password"
                    v-model="user.password"
                    required
                    placeholder="비밀번호">
      </b-form-input>
    </b-form-group>
    <b-form-group id="name"
                  label="Name:"
                  label-for="input3">
      <b-form-input id="input3"
                    type="text"
                    v-model="user.name"
                    required
                    placeholder="이름">
      </b-form-input>
      </b-form-group>
    <b-form-group id="email"
                  label="Email:"
                  label-for="input4">
      <b-form-input id="input4"
                    type="email"
                    v-model="user.email"
                    required
                    placeholder="이메일 주소">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">회원가입</b-button>
    <b-button type="reset" variant="danger">초기화</b-button>
  </b-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
        name: "",
        email: null
      }
    }
  },
  methods: {
    signUp(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.user));

      this.$store.dispatch('signup', {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      })
        .then(res => {
          console.log(res.status)
          this.$router.push({ name: 'Login' })
        })
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.user.email = ''
      this.user.name = ''
      this.user.password = ''
      this.user.id = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
