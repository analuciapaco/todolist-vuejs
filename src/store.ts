import Vue from 'vue';
import Vuex from 'vuex';
import tarefas from './stores/tarefas';
import alertas from './stores/alertas';


Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
          tarefas,
          alertas
   }
  
})