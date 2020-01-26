<template>
  <div class="create-goods">
    <div class="common-return">
      <router-link to="/goods">
        <i class="fas fa-arrow-left"></i>Назад
      </router-link>
    </div>
    <transition name="fade">
      <div class="create-goods__modal" v-if="openModal == true">
        <div class="create-goods__modal-block">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="create-goods__block">
      <div class="create-goods__block_create">
        <div class="create-goods__title">
          <h2>Добавление товара</h2>
          <span @click="clearInput">Очистить всё</span>
        </div>
        <div class="create-goods__add">
          <form @submit.prevent="submitHandler" class="create-goods__form">
            <input
              class="create-goods__input"
              type="text"
              v-model="title"
              placeholder="Название товара"
            />
            <input
              class="create-goods__input"
              type="text"
              v-model="description"
              placeholder="Описание товара"
            />
            <input
              class="create-goods__input"
              type="text"
              v-model="quantity"
              placeholder="Количество товара"
            />
            <input
              class="create-goods__input"
              type="text"
              v-model="price"
              placeholder="Цена товара"
            />
            <input
              class="create-goods__input"
              type="text"
              v-model="photo"
              placeholder="URL Изображения"
            />
            <select v-model="status" value="Статус товара" class="create-goods__select">
              <option disabled selected>Выберите тип товара</option>
              <option
                v-for="itemStatus in statusProduct"
                :key="itemStatus.id"
                :value="itemStatus.id"
              >{{ itemStatus.name_status }}</option>
            </select>
            <select v-model="this_is_new" class="create-goods__select">
              <option disabled selected>Это новинка ?</option>
              <option :value="1">Обычный товар</option>
              <option :value="2">Новинка</option>
            </select>
            <select v-model="id_categories" class="create-goods__select">
              <option disabled selected>Выберите категорию</option>
              <option
                v-for="itemCategories in categoriesProduct"
                :key="itemCategories.id"
                :value="itemCategories.id"
              >{{ itemCategories.name_categories }}</option>
            </select>
            <input class="create-goods__button" type="submit" value="Добавить" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/create-goods.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Новый товар"
  },
  data: () => ({
    textModal: "Товар успешно добавлен",
    title: "",
    description: "",
    quantity: "",
    price: "",
    photo: "",
    status: "Выберите тип товара",
    id_categories: "Выберите категорию",
    openModal: false,
    categoriesProduct: [],
    statusProduct: [],
    this_is_new: "Это новинка ?"
  }),
  created() {
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/categories")
      .then(responce => {
        this.categoriesProduct = responce.data;
      });
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/status-product")
      .then(responce => {
        this.statusProduct = responce.data;
      });
  },
  methods: {
    clearInput() {
      (this.title = ""),
        (this.description = ""),
        (this.quantity = ""),
        (this.price = ""),
        (this.photo = ""),
        (this.status = "Выберите тип товара"),
        (this.id_categories = "Выберите категорию");
      this.this_is_new = "Это новинка ?";
    },
    async submitHandler() {
      if (
        this.title != "" &&
        this.description != "" &&
        this.quantity != "" &&
        this.price != "" &&
        this.photo != "" &&
        this.status != "" &&
        this.id_categories != "" &&
        this.this_is_new != ""
      ) {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/create-goods", {
            title: this.title,
            description: this.description,
            quantity: this.quantity,
            price: this.price,
            photo: this.photo,
            status: this.status,
            this_is_new: this.this_is_new,
            id_categories: this.id_categories
          })
          .then(response => {
            if (response.data["status"] == "Error") {
              this.textModal = "Заполните все поля!";
              this.openModal = true;
              setTimeout(() => (this.openModal = false), 2000);
            } else {
              this.textModal = "Товар успешно добавлен!";
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
