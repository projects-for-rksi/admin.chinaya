<template>
  <div class="panel__vue-login">
    <transition name="fade">
      <div class="login-modal-block" v-if="openModal == true">
        <div class="login-modal">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="login-header">
      <img src="@/assets/img/logotype.png" alt="Я в Чайной" />
    </div>
    <div class="login-title">
      <h1>Авторизация</h1>
      <p>Войти в аккаунт, для управлениями всеми инструментами сайта</p>
    </div>
    <div class="login-form">
      <form @submit.prevent="submitHandler">
        <input
          v-model="email"
          class="login-form__input"
          type="text"
          placeholder="Электронная почта"
        />
        <input v-model="password" class="login-form__input" type="password" placeholder="Пароль" />
        <input class="login-form__button" type="submit" value="Войти" />
      </form>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/login.css";
</style>

<script>
import axios from "axios";

export default {
  name: "login",
  metaInfo: {
    title: "Авторизация"
  },
  data: () => ({
    textModal: "",
    openModal: false,
    email: "",
    password: "",
    error: []
  }),
  methods: {
    async submitHandler() {
      if (this.email != "" && this.password != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.data["status"] == "error") {
              this.textModal =
                "Ошибка! Электронная почта или пароль не правильно указаны";
              this.openModal = true;
              setTimeout(() => (this.openModal = false), 2000);
            }
            if (response.data["access"] >= 2) {
              localStorage.setItem("api_token", response.data["api_token"]);
              localStorage.setItem("auth", true);
              this.$router.push("panel");
            } else {
              this.textModal = "Ошибка! Такого аккаунт не существует";
              this.openModal = true;
              setTimeout(() => (this.openModal = false), 2000);
            }
          });
      } else {
        this.textModal = "Заполните все данные!";
        this.openModal = true;
        setTimeout(() => (this.openModal = false), 2000);
      }
    }
  }
};
</script>
