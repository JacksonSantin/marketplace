<template>
  <v-dialog v-model="isOpen" max-width="600" persistent>
    <v-card>
      <v-card-title class="bg-black text-white">
        <span class="text-h5">Finalizar Compra</span>
        <v-spacer />
        <v-btn icon variant="text" @click="close">
          <v-icon color="white" icon="mdi-close" />
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="controller.formData.value.nome"
                label="Nome Completo"
                :rules="[controller.rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-account"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                :model-value="controller.formData.value.telefone"
                label="Telefone"
                :rules="[controller.rules.required, controller.rules.phone]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-phone"
                placeholder="(00) 00000-0000"
                @update:model-value="formatPhoneNumber"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="controller.formData.value.email"
                label="E-mail"
                :rules="[controller.rules.required, controller.rules.email]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-email"
                type="email"
              />
            </v-col>

            <v-col cols="12" md="8">
              <v-text-field
                v-model="controller.formData.value.cidade"
                label="Cidade"
                :rules="[controller.rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-city"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="controller.formData.value.estado"
                label="Estado"
                :rules="[controller.rules.required, controller.rules.state]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-map-marker"
                placeholder="UF"
                maxlength="2"
              />
            </v-col>
          </v-row>
        </v-form>

        <v-divider class="my-4" />

        <div class="mb-3">
          <h3 class="text-h6 mb-3">Resumo do Pedido</h3>
          <v-list density="compact">
            <v-list-item v-for="item in cartItems" :key="item.id" class="px-0">
              <template v-slot:prepend>
                <v-avatar size="40" rounded class="mr-3">
                  <v-img :src="item.image" :alt="item.title" />
                </v-avatar>
              </template>

              <v-list-item-title class="text-body-2">
                {{ item.title }}
              </v-list-item-title>

              <v-list-item-subtitle class="text-caption">
                {{ item.quantity }}x {{ controller.formatPrice(item.price) }}
              </v-list-item-subtitle>

              <template v-slot:append>
                <span class="font-weight-bold">
                  {{ controller.formatPrice(item.price * item.quantity) }}
                </span>
              </template>
            </v-list-item>
          </v-list>

          <v-divider class="my-3" />

          <div class="d-flex justify-space-between align-center">
            <span class="text-h6">Total:</span>
            <span class="text-h5 font-weight-bold text-black">
              {{ controller.formatPrice(totalPrice) }}
            </span>
          </div>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-6 d-flex align-center justify-space-between">
        <v-btn variant="outlined" @click="close"> Cancelar </v-btn>

        <v-btn
          color="#25D366"
          variant="elevated"
          :disabled="!valid"
          size="large"
          prepend-icon="mdi-whatsapp"
          class="text-white"
          @click="sendWhatsApp"
        >
          Enviar Pedido por WhatsApp
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  cartItems: {
    type: Array,
    default: () => [],
  },
  controller: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "order-sent"]);

const form = ref(null);
const valid = ref(false);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const close = () => {
  isOpen.value = false;
};

const formatPhoneNumber = (inputValue) => {
  let value = (inputValue || '').replace(/\D/g, '');
  
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  
  let formatted = '';
  
  if (value.length > 0) {
    formatted = '(' + value.substring(0, 2);
    
    if (value.length > 2) {
      formatted += ') ';
      
      if (value.length <= 6) {
        formatted += value.substring(2);
      } else if (value.length <= 10) {
        // Formato fixo: (54) 9999-9999
        formatted += value.substring(2, 6) + '-' + value.substring(6);
      } else {
        // Formato celular: (54) 9 9999-9999
        formatted += value.substring(2, 3) + ' ' + value.substring(3, 7) + '-' + value.substring(7);
      }
    }
  }
  
  props.controller.formData.value.telefone = formatted;
};

const sendWhatsApp = async () => {
  const { valid: isValid } = await form.value.validate();

  if (!isValid) return;

  let message = "*Pedido do MarketPlace* \n\n";

  message += "*Dados do Cliente:*\n";
  message += `Nome: ${props.controller.formData.value.nome}\n`;
  message += `Telefone: ${props.controller.formData.value.telefone}\n`;
  message += `E-mail: ${props.controller.formData.value.email}\n`;
  message += `Cidade: ${props.controller.formData.value.cidade} - ${props.controller.formData.value.estado.toUpperCase()}\n\n`;

  message += "*Itens do Pedido:*\n\n";

  props.cartItems.forEach((item) => {
    message += `• *${item.title}*\n`;
    message += `  Quantidade: ${item.quantity}\n`;
    message += `  Preço unitário: ${props.controller.formatPrice(item.price)}\n`;
    message += `  Subtotal: ${props.controller.formatPrice(item.price * item.quantity)}\n\n`;
  });

  message += `*Total Geral: ${props.controller.formatPrice(totalPrice.value)}*`;

  const encodedMessage = encodeURIComponent(message);

  const phoneNumber = "5554996262629";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");

  emit("order-sent");
  close();
};
</script>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
}
</style>
