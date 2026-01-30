<template>
  <v-app-bar app elevation="2" color="primary">
    <v-container fluid class="d-flex align-center">
      <img 
        src="@/assets/logo.svg" 
        alt="MarketPlace Logo" 
        class="logo-image"
        width="110"
      />

      <v-spacer></v-spacer>

      <SearchBar 
        v-model="controller.searchQuery.value" 
        @update:modelValue="controller.searchQuery.value = $event"
        class="mx-4"
        style="max-width: 500px;"
      />

      <v-spacer></v-spacer>

      <CartIcon 
        :item-count="controller.cartItemCount.value"
        @click="$emit('open-cart')"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
import SearchBar from './SearchBar.vue'
import CartIcon from './CartIcon.vue'

defineProps({
  controller: {
    type: Object,
    required: true
  }
})

defineEmits(['search', 'open-cart'])
</script>

<style scoped>
.logo-image {
  cursor: pointer;
  transition: transform 0.2s;
}
.logo-image:hover {
  transform: scale(1.05)
}
.v-app-bar-title {
  cursor: pointer;
}
</style>
