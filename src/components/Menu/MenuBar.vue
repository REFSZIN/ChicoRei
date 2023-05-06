<template>
    <v-app-bar class="d-flex justify-space-between d-flex justify-content-center justify-center">
      <v-app-bar-nav-icon class="ml-sm-12" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-card-actions class="d-flex align-center">
        <router-link to="/" class="d-flex justify-center">
          <img
            class="logo"
            src="https://chico-rei.imgix.net/images/site/2021/brand/chico-rei-text.svg"
            aspect-ratio="1"
            alt="logo"
          />
        </router-link>
      </v-card-actions>
      <v-spacer />
      <router-link class="mr-sm-12" to="/checkout">
        <v-app-bar-nav-icon>
          <v-badge color="black" 
          :content="carrinho.length" 
          offset-x="-20" 
          offset-y="-20"></v-badge>
          <v-icon class="carticon">mdi-cart</v-icon>
        </v-app-bar-nav-icon>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :width="280"
      clipped
      app
      class="menu d-flex text-center"
      @click="drawer = !drawer"
      >
      <h2 class="d-flex titlemenu">
        <img
        class="d-flex Logomenu"
        src="https://chico-rei.imgix.net/images/site/2021/favicon/android-icon-192x192.png?auto=compress,format&q=65" 
        alt="Logomenu"/>Menu
        <v-spacer/>
        <v-icon class="d-flex flex-row mb-6 ml-12 exit" @click="!drawer" >mdi-close</v-icon>
      </h2>
      <v-list>
        <v-list-item v-for="(item, index) in menuItens" :key="index" :to="item.rota">
          <v-icon>{{ item.icone }}</v-icon>
          <v-list-item-title>{{ item.titulo }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <hr class="hr-4"/>
      <v-list class="">
        <v-list-item-title>Faça a sua primeira compra na </v-list-item-title>
        <v-list-item-title>Chico Rei com toda a tranquilidade :)</v-list-item-title>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  import './MenuBar.less';
  import { mapGetters } from 'vuex';

  export default {
    computed: {
    ...mapGetters(['carrinho']),
    },
    data: () => ({
      drawer: false,
      menuItens: [
        { titulo: 'Produtos', rota: '/', icone: 'mdi-tag' },
        { titulo: 'Carrinho', rota: '/checkout', icone: 'mdi-shopping' },
      ],
    }),
  };
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(-300px);
  }
  to {
    transform: translateX(0);
  }
}
.menu-enter-active {
  animation: slide-in 0.5s forwards;
}
.menu-leave-active {
  animation: slide-in 0.5s reverse forwards;
}
.menu-enter,
.menu-leave-to {
  transform: translateX(-300px);
}
</style>