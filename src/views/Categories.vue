<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory />

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
  components: {
    CreateCategory,
    EditCategory
  }
}
</script>