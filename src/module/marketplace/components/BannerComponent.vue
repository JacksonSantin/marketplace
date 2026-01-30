<template>
  <v-sheet
    class="banner-container"
    :height="height"
    rounded
    elevation="4"
  >
    <v-img
      :src="backgroundImage"
      :height="height"
      cover
      class="banner-background"
    >
      <div class="banner-overlay" :style="{ opacity: overlayOpacity }"></div>
      
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card
          class="glass-card pa-8 text-center"
          max-width="800"
          elevation="0"
        >
          <h1 class="text-h3 font-weight-bold mb-4 text-white">
            {{ title }}
          </h1>
          <p class="text-h6 mb-0 text-white">
            {{ message }}
          </p>
        </v-card>
      </v-container>
    </v-img>
  </v-sheet>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Bem-vindo ao MarketPlace'
  },
  message: {
    type: String,
    default: 'Encontre os melhores produtos com os melhores preços!'
  },
  backgroundImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop'
  },
  overlayOpacity: {
    type: Number,
    default: 0.9
  },
  height: {
    type: [String, Number],
    default: 400
  }
})
</script>

<style scoped>
.banner-container {
  position: relative;
  overflow: hidden;
}

.banner-background {
  position: relative;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.glass-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glass-card h1,
.glass-card p {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
