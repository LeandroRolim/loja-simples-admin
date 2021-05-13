<template>
  <div>
    <v-dialog v-model="dialog" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Cadastro de usuário</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nome"
            required
            outlined
            v-model="name"
          ></v-text-field>
          <v-text-field
            type="email"
            label="E-mail"
            required
            outlined
            v-model="email"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Senha"
            required
            outlined
            v-model="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="$emit('cancel')" class="red--text">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="save()" class="primary">Gravar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "../plugins/http";
export default {
  name: "LrNewUser",
  data: () => ({
    obfuscate: true,
    name: "",
    email: "",
    password: "",
    erros: {},
  }),
  methods: {
    save: async function () {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      await http
        .post("/api/users", newUser)
        .catch((error) => (this.errors = error.response.data.errors || {}));
      //TODO: falta tratamente de erro e sucesso
      this.$emit("save", newUser);
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
  props: {
    dialog: {
      default: false,
      required: true,
      type: Boolean,
    },
  },
};
</script>
