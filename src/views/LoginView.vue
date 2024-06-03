<template>
  <div class="container mt-5" style="width: 300px">
    <form @submit.prevent="login()">
      <div class="mb-3">
        <label for="email" class="form-label">Mail</label>
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
      <div style="text-align: center">
        <button type="submit" class="btn btn-light">Login</button>
      </div>
    </form>
  </div>
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
  mounted() {
    // const auth = getAuth()
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.isUser = true;
    //   } else {
    //     this.isUser = false;
    //   }
    // });
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // ユーザーが正常にログインした場合の処理
          console.log("User logged in:", userCredential.user);
          this.$router.push({ name: "main" });
        })
        .catch((error) => {
          // エラーが発生した場合の処理
          console.error("Error logging in:", error);
        });
    },
  },
});
</script>
