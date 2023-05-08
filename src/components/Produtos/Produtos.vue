<template>
  <v-container>
    <v-row align="center">
      <v-carousel hide-delimiters 
      :show-arrows="false" 
      cycle 
      :interval="5000" 
      max-width="100%" 
      max-height="300px" 
      height="auto" 
      width="auto"
      v-show="showCarousel">
        <v-carousel-item v-for="(item, i) in banners" :key="i" cover>
          <v-img :src="item"
            max-height="100vh"
            max-width="100vw" 
          height="auto"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-col cols="12" md="6">
        <h1 class="title text-h3 mb-lm-12 text-left">{{ filtroCategoria === 'Todos Produtos' ? 'Todos Produtos' : produtosFiltrados[0].category }}</h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-select class="d-grid mt-3" 
        v-model="filtroCategoria" 
        :items="['Todos Produtos', ...categorias]" 
        label="Filtrar por categoria"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="produto in produtosFiltrados"
        :key="produto.id"
        cols="12"
        sm="6"
        md="6"
        lg="4">
        <v-card class="produto-card">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-hover v-slot="{ hover }">
                <v-img :src="hover ? produto.images : produto.images[1]"
                  aspect-ratio="1"
                  class="produto-img"
                  alt="Produto"></v-img>
              </v-hover>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-title class="titleCard text-wrap">{{ produto.title }}</v-card-title>
              <v-card-text class="descriptionCard text-wrap">{{ produto.description }}</v-card-text>
              <v-card-subtitle>R$ {{ produto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</v-card-subtitle>
              <v-card-actions>
              <template v-if="!produto.selecionado || getCarrinhoAmount(produto.id) === 0">
                <v-btn color="black" @click="adicionarCarrinho(produto); setup(produto.title); produto.selecionado = true">Adicionar ao carrinho</v-btn>
              </template>
              <template v-else>
                <v-btn color="black" @click="diminuirQuantidade(produto); if (getCarrinhoAmount(produto.id) === 0) { produto.selecionado = false; removerCarrinho(produto); }">-</v-btn>
                <span>{{ getCarrinhoAmount(produto.id) }}</span>
                <v-btn color="black" @click="aumentarQuantidade(produto)">+</v-btn>
              </template>
            </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapMutations, mapActions,mapGetters } from 'vuex'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import banner1 from '../../assets/images/banner1.png'
  import banner2 from '../../assets/images/banner2.png'
  export default {
    name: 'ProdutosComponent',

    computed: {
      ...mapState(['carrinho', 'produtos']),
      ...mapGetters(['checkout']),

      categorias() {
        const categorias = new Set();
        this.produtos.forEach((produto) => categorias.add(produto.category));
        return Array.from(categorias).filter((categoria) => categoria !== 'Todos');
      },

      produtosFiltrados() {
        if (this.filtroCategoria === 'Todos Produtos') {
          return this.produtos;
        }
        console.log(this.carrinho, this.produtos);
        return this.produtos.filter((produto) => produto.category === this.filtroCategoria);
      },
    },

    data() {
      return {
        filtroCategoria: 'Todos Produtos',
        showCarousel: true,
        banners: [banner1, banner2],
      };
    },

    methods: {
      getCarrinhoAmount(produtoId) {
        const item = this.carrinho.find(item => item.id === produtoId);
        return item ? item.amount : 0;
      },
      setup(produtoTitle) {
        toast(`${produtoTitle} adicionado ao carrinho!`, {
          autoClose: 1000,
        });
      },

      ...mapActions(['fetchProdutos', 'adicionarCarrinho', 'removerCarrinho', 'finalizarCheckout']),
      ...mapMutations(['aumentarQuantidade', 'diminuirQuantidade']),
    },

    mounted() {
      this.fetchProdutos();
    },
  };
</script>