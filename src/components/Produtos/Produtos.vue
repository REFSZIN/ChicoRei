<template>
  <v-container>
    <v-select
      class="d-grid"
      v-model="filtroCategoria"
      :items="categorias"
      label="Filtrar por categoria"
    ></v-select>
    <h1 class="title text-h2 mb-12">{{produtosFiltrados[0].category}}</h1>
    <v-row>
      <v-col
        v-for="produto in produtosFiltrados"
        :key="produto.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
      >
        <v-card class="produto-card">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-img :src="produto.images[0]" aspect-ratio="1"></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-title>{{ produto.title }}</v-card-title>
              <v-card-text>{{ produto.description }}</v-card-text>
              <v-card-subtitle>R${{ produto.price }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="black" @click="adicionarCarrinho(produto)">Adicionar ao carrinho</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'ProdutosComponent',
    computed: {
      ...mapGetters(['produtos']),
      categorias() {
        const categorias = new Set();
        this.produtos.forEach(produto => categorias.add(produto.category));
        return Array.from(categorias);
      },
      produtosFiltrados() {
        if (!this.filtroCategoria) {
          return this.produtos;
        }
        return this.produtos.filter(produto => produto.category === this.filtroCategoria);
      },
    },
    data: () => ({
      filtroCategoria: '',
    }),
    methods: {
      ...mapActions(['adicionarCarrinho']),
    },
  };
</script>