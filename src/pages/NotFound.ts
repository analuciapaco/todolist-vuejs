import Vue from 'vue';
import { openSync } from 'fs';

export default Vue.component('not-found',{
    template:/* html */`
    <div> <h1>Ops, página não encontrada</h1>
    <p>
  A página que você procura não existe <router-link to="/">aqui</router-link>
</p>
</div>
`
})
