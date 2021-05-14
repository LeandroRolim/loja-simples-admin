<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="10"
      class="elevation-2"
      :loading="loading"
      loading-text="Carregando dados"
      sort-by="name"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Produtos</v-toolbar-title>
          <v-divider inset vertical class="mx-4"></v-divider>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="newProductDialog" max-width="400px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="primary">Novo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cadastro de produto</span>
              </v-card-title>
              <v-card-text>
                <span class="red--text">
                  {{ erros }}
                </span>
                <v-text-field
                  label="Produto"
                  required
                  outlined
                  v-model="name"
                ></v-text-field>

                <v-select
                  label="Marca"
                  :items="brands"
                  item-text="name"
                  item-value="id"
                  required
                  outlined
                  v-model="brand_id"
                ></v-select>

                <v-select
                  label="Categoria"
                  :items="categories"
                  item-text="category"
                  item-value="id"
                  required
                  outlined
                  v-model="category_id"
                ></v-select>

                <v-textarea
                  label="Descrição"
                  required
                  outlined
                  v-model="description"
                ></v-textarea>

                <v-text-field
                  label="Valor"
                  prefix="R$"
                  v-model="price"
                  outlined
                ></v-text-field>

                <v-file-input
                  accept="image/*"
                  label="Foto"
                  required
                  outlined
                  show-size
                  v-model="photo"
                ></v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="newProductDialog = false" class="red--text">
                  Cancelar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="newProduct" class="primary">Gravar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.price="{ item }">
        {{
          parseFloat(item.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2 orange--text" @click="showUpdateDialog(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="red--text" @click="remove(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="updateProductDialog" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Atualizar de produto</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Produto"
            required
            outlined
            v-model="name"
          ></v-text-field>

          <v-select
            label="Marca"
            :items="brands"
            item-text="name"
            item-value="id"
            required
            outlined
            v-model="brand_id"
          ></v-select>

          <v-select
            label="Categoria"
            :items="categories"
            item-text="category"
            item-value="id"
            required
            outlined
            v-model="category_id"
          ></v-select>

          <v-textarea
            label="Descrição"
            required
            outlined
            v-model="description"
          ></v-textarea>

          <v-text-field
            label="Valor"
            prefix="R$"
            v-model="price"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelUpdateDialog" class="red--text">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="updateProduct" class="primary">Gravar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "../../../plugins/http";
export default {
  name: "ProductTable",
  data: () => ({
    search: "",
    loading: false,
    newProductDialog: false,
    updateProductDialog: false,
    id: "",
    name: "",
    description: "",
    brand_id: "",
    category_id: "",
    photo: "",
    price: "",
    erros: "",
    headers: [
      {
        text: "Produto",
        align: "start",
        sortable: true,
        value: "name",
      },
      {
        text: "Marca",
        sortable: true,
        value: "brand.name",
      },
      {
        text: "Categoria",
        sortable: true,
        value: "category.category",
      },
      {
        text: "Valor",
        sortable: false,
        value: "price",
      },
      { text: "Actions", align: "end", value: "actions", sortable: false },
    ],
    products: [],
    brands: [],
    categories: [],
  }),
  methods: {
    load: async function () {
      this.loading = true;
      http.get("/api/products").then(({ data }) => {
        this.products = data.data;
        this.loading = false;
      });
    },
    getFormData: function () {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("brand_id", this.brand_id);
      formData.append("category_id", this.category_id);
      formData.append("photo", this.photo);
      formData.append("price", this.price);
      return formData;
    },
    newProduct: async function () {
      this.loading = true;
      await http
        .post("/api/products", this.getFormData(), {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            this.products.push(res.data.data);
          }
          this.newProductDialog = false;
          this.clear();
        })
        .catch((error) => {
          this.erros = error.response.data.message;
        });
      this.loading = false;
    },
    remove: async function (item) {
      this.loading = true;
      await http
        .delete(`/api/products/${item.id}`)
        .then(() => {
          this.load();
        })
        .catch((error) => console.log(error));
      this.clear();
      this.loading = false;
    },
    showUpdateDialog: function (item) {
      this.updateProductDialog = true;
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.brand_id = item.brand_id;
      this.category_id = item.category_id;
      this.price = item.price;
      this.erros = item.erros;
    },
    clear: function () {
      this.id = "";
      this.name = "";
      this.description = "";
      this.brand_id = "";
      this.category_id = "";
      this.photo = "";
      this.price = "";
      this.erros = "";
    },
    cancelUpdateDialog: function () {
      this.updateProductDialog = false;
      this.clear();
    },
    updateProduct: async function () {
      this.loading = true;
      await http
        .put(`/api/products/${this.id}`, this.getFormData(), {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.load();
            this.clear();
            this.updateProductDialog = false;
          }
        });
      this.loading = false;
    },
  },
  created() {
    this.load();
    http.get("/api/categories").then(({ data }) => {
      this.categories = data.data;
    });
    http.get("/api/brands").then(({ data }) => {
      this.brands = data.data;
    });
  },
};
</script>
