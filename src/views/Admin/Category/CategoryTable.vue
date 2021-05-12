<template>
  <div>
    <v-card>
      <v-card-title>
        Categorias
        <v-spacer></v-spacer>
        <v-btn @click="newCategoryDialog = true" class="primary">Novo</v-btn>
        <lr-new-category
          :dialog="newCategoryDialog"
          @cancel="newCategoryDialog = false"
          @save="newCategory"
        />
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th colspan="2" class="text-left">Categoria</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="category in categories"
              :key="'category' + category.slug"
            >
              <td>{{ category.category }}</td>
              <td class="text-right">
                <v-btn icon class="blue--text">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import http from "../../../plugins/http";
import LrNewCategory from "../../../components/LrNewCategory";
export default {
  name: "CategoryTable",
  data: () => ({
    newCategoryDialog: false,
    categories: [],
  }),
  methods: {
    newCategory: function (event) {
      this.categories.push(event);
      this.newCategoryDialog = false;
    },
  },
  created() {
    http
      .get("/api/categories")
      .then(({ data }) => (this.categories = data.data));
  },
  components: {
    LrNewCategory,
  },
};
</script>
