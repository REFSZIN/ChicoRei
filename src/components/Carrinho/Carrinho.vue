<template>
  <v-container>
    <v-card>
      <h1>Finalização do pedido</h1>
      <v-card-text>
        <v-row cols="2" md="12" >
          <v-col cols="12" md="6">
            <h2>Informaçôes de contato</h2>
            <v-form ref="form" @submit.prevent="validarCampos">
              <v-text-field label="E-mail"
                v-model="checkout.email"
                :rules="[emailRule, requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Telefone"
                v-model="checkout.telefone"
                :rules="[phoneRule, requiredRule]"
                required>
              </v-text-field>
              <h2>Informaçôes de entrega</h2>
              <v-text-field label="CEP"
                v-model="checkout.cep"
                :rules="[cepRule, requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Rua"
                v-model="checkout.rua"
                :rules="[requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Número"
                v-model="checkout.numero"
                :rules="[requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Bairro"
                v-model="checkout.bairro"
                :rules="[requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Cidade"
                v-model="checkout.cidade"
                :rules="[requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Estado"
                v-model="checkout.estado"
                :rules="[requiredRule]"
                required>
              </v-text-field>
              <h2>Informaçôes de Pagamento</h2>
              <v-text-field label="Número do cartão"
                v-model="checkout.cartao.numerocc"
                :rules="[creditCardRule, requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Titular do cartão"
                v-model="checkout.cartao.titular"
                :rules="[requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="Data de vencimento"
                v-model="checkout.cartao.vencimento"
                :rules="[dateRule, requiredRule]"
                required>
              </v-text-field>
              <v-text-field label="CVC"
                v-model="checkout.cartao.cvc"
                :rules="[cvcRule, requiredRule]"
                required>
              </v-text-field>
            </v-form>
          </v-col>
          <v-col cols="12" md="6">
            <h2>Sua sacola</h2>
            <ul>
              <li v-for="(item, index) in carrinho" :key="index">
                {{ item.imagens }}
                {{ item.nome }} - {{ item.preco }} - {{ item.quantidade }}
                <v-btn @click="adicionarAoCarrinho(item)" text color="primary">+</v-btn>
                <v-btn @click="removerDoCarrinho(item)" text color="error">-</v-btn>
              </li>
            </ul>
            <v-divider></v-divider>
            <v-card-text class="text-right">
              Total: {{ total }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <router-link to="/">Continuar Comprando</router-link>
        <v-btn :disabled="!carrinho.length" color="success" @click="finalizarCompra">Finalizar Compra</v-btn>
        <v-overlay :value="carregando">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import './Carrinho.less'
  import { mapState, mapMutations, mapActions,mapGetters } from 'vuex'
  import cepPromise from 'cep-promise';

  export default {
    name: 'CarrinhoComponent',
    data() {
      return {
        carregando: false,
        checkout: {
          email: '',
          telefone: '',
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
          cartao: '',
          titular: '',
          vencimento: '',
          cvc: '',
        },
        cepRule: [
          v => /^\d{5}-\d{3}$/.test(v) || 'CEP inválido',
        ],
        creditCardRule: [
          v => /^\d{16}$/.test(v) || 'Número de cartão inválido',
        ],
        dateRule: [
          v => /^\d{2}\/\d{2}$/.test(v) || 'Data inválida (dd/mm)',
        ],
        cvcRule: [
          v => /^\d{3,4}$/.test(v) || 'Código inválido',
        ],
        emailRule: [
          v => /\S+@\S+\.\S+/.test(v) || 'E-mail inválido',
        ],
        phoneRule: [
          v => /^\d{10,11}$/.test(v) || 'Telefone inválido',
        ],
        requiredRule: [
          v => !!v || 'Campo obrigatório',
        ],
      };
    },
    computed: {
      ...mapState({
        carrinho: state => state.carrinho,
        produtos: state => state.produtos
      }),
    ...mapGetters(['carrinho']),
      total() {
        let total = 0
        this.carrinho.forEach(item => {
          const produto = this.produtos.find(p => p.id === item.id)
          if (produto) {
            total += produto.preco * item.quantidade
          }
        })
        return total
      }
    },
    methods: {
      async buscarEndereco(cep) {
        try {
          const endereco = await cepPromise(cep);
          this.checkout.rua = endereco.street;
          this.checkout.numero = '';
          this.checkout.bairro = endereco.neighborhood;
          this.checkout.cidade = endereco.city;
          this.checkout.estado = endereco.state;
        } catch (e) {
          console.error(e);
        }
      },
      validarCampos() {
        this.$refs.form.validate();
        if (!this.$refs.form.hasError) {
          console.log(this.checkout);
          alert('Pedido fechado com sucesso!');
        }
      },
      finalizarCompra() {
        this.carregando = true;
        setTimeout(() => {
          this.carregando = false;
        }, 2000);
      },
      ...mapActions(['adicionarAoCarrinho', 'removerDoCarrinho']),
      ...mapMutations(['aumentarQuantidade', 'diminuirQuantidade']),
    },
  }
</script>