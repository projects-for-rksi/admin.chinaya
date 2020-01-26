<template>
  <div class="sale">
    <transition name="fade">
      <div class="create-goods__modal" v-if="openModal == true">
        <div class="create-goods__modal-block">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="sale__blocks">
      <div class="sale__block">
        <div class="sale__title">
          <h2>Промокоды</h2>
        </div>
        <div class="sale__block-text">
          <span>Номер скидки</span>
          <span>Промокод</span>
          <span>Скидка</span>
          <span>Управление</span>
        </div>
        <div class="sale__block-information">
          <div v-for="item in sale" v-bind:key="item.id" class="sale__description-block">
            <span class="sale__number">№{{ item.id }}</span>
            <span class="sale__code">{{ item.name_sale }}</span>
            <span class="sale__value">{{ item.value_sale }}%</span>
            <div class="sale__delete">
              <button v-on:click="deleteSale(item.id)" v-bind:data-id="item.id">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="sale__block">
        <div class="sale__title">
          <h2>Добавить промокод</h2>
        </div>
        <div class="sale__block-information">
          <form @submit.prevent="submitHandler" class="new-sale__description-block">
            <div class="new-sale__div-block">
              <input v-model="name_sale" class="sale__input" type="text" placeholder="Промокод" />
              <input v-model="value_sale" class="sale__input" type="text" placeholder="Скидка" />
            </div>
            <input class="sale__button" type="submit" value="Добавить" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/sales.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Промокоды"
  },
  data: () => ({
    textModal: "",
    name_sale: "",
    value_sale: "",
    sale: [],
    error: [],
    openModal: false
  }),
  created() {
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/sale")
      .then(responce => {
        this.sale = responce.data;
      });
  },
  methods: {
    deleteSale(id) {
      const $saleID = id;
      axios
        .post(
          "https://api.xn----7sba9au1d3c.xn--p1ai/api/delete-sale/" + $saleID
        )
        .then(responce => {
          this.sale = responce.data;
        });
      this.textModal = "Промокод успешно удалён!";
      this.openModal = true;
      setTimeout(() => (this.openModal = false), 2000);
    },
    async submitHandler() {
      if (
        this.name_sale != "" &&
        this.value_sale != "" &&
        this.value_sale.length <= 2
      ) {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/new-sale", {
            name_sale: this.name_sale,
            value_sale: this.value_sale
          })
          .then(responce => {
            this.sale = responce.data;
            this.textModal = "Промокод успешно добавлен!";
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
          });
      } else {
        this.textModal = "Заполните данные правильно!";
        this.openModal = true;
        setTimeout(() => (this.openModal = false), 2000);
      }
    }
  }
};
</script>
