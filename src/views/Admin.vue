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
          <v-list-item link :to="{ name: 'admin.dashboard' }">
            <v-list-item-icon>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Dashboard </v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{ name: 'admin.category' }">
            <v-list-item-icon>
              <v-icon>mdi-shape</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Categorias </v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{ name: 'admin.product' }">
            <v-list-item-icon>
              <v-icon>mdi-tshirt-crew</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Produtos</v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{ name: 'admin.coupon' }">
            <v-list-item-icon>
              <v-icon>mdi-cards</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cupons</v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{ name: 'admin.user' }">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Usuários </v-list-item-title>
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
