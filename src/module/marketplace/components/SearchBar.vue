<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    prepend-inner-icon="mdi-magnify"
    placeholder="Pesquisar produtos..."
    variant="outlined"
    density="compact"
    hide-details
    clearable
    bg-color="white"
  ></v-text-field>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
