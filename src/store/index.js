import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import service from '../plugins/service'
const store = createStore(({
plugins: [createPersistedState({
  storage: localStorage,
})],
state: {
  produtos: [
    {
      id: 1,
      category: 'Estampadas',
      images: ['https://chicorei.imgix.net/16591/33ebe091-befa-11eb-a27b-cb6840d2940c.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/16591/91f25ca0-644a-11ec-90f9-19f67c14f4c0.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA ALCEU DISPOR',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 79.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 2,
      category: 'Estampadas',
      images: ['https://chicorei.imgix.net/8487/494240e1-28af-11ed-b984-17efb5f107ae.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/8487/494240e0-28af-11ed-b984-17efb5f107ae.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: "CAMISETA CAPYBARA'S ROAD",
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 74.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 3,
      category: 'Estampadas',
      images: ['https://chicorei.imgix.net/18630/fe849c90-303f-11ed-bbbf-5363f251770f.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/18630/fe847580-303f-11ed-bbbf-5363f251770f.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA GOGH NIGHT',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 79.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 4,
      category: 'Básicas',
      images: ['https://chicorei.imgix.net/4178/b2024211-1748-11ed-b5c6-2b4175e2bfd0.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/4178/b2026920-1748-11ed-b5c6-2b4175e2bfd0.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA BÁSICA PRETO NOIR',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price:  64.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 5,
      category: 'Básicas',
      images: ['https://chicorei.imgix.net/19753/bcdef570-1360-11ed-8f32-156c38e95e09.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/19753/bcdf1c81-1360-11ed-8f32-156c38e95e09.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA MANO LISO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 79.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 6,
      category: 'Básicas',
      images: ['https://chicorei.imgix.net/17705/218cb5f3-b964-11eb-8a62-23bc1cd75f5f.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/17705/218cb5f4-b964-11eb-8a62-23bc1cd75f5f.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA BOLSO VERDE SÁLVIA',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price:  64.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 7,
      category: 'Infantil',
      images: ['https://chicorei.imgix.net/20612/e25a2e40-5493-11ed-854c-edc36001ab23.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top','https://chicorei.imgix.net/20612/e25a2e41-5493-11ed-854c-edc36001ab23.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA INFANTIL ATO REVOLUCIONÁRIO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1,
      selecionado: false,
    },
    {
      id: 8,
      category: 'Infantil',
      images: ['https://chicorei.imgix.net/17761/de4b1c61-4381-11ed-b409-1315851d0d17.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/17761/de4af550-4381-11ed-b409-1315851d0d17.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA INFANTIL POKÉTONE',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 47.99,
      amount: 1,
      selecionado: false,
    },
    {
      id: 9,
      category: 'Infantil',
      images: ['https://chicorei.imgix.net/17791/1755bed1-43f4-11ed-9e5c-a3cb31219578.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/17791/262b0c30-43f4-11ed-9e5c-a3cb31219578.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'CAMISETA INFANTIL LEITURA',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1,
      selecionado: false,
    },
    {
      id: 10,
      category: 'Moletons',
      images: ['https://chicorei.imgix.net/21890/eb9e30e0-eced-11ec-8b49-57d62c284c88.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top', 'https://chicorei.imgix.net/21890/02dabdb1-0d09-11ed-ac27-8d2f3515f4a2.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top'],
      title: 'MOLETOM BUTECO RULES',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 174.99,
      amount: 1,
      selecionado: false,
    }
  ],
  carrinho: [],
  checkout: { 
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cartao: {
      numerocc: '',
      titular: '',
      vencimento: '',
      cvc: '',
    },
  },
},

getters: {
  produtos(state) {
    return state.produtos;
  },
  carrinho(state) {
    return state.carrinho;
  },
  checkout(state) {
    return state.checkout;
  },
},

mutations: {
  SET_PRODUTOS(state, produtos) {
    state.produtos = produtos;
  },
  ADD_CARRINHO(state, produto) {
    const index = state.carrinho.findIndex(item => item.id === produto.id);
    if (index !== -1) {
      state.carrinho[index].amount += 1;
    } else {
      state.carrinho.push(produto);
    }
  },
  REMOVE_CARRINHO(state) {
    state.carrinho = [];
  },  
  aumentarQuantidade(state, produto) {
    const index = state.carrinho.findIndex(item => item.id === produto.id);
    if (index !== -1) {
      state.carrinho[index].amount += 1;
    }
  },
  SET_CHECKOUT(state, checkout) {
    state.checkout = checkout;
  },
  diminuirQuantidade(state, produto) {
    const index = state.carrinho.findIndex(item => item.id === produto.id);
    if (index !== -1) {
      const item = state.carrinho[index];
      if (item.amount === 1) {
        state.carrinho.splice(index, 1);
      } else {
        item.amount -= 1;
      }
    }
  },
},

actions: {
  async fetchProdutos({ commit }) {
    const produtos = await service.getProdutos();
    commit('SET_PRODUTOS', produtos);
  },
  adicionarCarrinho({ commit }, produto) {
    commit('ADD_CARRINHO', produto);
  },
  removerCarrinho({ commit }, produto) {
    commit('REMOVE_CARRINHO', produto);
  },
  finalizarCheckout({ commit }, checkout) {
    commit('SET_CHECKOUT', checkout);
  },
},
}))

export default store;