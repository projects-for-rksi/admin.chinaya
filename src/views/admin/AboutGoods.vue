<template>
  <div class="about-goods">
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
    <div class="about-goods__blocks">
      <div class="about-goods__block">
        <div class="about-goods__title">
          <h2>Информация о товаре</h2>
        </div>
        <div v-for="item in product" v-bind:key="item.id" class="about-goods__information">
          <div class="about-goods__information-text">
            <div class="about-goods__block-photo">
              <img :src="item.photo" alt="Фотография чая" />
            </div>
            <div class="about-goods__block-text">
              <div class="about-goods__text">
                <span class="about-goods__key">Название:</span>
                <span class="about-goods__value">{{ item.title }}</span>
              </div>
              <div class="about-goods__text">
                <span class="about-goods__key">Описание:</span>
                <span class="about-goods__value">
                  <br />
                  {{ item.description }}
                </span>
              </div>
              <div class="about-goods__text">
                <span class="about-goods__key">Количество:</span>
                <span v-if="item.status <= 5" class="about-goods__value">{{ item.quantity }}г.</span>
                <span v-if="item.status >= 6" class="about-goods__value">{{ item.quantity }}шт.</span>
              </div>
              <div class="about-goods__text">
                <span class="about-goods__key">Цена:</span>
                <span class="about-goods__value">{{ item.price }} ₽</span>
              </div>
              <div class="about-goods__text">
                <span class="about-goods__key">Новинка:</span>
                <span v-if="item.this_is_new == 1" class="about-goods__value">Нет</span>
                <span v-if="item.this_is_new == 2" class="about-goods__value">Да</span>
              </div>
              <div class="about-goods__text">
                <span class="about-goods__key">Тип:</span>
                <span v-if="item.status == 5" class="about-goods__value">Чай на развес</span>
                <span v-if="item.status == 6" class="about-goods__value">Чай по штучно</span>
                <span v-if="item.status == 7" class="about-goods__value">Посуда</span>
              </div>
              <div class="about-goods__text">
                <span class="about-goods__key">Категория:</span>
                <span class="about-goods__value">{{ item.name_categories }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-new__add2 cancel-margin-goods">
        <div class="admin-new__add-block">
          <div class="admin__title">
            <h2>Изменить тип товара</h2>
          </div>
          <div class="admin__block-information">
            <form @submit.prevent="updateStatusProduct" class="new-admin__description-block">
              <div class="form-content">
                <multiselect
                  v-model="value"
                  :options="options"
                  :searchable="false"
                  :close-on-select="false"
                  :show-labels="false"
                  placeholder="Выберите тип категории"
                ></multiselect>
              </div>
              <input class="admin__button" type="submit" value="Изменить" />
            </form>
          </div>
        </div>
        <div class="admin-new__add-block">
          <div class="admin__title">
            <h2>Добавить количество</h2>
          </div>
          <div class="admin__block-information">
            <form @submit.prevent="addQuantityGood" class="new-admin__description-block">
              <div class="form-content">
                <input
                  class="admin__quantity"
                  v-model="quantity"
                  type="text"
                  placeholder="Укажите количество"
                />
              </div>
              <input class="admin__button" type="submit" value="Добавить" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/about-goods.css";
</style>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  metaInfo: {
    title: "О товаре"
  },
  props: ["date"],
  data() {
    return {
      id: this.$route.params.id,
      product: [],
      categoriesProduct: [],
      statusProduct: [],
      value: "",
      textModal: "",
      options: ["Обычный товар", "Новинка"],
      openModal: false,
      quantity: null
    };
  },
  created() {
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/goods/" + this.id)
      .then(responce => {
        if (responce.data["status"] == "Error") {
          this.$router.push("/404");
        } else {
          this.product = responce.data;
        }
      });
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
  components: {
    Multiselect
  },
  methods: {
    updateStatusProduct() {
      if (this.value != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/update-status", {
            id_status: this.value,
            id_good: this.product[0]["id_good"]
          })
          .then(responce => {
            this.product = responce.data;
            this.textModal = "Тип успешно изменён!";
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
          });
      } else {
        this.textModal = "Выберите статус!";
        this.openModal = true;
        setTimeout(() => (this.openModal = false), 2000);
      }
    },
    addQuantityGood() {
      if (this.quantity != null) {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/add-quantity", {
            quantity: this.quantity,
            id_good: this.product[0]["id_good"]
          })
          .then(responce => {
            if (responce.data["status"] == "Error") {
              this.textModal = "Не известная ошибка. Повторите попытку!";
              this.openModal = true;
              setTimeout(() => (this.openModal = false), 2000);
            } else {
              this.product = responce.data;
              this.textModal = "Количество добавлено!";
              this.openModal = true;
              setTimeout(() => (this.openModal = false), 2000);
            }
          });
      } else {
        this.textModal = "Укажите количество!";
        this.openModal = true;
        setTimeout(() => (this.openModal = false), 2000);
      }
    }
  }
};
</script>
