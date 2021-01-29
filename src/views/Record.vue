<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="categories">Добавить категорию</router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            class="with-gap"
            name="type" 
            type="radio" 
            value="outcome" 
            v-model="type"  
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount" 
          type="number" 
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
              v-if="$v.amount.$dirty && !$v.amount.minValue"
              class="helper-text invalid"
          >Минимальная значение {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input 
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: $v.description.$dirty && !$v.description.minValue }"
        />
        <label for="description">Описание</label>
        <span 
          v-if="$v.description.$dirty && !$v.description.minValue"
          class="helper-text invalid"
        >
          Введите Описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: "record",
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: "outcome",
      amount: 1,
      description: ''
    };
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  methods: {
    handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      // Инициализация select для materialize
      this.select = M.FormSelect.init(this.$refs.select);

      // Оживить формы materialize
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    // Очистка плагина для select
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>