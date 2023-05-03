# busca a versão latest do node
FROM node:16

# pasta para onde vai o build
WORKDIR /app

# copia os arquivos para dentro da pasta WORKDIR
COPY . .

# instala as dependências do projeto
RUN npm install

# cria a versão otimizada de produção
RUN npm run build

# cria a pasta para servir o conteúdo
RUN mkdir -p /var/www/html

# move o conteúdo do build para a pasta
RUN mv dist/* /var/www/html/

# expõe a porta do container
EXPOSE 8080

# comando para executar o servidor do Vue.js
CMD ["npm", "run", "serve"]