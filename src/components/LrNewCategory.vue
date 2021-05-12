<template>
  <div>
    <v-dialog v-model="dialog" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Cadastro de categoria</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Slug"
            required
            outlined
            v-model="slug"
          ></v-text-field>
          <v-text-field
            label="Categoria"
            required
            outlined
            v-model="category"
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
  name: "LrNewCategory",
  data: () => ({
    category: "",
    slug: "",
  }),
  methods: {
    save: function () {
      const newCategory = {
        slug: this.slug,
        category: this.category,
      };
      http.post("/api/categories", newCategory); //TODO: falta tratamente de erro e sucesso
      this.$emit("save", newCategory);
      this.category = "";
      this.slug = "";
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
