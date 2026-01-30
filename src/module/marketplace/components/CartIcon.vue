<template>
  <v-btn
    icon
    size="large"
    @click="$emit('click')"
  >
    <v-badge
      :content="itemCount"
      :model-value="itemCount > 0"
      color="error"
      offset-x="10"
      offset-y="10"
    >
      <v-icon size="28">mdi-cart</v-icon>
    </v-badge>
  </v-btn>
</template>

<script setup>
defineProps({
  itemCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['click'])
</script>
