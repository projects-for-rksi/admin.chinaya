<template>
  <div class="error404">
    <div class="error404__text">
      <h1>404</h1>
      <span>Такой страницы не существует, но есть другие ^_^</span>
      <router-link class="error404__button" to="/panel">На главную</router-link>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/404.css";
</style>

<script>
export default {
  metaInfo: {
    title: "Ошибка 404"
  }
};
</script>