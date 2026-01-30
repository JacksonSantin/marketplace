import { ref } from 'vue';

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
  timeout: 3000
});

export function useSnackbar() {
  const showSnackbar = (message, color = 'error', timeout = 3000) => {
    snackbar.value = {
      show: true,
      message,
      color,
      timeout
    };
  };

  const showError = (message) => {
    showSnackbar(message, 'error');
  };

  const showSuccess = (message) => {
    showSnackbar(message, 'success');
  };

  const showInfo = (message) => {
    showSnackbar(message, 'info');
  };

  const showWarning = (message) => {
    showSnackbar(message, 'warning');
  };

  const hideSnackbar = () => {
    snackbar.value.show = false;
  };

  return {
    snackbar,
    showSnackbar,
    showError,
    showSuccess,
    showInfo,
    showWarning,
    hideSnackbar
  };
}
