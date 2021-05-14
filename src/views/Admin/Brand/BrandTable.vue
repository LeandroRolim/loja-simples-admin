<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="brands"
      :items-per-page="10"
      class="elevation-2"
      :loading="loading"
      loading-text="Carregando dados"
      sort-by="name"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Marcas</v-toolbar-title>
          <v-divider inset vertical class="mx-4"></v-divider>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="newBrandDialog" max-width="400px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="primary">Novo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cadastro de marca</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Marca"
                  required
                  outlined
                  v-model="name"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="newBrandDialog = false" class="red--text">
                  Cancelar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="newBrand" class="primary">Gravar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2 orange--text"
          disabled
          @click="showUpdateDialog(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="red--text" disabled @click="remove(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
    <v-dialog v-model="updateBrandDialog" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Atualizar de marca</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Marca"
            required
            outlined
            v-model="name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelUpdateDialog" class="red--text">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="updateBrand" class="primary">Gravar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "../../../plugins/http";
export default {
  name: "BrandTable",
  data: () => ({
    search: "",
    loading: false,
    newBrandDialog: false,
    updateBrandDialog: false,
    id: "",
    name: "",
    headers: [
      {
        text: "Marca",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Actions", align: "end", value: "actions", sortable: false },
    ],
    brands: [],
  }),
  methods: {
    load: async function () {
      this.loading = true;
      http.get("/api/brands").then(({ data }) => {
        this.brands = data.data;
        this.loading = false;
      });
    },
    newBrand: async function () {
      this.newBrandDialog = false;
      this.loading = true;
      await http
        .post("/api/brands", {
          name: this.name,
        })
        .then((res) => {
          if (res.status === 201) {
            this.brands.push(res.data.data);
          }
        });
      this.loading = false;
    },
    remove: async function (item) {
      this.loading = true;
      await http
        .delete(`/api/brands/${item.id}`)
        .then(() => {
          this.load();
        })
        .catch((error) => console.log(error));
      this.clear();
      this.loading = false;
    },
    showUpdateDialog: function (item) {
      this.updateBrandDialog = true;
      this.id = item.id;
      this.name = item.name;
    },
    clear: function () {
      this.id = "";
      this.name = "";
    },
    cancelUpdateDialog: function () {
      this.updateBrandDialog = false;
      this.clear();
    },
    updateBrand: function () {
      this.updateBrandDialog = false;
      this.loading = true;
      http
        .put(`/api/brands/${this.id}`, {
          name: this.name,
        })
        .then((res) => {
          if (res.status === 200) {
            this.load();
          }
        });
      this.clear();
      this.loading = false;
    },
  },
  created() {
    this.load();
  },
};
</script>
