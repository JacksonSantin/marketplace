<template>
  <v-navigation-drawer
    v-model="isOpen"
    location="right"
    temporary
    width="400"
  >
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Carrinho</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="isOpen = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container v-if="cartItems.length === 0" class="text-center py-8">
      <v-icon size="80" color="grey-lighten-1">mdi-cart-outline</v-icon>
      <p class="text-h6 mt-4">Seu carrinho está vazio</p>
      <p class="text-caption">Adicione produtos para começar suas compras!</p>
    </v-container>

    <v-list v-else>
      <v-list-item
        v-for="item in cartItems"
        :key="item.id"
        class="px-4 py-2"
      >
        <template v-slot:prepend>
          <v-avatar size="60" rounded>
            <v-img :src="item.image" :alt="item.title"></v-img>
          </v-avatar>
        </template>

        <v-list-item-title class="text-wrap mb-1">
          {{ item.title }}
        </v-list-item-title>
        
        <v-list-item-subtitle>
          {{ controller.formatPrice(item.price) }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="d-flex align-center gap-2">
            <v-btn
              icon
              size="x-small"
              variant="outlined"
              @click="decreaseQuantity(item.id)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            
            <span class="mx-2">{{ item.quantity }}</span>
            
            <v-btn
              icon
              size="x-small"
              variant="outlined"
              @click="increaseQuantity(item.id)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn
              icon
              size="x-small"
              color="error"
              variant="text"
              @click="removeItem(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>

    <template v-slot:append v-if="cartItems.length > 0">
      <v-divider></v-divider>
      
      <v-container class="pa-4">
        <div class="d-flex justify-space-between align-center mb-4">
          <span class="text-h6">Total:</span>
          <span class="text-h5 font-weight-bold text-black">
            {{ controller.formatPrice(totalPrice) }}
          </span>
        </div>

        <v-btn
          block
          color="#1F3B53"
          size="large"
          prepend-icon="mdi-check-circle"
          @click="openCheckoutDialog"
        >
          Finalizar Compra
        </v-btn>

        <v-btn
          block
          variant="outlined"
          class="mt-2"
          @click="clearCart"
        >
          Limpar Carrinho
        </v-btn>
      </v-container>
    </template>
  </v-navigation-drawer>

  <DialogForm
    v-model="showCheckoutDialog"
    :cart-items="cartItems"
    :controller="controller"
    @order-sent="handleOrderSent"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import DialogForm from './DialogForm.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  cartItems: {
    type: Array,
    default: () => []
  },
  controller: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue', 'increase-quantity', 'decrease-quantity', 'remove-item', 'clear-cart'])

const showCheckoutDialog = ref(false)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

const openCheckoutDialog = () => {
  showCheckoutDialog.value = true
}

const handleOrderSent = () => {
  emit('clear-cart')
  isOpen.value = false
}

const increaseQuantity = (itemId) => {
  emit('increase-quantity', itemId)
}

const decreaseQuantity = (itemId) => {
  emit('decrease-quantity', itemId)
}

const removeItem = (itemId) => {
  emit('remove-item', itemId)
}

const clearCart = () => {
  emit('clear-cart')
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
