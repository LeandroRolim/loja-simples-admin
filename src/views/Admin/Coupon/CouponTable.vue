<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="coupons"
      :items-per-page="10"
      class="elevation-2"
      :loading="loading"
      loading-text="Carregando dados"
      sort-by="name"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cupons</v-toolbar-title>
          <v-divider inset vertical class="mx-4"></v-divider>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="newCouponDialog" max-width="400px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="primary">Novo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cadastro de cupom</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Cupom"
                  required
                  outlined
                  v-model="code"
                ></v-text-field>
                <v-text-field
                  type="number"
                  label="Valor"
                  required
                  outlined
                  v-model="value"
                ></v-text-field>
                <v-checkbox
                  label="É porcentagem"
                  outlined
                  v-model="is_percentage"
                ></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="newCouponDialog = false" class="red--text">
                  Cancelar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="newCoupon" class="primary">Gravar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2 orange--text" @click="showUpdateDialog(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="red--text" @click="remove(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
    <v-dialog v-model="updateCouponDialog" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Atualizar de cupom</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Cupom"
            required
            outlined
            v-model="code"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Valor"
            required
            outlined
            v-model="value"
          ></v-text-field>
          <v-checkbox
            label="É porcentagem"
            outlined
            v-model="is_percentage"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelUpdateDialog" class="red--text">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="updateCoupon" class="primary">Gravar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "../../../plugins/http";
export default {
  name: "CouponTable",
  data: () => ({
    search: "",
    loading: false,
    newCouponDialog: false,
    updateCouponDialog: false,
    id: "",
    code: "",
    value: 0,
    is_percentage: "",
    headers: [
      {
        text: "Código",
        align: "start",
        sortable: true,
        value: "code",
      },
      {
        text: "Valor",
        sortable: false,
        value: "value",
      },
      {
        text: "Porcentagem?",
        sortable: false,
        value: "is_percentage",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    coupons: [],
  }),
  methods: {
    load: async function () {
      this.loading = true;
      http.get("/api/coupons").then(({ data }) => {
        this.coupons = data.data;
        this.loading = false;
      });
    },
    newCoupon: async function () {
      this.newCouponDialog = false;
      this.loading = true;
      const coupon = {
        code: this.code,
        value: this.value,
        is_percentage: this.is_percentage ? 1 : 0,
      };
      await http.post("/api/coupons", coupon).then((res) => {
        if (res.status === 201) {
          this.coupons.push(res.data.data);
        }
      });
      this.loading = false;
    },
    remove: async function (item) {
      this.loading = true;
      await http
        .delete(`/api/coupons/${item.id}`)
        .then(() => {
          this.load();
        })
        .catch((error) => console.log(error));
      this.clear();
      this.loading = false;
    },
    showUpdateDialog: function (item) {
      this.updateCouponDialog = true;
      this.id = item.id;
      this.code = item.code;
      this.value = item.value;
      this.is_percentage = item.is_percentage;
    },
    clear: function () {
      this.id = "";
      this.code = "";
      this.value = "";
      this.is_percentage = "";
    },
    cancelUpdateDialog: function () {
      this.updateCouponDialog = false;
      this.clear();
    },
    updateCoupon: function () {
      this.updateCouponDialog = false;
      this.loading = true;
      http
        .put(`/api/coupons/${this.id}`, {
          code: this.code,
          value: this.value,
          is_percentage: this.is_percentage,
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
