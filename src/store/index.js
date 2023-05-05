import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import service from '../plugins/service'
import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
const store = createStore(({
plugins: [createPersistedState({
  storage: localStorage,
})],
state: {
  produtos: [
    {
      id: 1,
      category: 'Camisetas',
      images: [image1, image2],
      title: 'CAMISETA ALCEU DISPOR',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 100.00,
      amount: 1
    },
    {
      id: 2,
      category: 'Camisas',
      images: [image2, image1],
      title: 'CAMISETA MANO LISO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
    {
      id: 4,
      category: 'Estampadas',
      images: [image2, image1],
      title: 'CAMISETA MANO LISO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
    {
      id: 5,
      category: 'Estampadas',
      images: [image1, image2],
      title: 'CAMISETA ALCEU DISPOR',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
    {
      id: 6,
      category: 'Camisas',
      images: [image2, image1],
      title: 'CAMISETA MANO LISO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
    {
      id: 9,
      category: 'Camisas',
      images: [image2, image1],
      title: 'CAMISETA MANO LISO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
    {
      id: 7,
      category: 'Camisas',
      images: [image1, image2],
      title: 'CAMISETA ALCEU DISPOR',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 300.00,
      amount: 1
    },
    {
      id: 8,
      category: 'Camisas',
      images: [image2, image1],
      title: 'CAMISETA MANO LISO',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
    {
      id: 3,
      category: 'Infantil',
      images: [image1, image2],
      title: 'CAMISETA ALCEU DISPOR',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Interagi no mé, cursus quis, vehicula ac nisi.Manduma pindureta quium dia nois paga.Diuretics paradis num copo é motivis de denguis.',
      price: 200.00,
      amount: 1
    },
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
    state.carrinho.push(produto);
  },
  REMOVE_CARRINHO(state, produto) {
    state.carrinho = state.carrinho.filter(p => p !== produto);
  },
  SET_CHECKOUT(state, checkout) {
    state.checkout = checkout;
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