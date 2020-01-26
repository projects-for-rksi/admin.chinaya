<template>
  <div class="goods">
    <transition name="fade">
      <div class="create-goods__modal" v-if="openModal == true">
        <div class="create-goods__modal-block">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="goods-blocks">
      <div class="goods-block">
        <div class="goods-blocks__title">
          <h2>Товары</h2>
          <form>
            <input
              class="goods-blocks__input"
              v-model="search"
              type="text"
              placeholder="Поиск товара"
            />
          </form>
          <router-link class="goods-blocks__new-goods" to="/create-goods">Добавить товар</router-link>
        </div>
        <div class="goods-blocks__text">
          <span>Номер товара</span>
          <span>Название товара</span>
          <span>Количество</span>
          <span>Управление</span>
        </div>
        <div class="goods-blocks__block">
          <div v-for="item in goodsList" v-bind:key="item.id" class="goods-blocks__block-text">
            <span class="goods-blocks__block-number">№{{ item.id_good }}</span>
            <span class="goods-blocks__block-name">{{ item.title }}</span>
            <span v-if="item.status <= 5" class="goods-blocks__block-weight">{{ item.quantity }}гр.</span>
            <span v-if="item.status >= 6" class="goods-blocks__block-weight">{{ item.quantity }}шт.</span>
            <div class="goods-blocks__block-control">
              <router-link
                class="goods-blocks__control-view"
                v-bind:to="'/goods/' + item.id_good"
              >Просмотреть</router-link>
              <button
                @click="deleteProduct(item.id_good)"
                class="goods-blocks__control-delete"
              >Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/goods.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Товары"
  },
  data() {
    return {
      goods: [],
      openModal: false,
      search: "",
      textModal: ""
    };
  },
  computed: {
    goodsList() {
      return this.goods.filter(item => item.title.indexOf(this.search) !== -1);
    }
  },
  methods: {
    deleteProduct(id) {
      const $productID = id;
      axios
        .post(
          "https://api.xn----7sba9au1d3c.xn--p1ai/api/delete-good/" + $productID
        )
        .then(response => {
          if (response.data["status"] == "error") {
            this.textModal =
              "Товар находится в заказе. Удалите заказ и повторите попытку!";
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
          } else {
            this.textModal = "Товар успешно удалён!";
            this.goods = response.data;
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
          }
        });
    }
  },
  created() {
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/goods")
      .then(responce => {
        this.goods = responce.data;
      });
  }
};
</script>
