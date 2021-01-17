<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CreateCategory @created="addNewCategory" />

        <EditCategory :categories="categories" />
      </div>
    </section>
  </div>
</template>

<script>
import CreateCategory from '../components/CreateCategory';
import EditCategory from '../components/EditCategory';

export default {
  name: 'categories',
  data() {
    return {
      categories: [],
      loading: true
    }
  },
  async mounted() {
    // Добавляем сушествующие категории из базы в массив categories
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: {
    CreateCategory,
    EditCategory
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    }
  }
}
</script>