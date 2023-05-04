import axios from './axios'

const service = {
  getProdutos() {
    return axios.get('/produtos')
  },
  postProduto(produto) {
    return axios.post('/produtos', produto)
  }
}

export default service