<template>
<div id="login">
  <h1>This is Login Page!!!</h1>
  <b-form @submit="onSubmit" @reset="onReset">
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
    <b-button type="submit" variant="primary">로그인</b-button>
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
        password: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      this.$http
        .post("/api/login", {
          user: this.user
        })
        .then(
          res => {
            alert("로그인 되었습니다.");
            this.$router.push("/");
          },
          err => {
            alert(err.response.data.error);
          }
        )
        .catch(err => {
          alert(err);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.user.id = "";
      this.user.password = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>