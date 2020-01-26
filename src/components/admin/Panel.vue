<template>
  <div class="main__vue">
    <header v-if="openHeaderForMobile == true">
      <i
        v-if="width <= 1280"
        @click="openHeaderForMobile = !openHeaderForMobile"
        class="fas fa-times close-header__mobile"
      ></i>
      <div class="panel-logotype">
        <router-link @click="activeMenuTab = 1" class="panel-logotype__image" to="/panel">
          <img @click="activeMenuTab = 1" src="@/assets/img/logotype.png" alt="ChinaЯ" />
        </router-link>
      </div>
      <nav class="panel-menu">
        <ul v-for="item in dataUser" v-bind:key="item.id" class="panel-menu__list">
          <li
            @click="activeMenuTab = 1"
            class="panel-menu__list-item"
            v-bind:class="{ activemenu: activeMenuTab == 1 }"
          >
            <i class="fas fa-home"></i>
            <router-link to="/panel">Главная</router-link>
          </li>
          <li
            v-if="item.id_access_code >= 3"
            @click="activeMenuTab = 2"
            class="panel-menu__list-item"
            v-bind:class="{ activemenu: activeMenuTab == 2 }"
          >
            <i class="fas fa-users"></i>
            <router-link to="/admin-control">Администраторы</router-link>
          </li>
          <li
            @click="activeMenuTab = 3"
            class="panel-menu__list-item"
            v-bind:class="{ activemenu: activeMenuTab == 3 }"
          >
            <i class="fas fa-shopping-cart"></i>
            <router-link to="/orders">Заказы</router-link>
          </li>
          <li
            @click="activeMenuTab = 4"
            class="panel-menu__list-item"
            v-bind:class="{ activemenu: activeMenuTab == 4 }"
          >
            <i class="fas fa-list"></i>
            <router-link to="/categories">Категории</router-link>
          </li>
          <li
            @click="activeMenuTab = 5"
            class="panel-menu__list-item"
            v-bind:class="{ activemenu: activeMenuTab == 5 }"
          >
            <i class="fas fa-archive"></i>
            <router-link to="/goods">Товары</router-link>
          </li>
          <li
            @click="activeMenuTab = 6"
            class="panel-menu__list-item"
            v-bind:class="{ activemenu: activeMenuTab == 6 }"
          >
            <i class="fas fa-percent"></i>
            <router-link to="/sales">Промокоды</router-link>
          </li>
          <li @click="logout()" class="panel-menu__list-item">
            <i class="fas fa-times-circle"></i>
            <a>Выход</a>
          </li>
        </ul>
      </nav>
    </header>
    <main class="panel-control">
      <div v-for="item in dataUser" v-bind:key="item.id" class="panel-control__user">
        <a id="toggle">
          <span @click="openHeaderForMobile = !openHeaderForMobile"></span>
        </a>
        <h1 class="panel-control__title">Панель управления</h1>
        <div class="panel-control__user-block">
          <div class="panel-control__information">
            <span class="panel-control__information-name">{{ item.name }} {{ item.surname }}</span>
            <span class="panel-control__information-position">{{ item.description }}</span>
          </div>
          <a class="panel-control__user-photo">
            <img
              v-if="item.photo == null"
              @click="openProfileAdmin = !openProfileAdmin"
              src="@/assets/img/photo.user.png"
              alt="Фотография пользователя"
            />
            <img
              v-if="item.photo != null"
              @click="openProfileAdmin = !openProfileAdmin"
              :src="item.photo"
              alt="Фотография пользователя"
            />
          </a>
        </div>
      </div>
      <router-view />
    </main>
    <transition name="fade">
      <div v-if="openProfileAdmin == true" class="user-info__modal-block">
        <div v-for="item in dataUser" v-bind:key="item.id" class="user-info__modal">
          <div class="user-info__title">
            <h3>{{ item.surname }} {{ item.name }} {{ item.last_name }}</h3>
            <i @click="openProfileAdmin = !openProfileAdmin" class="fas fa-times-circle"></i>
          </div>
          <div class="user-info__user-block">
            <div class="user-info__user-image">
              <img
                v-if="item.photo == null"
                src="@/assets/img/photo.user.png"
                alt="Фотография пользователя"
              />
              <img v-if="item.photo != null" :src="item.photo" alt="Фотография пользователя" />
            </div>
            <div class="user-info__user-information">
              <div class="user-info__user-text">
                <span class="user-info__key">Электронная почта:</span>
                <span class="user-info__value">{{ item.email }}</span>
              </div>
              <div class="user-info__user-text">
                <span class="user-info__key">Фамилия:</span>
                <span class="user-info__value">{{ item.surname }}</span>
              </div>
              <div class="user-info__user-text">
                <span class="user-info__key">Имя:</span>
                <span class="user-info__value">{{ item.name }}</span>
              </div>
              <div class="user-info__user-text">
                <span class="user-info__key">Отчество:</span>
                <span class="user-info__value">{{ item.last_name }}</span>
              </div>
              <div class="user-info__user-text">
                <span class="user-info__key">Телефон:</span>
                <span v-if="item.phone == null" class="user-info__value">&nbsp;Не указан</span>
                <span v-if="item.phone != null" class="user-info__value">{{ item.phone }}</span>
              </div>
              <div class="user-info__user-text">
                <span class="user-info__key">Дата рождения:</span>
                <span v-if="item.birth_date == null" class="user-info__value">&nbsp;Не указано</span>
                <span v-if="item.birth_date != null" class="user-info__value">{{ item.birth_date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "panel",
  data: () => ({
    activeMenuTab: 1,
    openProfileAdmin: false,
    dataUser: [],
    id_access: "",
    width: window.innerWidth,
    openHeaderForMobile: false
  }),
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
  },
  created() {
    if (this.width >= 1281) {
      this.openHeaderForMobile = true;
    }
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/user", {
        api_token: localStorage.getItem("api_token")
      })
      .then(responce => {
        this.dataUser = responce.data;
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("api_token");
      localStorage.removeItem("auth");
      localStorage.removeItem("access");
      this.$router.push("/");
    }
  }
};
</script>

<style>
@import "../../assets/css/admin.css";
@import "../../assets/css/profile.css";
@import "../../assets/css/user-info.css";
</style>
