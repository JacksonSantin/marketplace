<template>
  <v-footer class="bg-grey-darken-4 text-center mt-8">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <img 
            src="@/assets/logo_branco.svg" 
            alt="MarketPlace Logo"
            width="160"
            class="mb-3"
          />
          <p class="text-caption">
            Os melhores produtos você encontra aqui!
          </p>
        </v-col>

        <v-col cols="12" md="4">
          <h3 class="text-h6 mb-3">Links Úteis</h3>
          <div class="d-flex flex-column">
            <a href="#" class="text-decoration-none text-white mb-2">Sobre Nós</a>
            <a href="#" class="text-decoration-none text-white mb-2">Contato</a>
            <a href="#" class="text-decoration-none text-white mb-2">Política de Privacidade</a>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <h3 class="text-h6 mb-3">Redes Sociais</h3>
          <div class="d-flex justify-center gap-2">
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12">
          <p class="text-caption mb-0">
            © {{ controller.currentYear.value }} MarketPlace. Todos os direitos reservados.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
defineProps({
  controller: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
a:hover {
  opacity: 0.8;
}
</style>
