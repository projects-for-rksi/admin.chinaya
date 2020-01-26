<template>
  <div class="panel__vue">
    <div class="panel-status">
      <div class="panel-status__block">
        <figure class="panel-status__figure">
          <i class="fas fa-eye icon-blue"></i>
        </figure>
        <div class="panel-status__infromation">
          <span class="panel-status__title">Пользователей</span>
          <span class="panel-status__value">{{ users }}</span>
        </div>
      </div>
      <div class="panel-status__block">
        <figure class="panel-status__figure">
          <i class="fas fa-phone icon-green"></i>
        </figure>
        <div class="panel-status__infromation">
          <span class="panel-status__title">Заказов</span>
          <span class="panel-status__value">{{ orders }}</span>
        </div>
      </div>
      <div class="panel-status__block">
        <figure class="panel-status__figure">
          <i class="fas fa-list icon-purple"></i>
        </figure>
        <div class="panel-status__infromation">
          <span class="panel-status__title">Товаров</span>
          <span class="panel-status__value">{{ goods }}</span>
        </div>
      </div>
      <div class="panel-status__block">
        <figure class="panel-status__figure">
          <i class="fas fa-users icon-red"></i>
        </figure>
        <div class="panel-status__infromation">
          <span class="panel-status__title">Администраторов</span>
          <span class="panel-status__value">{{ admins }}</span>
        </div>
      </div>
    </div>
    <div class="last-applications">
      <div class="last-applications__block">
        <div class="last-applications__block-header">
          <h2>Последние заказы</h2>
          <router-link to="/orders">Посмотреть все</router-link>
        </div>
        <div class="last-applications__block-text">
          <span>Номер заказа</span>
          <span>Пользователь</span>
          <span>Дата</span>
          <span>Статус</span>
        </div>
        <div
          v-for="item in dataOrders"
          v-bind:key="item.id_order"
          class="last-applications__block-information"
        >
          <div class="last-applications__description-block">
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
            <div v-if="item.id_status == 7" class="description-block__status">
              <span>Не просмотрено</span>
            </div>
            <div v-if="item.id_status == 9" class="description-block__status status-scanned">
              <span>Просмотрен</span>
            </div>
            <div v-if="item.id_status == 10" class="description-block__status status-shipped">
              <span>Отправлен</span>
            </div>
            <div v-if="item.id_status == 11" class="description-block__status status-delivered">
              <span>Доставлен</span>
            </div>
            <div v-if="item.id_status == 12" class="description-block__status status-cancelled">
              <span>Отменён</span>
            </div>
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
    title: "Главная"
  },
  data: () => ({
    users: "",
    orders: "",
    goods: "",
    admins: "",
    dataOrders: []
  }),
  created() {
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/panel-info")
      .then(responce => {
        if (responce.data["users"] != null) {
          this.users = responce.data["users"];
        } else {
          this.users = 0;
        }

        if (responce.data["orders"] != null) {
          this.orders = responce.data["orders"];
        } else {
          this.orders = 0;
        }

        if (responce.data["goods"] != null) {
          this.goods = responce.data["goods"];
        } else {
          this.goods = 0;
        }

        if (responce.data["admins"] != null) {
          this.admins = responce.data["admins"];
        } else {
          this.admins = 0;
        }
      });
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/last-orders")
      .then(responce => {
        this.dataOrders = responce.data;
      });
  }
};
</script>
