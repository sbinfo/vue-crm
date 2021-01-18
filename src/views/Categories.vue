<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CreateCategory @created="addNewCategory" />

        <EditCategory
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"  
        />
        <p v-else class="center">Категорий пока нет</p>
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
      loading: true,
      updateCount: 0
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
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++; // чтобы вынужденно перерисовать компонент vue увеличиваем это значение которая передается в :key
    }
  }
}
</script>