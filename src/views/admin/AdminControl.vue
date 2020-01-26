<template>
  <div class="panel__vue">
    <transition name="fade">
      <div class="create-goods__modal" v-if="openModal == true">
        <div class="create-goods__modal-block">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="admin-control__blocks">
      <div class="admin-control__title">
        <h2>Администраторы</h2>
      </div>
      <div class="admin-control__text">
        <span>Номер пользователя</span>
        <span>Имя пользователя</span>
        <span>Дата рождения</span>
        <span>Управление</span>
      </div>
      <div class="admin-control__block">
        <div v-for="item in dataAdmin" v-bind:key="item.id" class="admin-control__block-text">
          <span class="admin-control__block-number">№{{ item.id }}</span>
          <div class="admin-control__image">
            <img
              v-if="item.photo == null"
              src="@/assets/img/photo.user.png"
              alt="Фотография пользователя"
            />
            <img v-if="item.photo != null" :src="item.photo" alt="Фотография пользователя" />
            <span>{{ item.name }} {{ item.surname }}</span>
          </div>
          <span v-if="item.birth_date == null" class="admin-control__block-date">Не указано</span>
          <span
            v-if="item.birth_date != null"
            class="admin-control__block-date"
          >{{ item.birth_date }}</span>
          <div class="admin-control__block-control">
            <a
              @click="(openProfile = !openProfile), (selectedUser = item.id)"
              class="admin-control__control-view"
            >Подробнее</a>
            <a @click="deleteRules(item.id)" class="admin-control__control-delete">Сбросить права</a>
          </div>
        </div>
      </div>
    </div>
    <div class="admin-new__add">
      <div class="admin__title">
        <h2>Добавить администратора</h2>
      </div>
      <div class="admin__block-information">
        <form @submit.prevent="submitHandler" class="new-admin__description-block">
          <input v-model="admin_id" class="admin__input" type="text" placeholder="ID Пользователя" />
          <input class="admin__button" type="submit" value="Добавить" />
        </form>
      </div>
    </div>
    <transition name="fade">
      <div v-if="openProfile == true" class="user-info__modal-block">
        <div
          v-for="item in dataAdmin"
          v-bind:class="{ disable: selectedUser != item.id }"
          v-bind:key="item.id"
          class="user-info__modal"
        >
          <div>
            <div class="user-info__title">
              <h3>{{ item.surname }} {{ item.name }} {{ item.last_name }}</h3>
              <i @click="openProfile = !openProfile" class="fas fa-times-circle"></i>
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
                  <span
                    v-if="item.birth_date != null"
                    class="user-info__value"
                  >{{ item.birth_date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
@import "../../assets/css/admin-control.css";
@import "../../assets/css/user-info.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Администраторы"
  },
  data: () => ({
    openProfile: false,
    dataAdmin: [],
    selectedUser: 1,
    textModal: "",
    openModal: false,
    admin_id: ""
  }),
  created() {
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/test-auth", {
        api_token: localStorage.getItem("api_token")
      })
      .then(responce => {
        if (responce.data["access"] >= 3) {
          axios
            .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/admin-panel")
            .then(responce => {
              this.dataAdmin = responce.data;
            });
        } else {
          this.$router.push("panel");
        }
      });
  },
  methods: {
    deleteRules(id) {
      const $userID = id;
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/delete-admin", {
          user_id: $userID
        })
        .then(response => {
          this.dataAdmin = response.data;
          this.textModal = "Права администратора отключены!";
          this.openModal = true;
          setTimeout(() => (this.openModal = false), 2000);
        });
    },
    async submitHandler() {
      if (this.admin_id != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/new-admin", {
            admin_id: this.admin_id
          })
          .then(responce => {
            this.dataAdmin = responce.data;
            this.textModal = "Новый администратор успешно добавлен!";
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
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
