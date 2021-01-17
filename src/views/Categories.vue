<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory @created="addNewCategory" />

        <EditCategory />
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
      categories: []
    }
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