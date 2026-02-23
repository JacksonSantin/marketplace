<template>
  <v-card elevation="3" hover>
    <div class="position-relative">
      <v-img
        :src="product.image"
        :alt="product.title"
        height="250"
        cover
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <v-chip
        v-if="product.category"
        class="product-tag"
        color="info"
        variant="flat"
        size="small"
      >
        {{ product.category }}
      </v-chip>
    </div>

    <v-card-title class="text-h6">
      {{ product.title }}
    </v-card-title>

    <v-card-subtitle class="product-description">
      {{ product.description }}
    </v-card-subtitle>

    <v-card-text class="px-4 pb-4">
      <div class="d-flex justify-space-between align-center">
        <div class="text-h5 font-weight-bold text-black">
          {{ controller.formatPrice(props.product.price) }}
        </div>
        
        <v-tooltip text="Adicionar ao Carrinho" location="top">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              icon
              color="#1F3B53"
              v-bind="tooltipProps"
              @click="handleAddToCart"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  controller: {
    type: Object,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

const handleAddToCart = () => {
  emit("add-to-cart", props.product);
};
</script>

<style scoped>
.product-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  font-weight: bold;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 48px;
}
</style>
