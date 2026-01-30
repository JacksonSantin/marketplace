<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    location="top right"
  >
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon class="mr-2" size="small">
          {{ getIcon }}
        </v-icon>
        <span>{{ snackbar.message }}</span>
      </div>
      
      <v-btn
        variant="text"
        icon
        size="x-small"
        @click="hideSnackbar"
        class="ml-2"
      >
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue';
import { useSnackbar } from '../composables/useSnackbar';

const { snackbar, hideSnackbar } = useSnackbar();

const getIcon = computed(() => {
  switch (snackbar.value.color) {
    case 'error':
      return 'mdi-alert-circle';
    case 'success':
      return 'mdi-check-circle';
    case 'info':
      return 'mdi-information';
    case 'warning':
      return 'mdi-alert';
    default:
      return 'mdi-information';
  }
});
</script>

<style scoped>
:deep(.v-snackbar__wrapper) {
  min-width: 300px;
  max-width: 500px;
}
</style>
