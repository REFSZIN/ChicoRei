<template class="Conteiner">
  <MenuBar/>
  <Carrinho/>
</template>

<script>
  import { defineComponent } from 'vue';
  import './CheckoutPage.less'
  import Carrinho from '../../components/Carrinho/Carrinho.vue';
  import MenuBar from '../../components/Menu/MenuBar.vue';
  export default defineComponent({
    name: 'CheckoutPage',
    components: {
      Carrinho,
      MenuBar,
    },
  });
</script>
