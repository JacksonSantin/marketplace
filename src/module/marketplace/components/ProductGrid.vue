<template>
  <v-container>
    <v-row v-if="controller.loading.value" class="my-8">
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else-if="controller.filteredProducts.value.length === 0" class="my-8">
      <v-col cols="12" class="text-center">
        <v-icon size="80" color="grey-lighten-1">mdi-package-variant</v-icon>
        <p class="text-h6 mt-4">Nenhum produto encontrado</p>
        <p class="text-caption">Tente ajustar sua pesquisa</p>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="product in controller.filteredProducts.value"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard 
          :product="product" 
          :controller="controller"
          @add-to-cart="(product) => emit('add-to-cart', product)" 
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
  controller: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

</script>
