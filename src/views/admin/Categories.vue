<template>
  <div class="сategories">
    <transition name="fade">
      <div class="create-goods__modal" v-if="openModal == true">
        <div class="create-goods__modal-block">
          <span>{{ textModal }}</span>
        </div>
      </div>
    </transition>
    <div class="сategories__blocks">
      <div class="сategories__block">
        <div class="сategories__title">
          <h2>Категории</h2>
        </div>
        <div class="сategories__block-text">
          <span>Номер категории</span>
          <span>Название категории</span>
          <span>Управление</span>
        </div>
        <div class="сategories__block-information">
          <div
            v-for="item in categories"
            v-bind:key="item.id"
            class="сategories__description-block"
          >
            <span class="сategories__number">№{{ item.id }}</span>
            <span class="сategories__name">{{ item.name_categories }}</span>
            <div class="сategories__delete">
              <button v-on:click="deleteСategories(item.id)" v-bind:data-id="item.id">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="сategories-new">
        <div class="select-refers__category">
          <div class="admin__title">
            <h2>Тип категории</h2>
          </div>
          <div class="admin__block-information">
            <div class="form-content2">
              <multiselect
                v-model="value2"
                :options="options2"
                :searchable="false"
                :close-on-select="false"
                :show-labels="false"
                placeholder="Выберите тип категории"
              ></multiselect>
            </div>
          </div>
        </div>
        <div class="сategories-new__add">
          <div class="сategories__title">
            <h2>Название категории</h2>
          </div>
          <div class="сategories__block-information">
            <form @submit.prevent="submitHandler" class="new-сategories__description-block">
              <input
                v-model="name_categories"
                class="сategories__input"
                type="text"
                placeholder="Название категории"
              />
              <input class="сategories__button" type="submit" value="Добавить" />
            </form>
          </div>
        </div>
        <div class="сategories-delete__attention">
          <img src="@/assets/img/mark.png" alt="Восклицательный знак" />
          <p>
            Перед удалением категории проверьте, не привязана ли она к
            товару.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/categories.css";
</style>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  metaInfo: {
    title: "Категории"
  },
  components: {
    Multiselect
  },
  data: () => ({
    textModal: "",
    name_categories: "",
    categories: [],
    error: [],
    openModal: false,
    value2: "",
    options2: ["Посуда", "Чай"]
  }),
  created() {
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/categories")
      .then(responce => {
        this.categories = responce.data;
      });
  },
  methods: {
    deleteСategories(id) {
      const $categoriesID = id;
      axios
        .post(
          "https://api.xn----7sba9au1d3c.xn--p1ai/api/delete-categories/" +
            $categoriesID
        )
        .then(response => {
          if (response.data["status"] == "error") {
            this.textModal =
              "Ошибка! Выбранная вами категория привяза к товару";
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
          } else {
            this.categories = response.data;
            this.textModal = "Категория успешно удалена!";
            this.openModal = true;
            setTimeout(() => (this.openModal = false), 2000);
          }
        });
    },
    async submitHandler() {
      if (this.name_categories != "" && this.value2 != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/new-categories", {
            name_categories: this.name_categories,
            refers_category: this.value2
          })
          .then(responce => {
            this.categories = responce.data;
            this.textModal = "Категория успешно добавлена!";
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
