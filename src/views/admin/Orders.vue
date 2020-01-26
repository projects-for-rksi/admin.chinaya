<template>
  <div class="panel__vue">
    <transition name="fade">
      <div class="create-goods__modal" v-if="openModal == true">
        <div class="create-goods__modal-block">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="last-applications__block2">
      <div class="last-applications__block-header">
        <h2>Все заказы</h2>
      </div>
      <div class="last-applications__block-text">
        <span>Номер заказа</span>
        <span>Пользователь</span>
        <span>Дата</span>
        <span>Управление</span>
      </div>
      <div class="last-applications__block-information">
        <div
          v-for="item in dataOrders"
          v-bind:key="item.id_order"
          class="last-applications__description-block"
        >
          <span class="description-block__number">№{{ item.id_order }}</span>
          <div class="description-block__image">
            <img
              v-if="item.photo == null"
              src="@/assets/img/photo.user.png"
              alt="Фотография пользователя"
            />
            <img v-if="item.photo != null" :src="item.photo" alt="Фотография пользователя" />
            <span>{{ item.name }} {{ item.surname }}</span>
          </div>
          <span class="description-block__date">{{ item.created_at }}</span>
          <div class="applications-block__control">
            <router-link
              class="applications-block__control-view"
              v-bind:to="'/about-order/' + item.id_order"
            >Просмотреть</router-link>
            <a
              @click="deleteOrder(item.id_order)"
              class="applications-block__control-delete"
            >Удалить</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Заказы"
  },
  data: () => ({
    dataOrders: [],
    textModal: "",
    openModal: false
  }),
  created() {
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/orders")
      .then(responce => {
        this.dataOrders = responce.data;
      });
  },
  methods: {
    deleteOrder(id_order) {
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/delete-order", {
          id_order: id_order
        })
        .then(responce => {
          this.dataOrders = responce.data;
        });
      this.textModal = "Заказ удалён!";
      this.openModal = true;
      setTimeout(() => (this.openModal = false), 2000);
    }
  }
};
</script>