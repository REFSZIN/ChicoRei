<template class="Conteiner">
  <MenuBar/>
  <Produtos/>
</template>

<script>
  import { defineComponent } from 'vue';
  import './HomePage.less'
  import Produtos from '../../components/Produtos/Produtos.vue';
  import MenuBar from '../../components/Menu/MenuBar.vue';
  export default defineComponent({
    name: 'HomePage',
    components: {
      Produtos,
      MenuBar,
    },
  });
</script>
