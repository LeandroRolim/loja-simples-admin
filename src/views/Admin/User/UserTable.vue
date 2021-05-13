<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      class="elevation-2"
      :loading="loading"
      loading-text="Carregando dados"
      sort-by="name"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuários</v-toolbar-title>
          <v-divider inset vertical class="mx-4"></v-divider>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="newUserDialog = true">Novo</v-btn>
          <lr-new-user
            :dialog="newUserDialog"
            @cancel="newUserDialog = false"
            @save="newUser"
          ></lr-new-user>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" disabled>mdi-pencil</v-icon>
        <v-icon small class="red--text" @click="remove(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import http from "../../../plugins/http";
import LrNewUser from "../../../components/LrNewUser";
export default {
  name: "UserTable",
  data: () => ({
    search: "",
    loading: false,
    newUserDialog: false,
    headers: [
      {
        text: "Usuário",
        align: "start",
        sortable: true,
        value: "name",
      },
      {
        text: "E-mail",
        sortable: false,
        value: "email",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
  }),
  methods: {
    load: async function () {
      this.loading = true;
      http.get("/api/users").then(({ data }) => {
        this.users = data.data;
        this.loading = false;
      });
    },
    remove: async function (item) {
      this.loading = true;
      await http
        .delete(`/api/users/${item.id}`)
        .then(() => {
          this.load();
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    newUser: function (event) {
      this.users.push(event);
      this.newUserDialog = false;
    },
  },
  created() {
    this.load();
  },
  components: {
    LrNewUser,
  },
};
</script>
