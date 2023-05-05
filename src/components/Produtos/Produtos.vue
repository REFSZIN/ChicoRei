<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="6">
        <h1 class="title text-h2 mb-12 text-left">{{produtosFiltrados[0].category}}</h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          class="d-grid"
          v-model="filtroCategoria"
          :items="['', ...categorias]"
          label="Filtrar por categoria"
        >  
        </v-select>
      </v-col>
      </v-row>
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
              <v-img :src="produto.images[0]" 
              aspect-ratio="1" 
              @mouseenter="produto.hover = true" 
              @mouseleave="produto.hover = false">
                <template #placeholder>
                  <v-img :src="produto.images[0]" 
                    :hover="produto.images[1]"  
                    aspect-ratio="1">
                  </v-img>
                </template>
              </v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-title>{{ produto.title }}</v-card-title>
              <v-card-text>{{ produto.description }}</v-card-text>
              <v-card-subtitle>R$ {{ produto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="black" @click="adicionarCarrinho(produto) && setup(produto.title)">Adicionar ao carrinho</v-btn>
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
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  export default {
    name: 'ProdutosComponent',
    computed: {
      ...mapGetters(['produtos']),
      categorias() {
        const categorias = new Set();
        this.produtos.forEach(produto => categorias.add(produto.category));
        return Array.from(categorias).filter(categoria => categoria !== 'Todos');
      },
      produtosFiltrados() {
        if (this.filtroCategoria === ''){
          return this.produtos;
        }
        return this.produtos.filter(produto => produto.category === this.filtroCategoria);
      },
    },
    data: () => ({
      filtroCategoria: '',
    }),
    methods: {
      setup() {
        toast("Adicionado ao Carrinho", {
          autoClose: 1000,
        });
      },
      ...mapActions(['adicionarCarrinho'] ),
    },
  };
</script>