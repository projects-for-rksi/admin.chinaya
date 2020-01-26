<template>
  <div class="panel__vue">
    <div class="common-return">
      <router-link to="/orders">
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
    <div class="about-order">
      <div class="about-order__block">
        <div class="about-order__title">
          <h2>Данные о заказе</h2>
        </div>
        <div class="about-order__block-text">
          <span>Номер товара</span>
          <span>Название товара</span>
          <span>Упаковок</span>
          <span>Количество</span>
          <span>Цена</span>
        </div>
        <div
          v-for="(item, index) in orderData"
          v-bind:key="index"
          class="about-order__block-information"
        >
          <div class="about-order__description-block">
            <span class="about-order__number">№{{ item.id_product }}</span>
            <span class="about-order__name">{{ item.title }}</span>
            <span v-if="item.status <= 5" class="about-order__weight">{{ item.box }}</span>
            <span v-if="item.status >= 6" class="about-order__weight">{{ 0 }}</span>
            <span v-if="item.status <= 5" class="about-order__weight">{{ item.gram }}г.</span>
            <span v-if="item.status >= 6" class="about-order__weight">{{ item.gram }}шт.</span>
            <span class="about-order__price">{{ item.price }} ₽</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-order">
      <div class="about-order__block">
        <div class="about-order__title">
          <h2>Данные об оплате</h2>
        </div>
        <div class="about-order__block-text">
          <span>Дата заказа</span>
          <span>Скидка</span>
          <span>Итоговая сумма</span>
          <span>Статус оплаты</span>
        </div>
        <div class="about-order__block-information">
          <div class="about-order__description-block">
            <span class="about-order__data">{{ dataDelivery['created_at'] }}</span>
            <span class="about-order__sale">{{ dataDelivery['sale'] }}%</span>
            <span class="about-order__total">{{ dataDelivery['total_price'] }}</span>
            <span v-if="dataDelivery['id_status'] == 7" class="about-order__total">Не оплачено</span>
            <span v-if="dataDelivery['id_status'] >= 8" class="about-order__total">Оплачено</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-order">
      <div class="about-order__block">
        <div class="about-order__title">
          <h2>Данные о доставки</h2>
        </div>
        <div class="about-order__block-text">
          <span>ФИО</span>
          <span>Город</span>
          <span>Адрес</span>
          <span>Индекс</span>
          <span>Способ</span>
        </div>
        <div class="about-order__block-information">
          <div class="about-order__description-block">
            <span
              class="about-order__fio"
            >{{ dataDelivery['surname'] }} {{ dataDelivery['name'] }} {{ dataDelivery['last_name'] }}</span>
            <span class="about-order__city">г. {{ dataDelivery['city'] }}</span>
            <span
              class="about-order__address"
            >{{ dataDelivery['address'] }} кв. {{ dataDelivery['flat'] }}</span>
            <span class="about-order__index">{{ dataDelivery['index'] }}</span>
            <span v-if="dataDelivery['way_delivery'] == 1" class="about-order__index">Курьер</span>
            <span v-if="dataDelivery['way_delivery'] == 2" class="about-order__index">СДЭК</span>
            <span v-if="dataDelivery['way_delivery'] == 3" class="about-order__index">Почта России</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataDelivery['way_delivery'] > 1" class="add-trackcode">
      <div class="add-trackcode__title">
        <h2>Указать номер отслеживания</h2>
      </div>
      <div class="add-trackcode__panel">
        <form @submit.prevent="addTrackCode" class="add-trackcode__form">
          <div class="form-content">
            <input
              class="add-trackcode__input"
              v-model="trackcode"
              type="text"
              placeholder="Номер отслеживания"
            />
          </div>
          <span
            v-if="dataDelivery['trackcode'] != null"
            class="current-trackcode"
          >Текущий: {{ dataDelivery['trackcode'] }}</span>
          <input class="add-trackcode__button" type="submit" value="Добавить" />
        </form>
      </div>
    </div>
    <div class="about-order order-last">
      <div class="about-order__block">
        <div class="about-order__title">
          <h2>Управление заказом</h2>
        </div>
        <div class="about-order__block-information">
          <div class="about-order__description-block">
            <div class="about-order__view">
              <span @click="updateAction(dataDelivery['id_order'], 9)">
                Просмотрен
                <i v-if="buttonActionActive == 9" class="fas fa-check"></i>
              </span>
            </div>
            <div @click="updateAction(dataDelivery['id_order'], 10)" class="about-order__delivery">
              <span>
                Отправлен
                <i v-if="buttonActionActive == 10" class="fas fa-check"></i>
              </span>
            </div>
            <div @click="updateAction(dataDelivery['id_order'], 11)" class="about-order__delivered">
              <span>
                Доставлен
                <i v-if="buttonActionActive == 11" class="fas fa-check"></i>
              </span>
            </div>
            <div @click="updateAction(dataDelivery['id_order'], 12)" class="about-order__cancel">
              <span>
                Отклонить
                <i v-if="buttonActionActive == 12" class="fas fa-check"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/order.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "О заказе"
  },
  props: ["date"],
  data() {
    return {
      id: this.$route.params.id,
      orderData: [],
      dataDelivery: [],
      buttonActionActive: "",
      textModal: "",
      openModal: false,
      trackcode: ""
    };
  },
  created() {
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/order/" + this.id)
      .then(responce => {
        if (responce.data["status"] == "Error") {
          this.$router.push("/404");
        } else {
          this.buttonActionActive = responce.data[0]["id_status"];
          this.orderData = responce.data;
          this.dataDelivery = responce.data[0];
        }
      });
  },
  methods: {
    updateAction(id_order, select) {
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/panel-action", {
          id_order: id_order,
          select: select
        })
        .then(responce => {
          this.buttonActionActive = responce.data[0]["id_status"];
        });
      this.textModal = "Статус обновлён!";
      this.openModal = true;
      setTimeout(() => (this.openModal = false), 2000);
    },
    addTrackCode() {
      if (this.trackcode != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/add-trackcode", {
            id_order: this.dataDelivery["id_order"],
            trackcode: this.trackcode
          })
          .then(responce => {
            if (responce.data["status"] == "Error") {
              this.textModal = "Ошибка. Повторите попытку!";
              this.openModal = true;
              setTimeout(() => (this.openModal = false), 2000);
            } else {
              this.dataDelivery["trackcode"] = this.trackcode;
              this.textModal = "Номер отслеживания добавлен!";
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