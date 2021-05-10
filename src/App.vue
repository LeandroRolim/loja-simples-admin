<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-toolbar-title>Loja de demonstração</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon color="white">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-menu offset-y left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined v-bind="attrs" v-on="on">
            {{ $store.state.auth.user.name || "Visitante" }}
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list v-if="$store.state.auth.isAuthenticated">
          <v-list-item disabled>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="logout">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    this.$store.dispatch("checkUser");
  },
};
</script>
