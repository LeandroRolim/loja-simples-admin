<template>
  <div>
    <h1>Dashboard</h1>
    <v-row>
      <v-col
        sm="4"
        md="3"
        xl="2"
        cols="12"
        v-for="stat in stats"
        :key="stat.title"
      >
        <v-card class="pa-2">
          <v-card-title>{{ stat.title }}</v-card-title>
          <v-card-text>Total: {{ stat.total }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from "../../plugins/http";

export default {
  name: "Dashboard",
  data: () => ({
    stats: [],
  }),
  created() {
    http.get("/api/stats").then((res) => {
      this.stats = res.data;
    });
  },
};
</script>
