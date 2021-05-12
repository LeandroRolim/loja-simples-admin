<template>
  <div>
    <v-navigation-drawer
      permanent
      bottom
      absolute
      expand-on-hover
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-tshirt-crew</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Produtos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cards</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cupons</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid class="pl-16">
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>
