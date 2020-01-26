<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import PanelLayout from "@/layouts/admin/PanelLayout";
import LoginLayout from "@/layouts/admin/LoginLayout";
export default {
  components: {
    PanelLayout,
    LoginLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "login") + "-layout";
    }
  }
};
</script>

<style>
@import "assets/css/admin.css";
@import "assets/css/login.css";
@import "assets/css/profile.css";
</style>
