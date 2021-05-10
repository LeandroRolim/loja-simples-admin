<template>
  <div>
    <v-form>
      <v-card class="mx-auto mt-4" max-width="400" elevation="2">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            label="E-mail"
            outlined
            v-model="email"
            :error-messages="errors.email || ''"
          ></v-text-field>
          <v-text-field
            :type="obfuscate ? 'password' : 'type'"
            label="Senha"
            outlined
            :append-icon="obfuscate ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="obfuscate = !obfuscate"
            v-model="password"
            :error-messages="errors.password || ''"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text color="red darken-1" @click="dialog = true"
            >Esqueci a senha</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="login">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Esqueceu a senha?</v-card-title>
        <v-card-text
          >Consulte o desenvolvedor, pois esta função ainda não foi
          implementada.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <lr-loader :loading="loading" msg="Verificando e-mail e senha"></lr-loader>
  </div>
</template>

<script>
import LrLoader from "../../components/LrLoader.vue";
export default {
  name: "LoginBase",
  data: () => ({
    email: "admin@mail.com",
    password: "123456",
    dialog: false,
    loading: false,
    obfuscate: true,
    errors: {},
  }),
  methods: {
    async login() {
      this.loading = true;
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      this.loading = false;
    },
  },
  components: {
    LrLoader,
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    },
  },
  watch: {
    isAuthenticated(value) {
      if (value) this.$router.push({ name: "Admin" });
    },
  },
};
</script>

<style scoped></style>
