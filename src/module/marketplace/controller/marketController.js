import { computed, onMounted, ref, watch } from "vue";
import Products from "../domain/model/products";
import { useSnackbar } from "../composables/useSnackbar";

const CART_STORAGE_KEY = 'marketplace_cart';

const marketController = (usecase) => () => {
  const { showError, showSuccess } = useSnackbar();
  
  const currentYear = ref(new Date().getFullYear());
  const loading = ref(false);
  const produto = ref(new Products());
  const produtos = ref([]);
  const searchQuery = ref("");
  const cartItems = ref([]);
  const isCartOpen = ref(false);

  // Carregar carrinho do localStorage
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        cartItems.value = JSON.parse(savedCart);
      }
    } catch (error) {
      showError('Erro ao carregar carrinho: ' + error.message);
    }
  };

  const saveCartToStorage = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
    } catch (error) {
      showError('Erro ao salvar carrinho: ' + error.message);
    }
  };

  watch(cartItems, () => {
    saveCartToStorage();
  }, { deep: true });

  const filteredProducts = computed(() => {
    if (
      !searchQuery.value ||
      searchQuery.value.trim() === ""
    ) {
      return produtos.value;
    }

    const query = searchQuery.value.toLowerCase().trim();
    return produtos.value.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(query);

      const descriptionMatch = product.description
        ?.toLowerCase()
        .includes(query);

      const categoryMatch = product.category?.toLowerCase().includes(query);

      const priceMatch = product.price?.toString().includes(query);

      return titleMatch || descriptionMatch || categoryMatch || priceMatch;
    });
  });

  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  });

  onMounted(async () => {
    loadCartFromStorage();
    
    try {
      loading.value = true;
      produtos.value = await usecase.getProdutosUseCase();
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  });

  const addToCart = (product) => {
    try {
      const existingItem = cartItems.value.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        showSuccess('Quantidade atualizada no carrinho!');
      } else {
        cartItems.value.push({
          ...product,
          quantity: 1
        });
        showSuccess('Produto adicionado ao carrinho!');
      }
    } catch (error) {
      showError('Erro ao adicionar produto: ' + error.message);
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
    }
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        removeFromCart(productId);
      }
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return {
    currentYear,
    loading,
    produto,
    produtos,
    searchQuery,
    filteredProducts,
    cartItems,
    isCartOpen,
    cartItemCount,
    cartTotal,
    formatPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleCart,
  };
};

export default marketController;
