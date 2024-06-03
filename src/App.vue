<template>
  <router-view/>
</template>


<script lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { defineComponent } from 'vue';

export default defineComponent({
  data(){
    return {};
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  },
  methods: {},
});
</script>

<style>
body {
  background-image: linear-gradient(
    90deg,
    rgba(65, 164, 253, 1),
    rgba(14, 244, 255, 1)
  );
}
</style>
