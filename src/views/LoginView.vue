<template>
  <div class="container mt-5" style="width: 300px">
    <login-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  components: {
    LoginForm,
  },
});
</script>
