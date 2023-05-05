<template>
  <v-container>
    <v-card>
      <h1 class="titleFinal">Finalização do pedido</h1>
      <v-card-text>
        <v-row cols="2" md="12" >
          <v-col cols="12" md="6">
            <h2 class="titlesform">Informaçôes de contato</h2>
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
              <h2 class="titlesform">Informaçôes de entrega</h2>
              <div class="d-flex">
                <v-text-field label="CEP"
                  v-model="checkout.cep"
                  :rules="[cepRule, requiredRule]"
                  required>
                </v-text-field>
                <v-btn color="black" class="btnCep" @click="buscarEndereco(checkout.cep)">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </div>
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
              <v-row>              
                <v-text-field class="inputsform" 
                  label="Cidade"
                  v-model="checkout.cidade"
                  :rules="[requiredRule]"
                  required>
                </v-text-field>
                <v-text-field class="inputsform"
                  label="Estado"
                  v-model="checkout.estado"
                  :rules="[requiredRule]"
                  required>
                </v-text-field>
              </v-row>
              <h2  class="titlePagamento">Informaçôes de pagamento</h2>
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
            <v-row>
              <v-text-field class="inputsform"
                label="Data de vencimento"
                v-model="checkout.cartao.vencimento"
                :rules="[dateRule, requiredRule]"
                required>
              </v-text-field>
              <v-text-field class="inputsform"
                label="CVC"
                v-model="checkout.cartao.cvc"
                :rules="[cvcRule, requiredRule]"
                required>
              </v-text-field>
            </v-row>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!carrinho.length" 
                class="btnFinal"  
                color="white" 
                @click="finalizarCompra">Fechar Pedido</v-btn>
              <v-overlay :value="carregando">
                <v-progress-circular indeterminate size="44"></v-progress-circular>
              </v-overlay>
            </v-card-actions>
          </v-col>
          <v-col class="sacola" cols="12" md="6">
            <h2 class="titleSacola">Sua sacola</h2>
            <ul class="sacola">
              <li v-for="(item, index) in carrinho" :key="index" class="d-flex">
                <img alt="Imagem" 
                :src="item.images[0]" 
                aspect-ratio="2" 
                class="flex-grow mr-2 imgSacola"/>
                <div>
                  <div class="sacolatitle">{{ item.title }}</div>
                  <div class="sacolaprice">R$ {{ item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</div>
                  <div class="btnsSacola">
                    <v-btn class="BtnsSacola" 
                    @click="removerDoCarrinho(item)" 
                    text 
                    color="black"><v-icon>mdi-window-minimize</v-icon></v-btn>
                    <div class="qntSacola">
                      <span>Quantidade</span>
                      <input type="number" 
                        v-model="item.amount" 
                        min="1"
                        max="999"
                        class="qntInputSacola"
                        >
                    </div>
                    <v-btn class="BtnsSacola" 
                      @click="adicionarAoCarrinho(item)"
                      text 
                      color="black"
                      ><v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </li>
              <hr class="hr-4"/>
            </ul>
            <v-divider></v-divider>
            <v-card-text class="text-right">
              Total: {{ total }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import './Carrinho.less'
  import { mapState, mapMutations, mapActions,mapGetters } from 'vuex'
  import cepPromise from 'cep-promise';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  export default {
    name: 'CarrinhoComponent',
    data() {
      return {
        carregando: false,
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
          }
        },
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
          this.checkout.bairro = endereco.neighborhood;
          this.checkout.cidade = endereco.city;
          this.checkout.estado = endereco.state;
          toast("CEP Encontrado !", {
            autoClose: 2000,
          });
        } catch (e) {
          toast("Não encontramos o CEP informado!", {
            autoClose: 2000,
          });
          // eslint-disable-next-line no-undef
          console.log(carrinho);
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
        console.log('Informações do Cliente: ', this.checkout,'Informações da Sacola: ', this.carrinho);
        setTimeout(() => {
          this.carregando = false;
        }, 2000);
      },
      ...mapActions(['adicionarAoCarrinho', 'removerDoCarrinho']),
      ...mapMutations(['aumentarQuantidade', 'diminuirQuantidade']),
    },
  }
</script>