<template>
  <form @submit.prevent="login()">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email"
        name="email"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="password"
        name="password"
        required
      />
    </div>
    <div class="login-button-warpper">
      <button type="submit" class="btn btn-light">Login</button>
    </div>
  </form>
</template>

<script lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
          this.$router.push({ name: "main" });
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    },
  },
});
</script>

<style>
.login-button-warpper {
  text-align: center;
}
</style>
