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
                type="email"
                v-model="checkout.email"
                :rules="[emailRule, requiredRule]"
                :error-messages="errors.email"
                @input="clearError('email')"
                required>
              </v-text-field>
              <v-text-field label="Telefone"
                v-model="checkout.telefone"
                :rules="[phoneRule, requiredRule]"
                :error-messages="errors.telefone"
                v-mask="'(##) #####-####'"
                @input="clearError('telefone')"
                required>
              </v-text-field>
              <h2 class="titlesform">Informaçôes de entrega</h2>
              <div class="d-flex">
                <v-text-field label="CEP"
                  v-model="checkout.cep"
                  v-mask="'#####-###'"
                  :rules="[cepRule, requiredRule]"
                  :error-messages="errors.cep"
                  @input="clearError('cep')"
                  required>
                </v-text-field>
                <v-btn color="black" class="btnCep" @click="buscarEndereco(checkout.cep)">
                  <template v-if="!loadingCep">
                    <v-icon>mdi-magnify</v-icon>
                  </template>
                  <template v-else>
                    <v-progress-circular indeterminate size="24"></v-progress-circular>
                  </template>
                </v-btn>
              </div>
              <v-text-field label="Rua"
                v-model="checkout.rua"
                :rules="[requiredRule]"
                :error-messages="errors.rua"
                @input="clearError('rua')"
                required>
              </v-text-field>
              <v-text-field label="Número"
                v-model="checkout.numero"
                :rules="[requiredRule]"
                :error-messages="errors.numero"
                @input="clearError('numero')"
                required>
              </v-text-field>
              <v-text-field label="Bairro"
                v-model="checkout.bairro"
                :rules="[requiredRule]"
                :error-messages="errors.bairro"
                @input="clearError('bairro')"
                required>
              </v-text-field>
              <v-row>              
                <v-text-field class="inputsform" 
                  label="Cidade"
                  v-model="checkout.cidade"
                  :rules="[requiredRule]"
                  :error-messages="errors.cidade"
                  @input="clearError('cidade')"
                  required>
                </v-text-field>
                <v-text-field class="inputsform"
                  label="Estado"
                  v-model="checkout.estado"
                  :rules="[requiredRule]"
                  :error-messages="errors.estado"
                  @input="clearError('estado')"
                  required>
                </v-text-field>
              </v-row>
              <h2  class="titlePagamento">Informaçôes de pagamento</h2>
              <v-text-field label="Número do cartão"
                v-mask="'#### #### #### ####'"
                v-model="checkout.cartao.numerocc"
                :rules="[creditCardRule, requiredRule]"
                :error-messages="errors.numerocc"
                @input="clearError('numerocc')"
                required>
              </v-text-field>
              <v-text-field label="Titular do cartão"
                v-model="checkout.cartao.titular"
                :rules="[requiredRule]"
                :error-messages="errors.titular"
                @input="clearError('titular')"
                required>
              </v-text-field>
            <v-row>
              <v-text-field class="inputsform"
                label="Data de vencimento"
                v-mask="'##/##'"
                v-model="checkout.cartao.vencimento"
                :rules="[dateRule, requiredRule]"
                :error-messages="errors.vencimento"
                @input="clearError('vencimento')"
                required>
              </v-text-field>
              <v-text-field class="inputsform"
                label="CVC"
                v-mask="'###'"
                v-model="checkout.cartao.cvc"
                :rules="[cvcRule, requiredRule]"
                :error-messages="errors.cvc"
                @input="clearError('cvc')"
                required>
              </v-text-field>
            </v-row>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled=" !todosCamposPreenchidos || !carrinho.length" 
                class="btnFinal"  
                color="white" 
                @click="finalizarCompra">
                <template v-if="!carregando">
                  Fechar Pedido
                </template>
                <template v-else>
                  <v-progress-circular indeterminate size="24"></v-progress-circular>
                </template>
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col class="sacola" cols="12" md="6">
            <div class="intsacola">
            <h2 class="titleSacola">Sua sacola</h2>
            <div v-if="!carrinho.length">Nenhum produto na sacola</div>
            <ul v-else class="sacola">
              <li v-for="(item, index) in carrinho" :key="index" class="d-flex">
                <img alt="Imagem" 
                :src="item.images[1]" 
                aspect-ratio="2" 
                class="flex-grow mr-2 imgSacola"/>
                <div class="desc">
                  <div class="sacolatitle text-wrap">{{ item.title }}</div>
                  <div class="sacolaprice text-wrap">R$ {{ item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</div>
                  <div class="btnsSacola">
                    <v-btn class="BtnsSacola" 
                    @click="diminuirQuantidade(item)" 
                    number
                    v-model="item.amount" 
                    min="1"
                    max="999" 
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
                      @click="aumentarQuantidade(item)"
                      number 
                      v-model="item.amount" 
                        min="1"
                        max="999"
                      color="black"
                      ><v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </li>
            </ul>
            <v-divider></v-divider>
            <v-card-text v-if="carrinho.length" class="text-center ml-12 price">
              Total: R$ {{ calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </v-card-text>
          </div>
          <hr v-if="!carrinho.length" class="hr-1"/>
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
        formValid: false,
        
        loadingCep: false,

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

        errors: {},
      };
    },
    computed: {
      ...mapState({
        carrinho: state => state.carrinho,
        produtos: state => state.produtos
      }),

    ...mapGetters(['carrinho']),
    totalProdutos() {
      return this.carrinho.reduce((total, item) => total + (item.price * item.amount), 0);
    },

    todosCamposPreenchidos() {
      const {
        email,
        telefone,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cartao: { numerocc, titular, vencimento, cvc },
      } = this.checkout;

      return (
        email &&
        telefone &&
        cep &&
        rua &&
        numero &&
        bairro &&
        cidade &&
        estado &&
        numerocc &&
        titular &&
        vencimento &&
        cvc
      );
    },
    },
    methods: {
      async buscarEndereco(cep) {
        try {
          this.loadingCep = true;
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
        } finally {
          setTimeout(() => {
            this.loadingCep = false;
          }, 1000);
        }
      },

      calcularTotal() {
        return this.totalProdutos;
      },

      validarCampos() {
        this.errors = {};
        if (this.checkout.email.trim() === '') {
          this.errors.email = 'Campo obrigatório';
        }
        if (this.checkout.telefone.trim() === '') {
          this.errors.telefone = 'Campo obrigatório';
        }
        if (this.checkout.cep.trim() === '') {
          this.errors.cep = 'Campo obrigatório';
        }
        if (this.checkout.rua.trim() === '') {
          this.errors.rua = 'Campo obrigatório';
        }
        if (this.checkout.numero.trim() === '') {
          this.errors.numero = 'Campo obrigatório';
        }
        if (this.checkout.bairro.trim() === '') {
          this.errors.bairro = 'Campo obrigatório';
        }
        if (this.checkout.cidade.trim() === '') {
          this.errors.cidade = 'Campo obrigatório';
        }
        if (this.checkout.estado.trim() === '') {
          this.errors.estado = 'Campo obrigatório';
        }
        if (this.checkout.cartao.numerocc.trim() === '') {
          this.errors.numerocc = 'Campo obrigatório';
        }
        if (this.checkout.cartao.titular.trim() === '') {
          this.errors.titular = 'Campo obrigatório';
        }
        if (this.checkout.cartao.vencimento.trim() === '') {
          this.errors.vencimento = 'Campo obrigatório';
        }
        if (this.checkout.cartao.cvc.trim() === '') {
          this.errors.cvc = 'Campo obrigatório';
        }
        this.$refs.form.validate();
        if (!this.$refs.form.hasError) {
          this.formValid = true;
          toast('Formulário preenchido com sucesso!');
        } else {
          this.formValid = false;
          toast('Não foi possível finalizar a compra. Verifique os campos obrigatórios.', { type: 'error' });
        }
      },

      clearError(fieldName) {
        if (this.errors[fieldName]) {
          this.errors[fieldName] = '';
        }
      },

      finalizarCompra() {
        this.validarCampos();
        if (!this.formValid) {
          return;
        }
        this.carregando = true;
        localStorage.removeItem('carrinho');
        toast(`${this.checkout.cartao.titular} sua compra foi realizada com sucesso!`, {
          autoClose: 5000,
        });
        console.log('Informações do Cliente: ', this.checkout,'Informações da Sacola: ', this.carrinho);
        this.checkout = {
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
        };
        this.REMOVE_CARRINHO(this.carrinho);
        setTimeout(() => {
          this.carregando = false;
        }, 2000);
      },
      ...mapActions(['adicionarAoCarrinho', ]),
      ...mapMutations(['aumentarQuantidade', 'diminuirQuantidade', 'REMOVE_CARRINHO']),
    },
  };
</script>