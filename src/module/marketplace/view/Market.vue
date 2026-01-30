<template>
  <header-component
    :controller="controller"
    @open-cart="controller.toggleCart()"
  />
  <banner-component :controller="controller" />
  <product-grid :controller="controller" @add-to-cart="controller.addToCart" />
  <cart-drawer
    :controller="controller"
    :cart-items="controller.cartItems.value"
    v-model="controller.isCartOpen.value"
    @increase-quantity="controller.increaseQuantity"
    @decrease-quantity="controller.decreaseQuantity"
    @remove-item="controller.removeFromCart"
    @clear-cart="controller.clearCart"
  />
  <snackbar-component />
  <footer-component :controller="controller" />
</template>

<script setup>
import { marketControllerImpl } from "../di/di";

import HeaderComponent from "@/module/marketplace/components/HeaderComponent.vue";
import BannerComponent from "@/module/marketplace/components/BannerComponent.vue";
import ProductGrid from "@/module/marketplace/components/ProductGrid.vue";
import CartDrawer from "@/module/marketplace/components/CartDrawer.vue";
import SnackbarComponent from "@/module/marketplace/components/SnackbarComponent.vue";
import FooterComponent from "@/module/marketplace/components/FooterComponent.vue";

const controller = marketControllerImpl();
</script>
