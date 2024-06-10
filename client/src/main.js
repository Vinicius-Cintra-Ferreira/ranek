import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import PaginaCarregando from "@/components/PaginaCarregando.vue";
import ErroNotificacao from "@/components/ErroNotificacao.vue";

const app = createApp(App)

app.config.productionTip = false
app.component("PaginaCarregando", PaginaCarregando);
app.component("ErroNotificacao", ErroNotificacao);

app.config.globalProperties.$filters = {
  numeroPreco(valor) {
    valor = Number(valor);
    if (!isNaN(valor)) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    } else {
      return "";
    }
  }
};

app.use(router)
app.use(store)
app.mount('#app')
