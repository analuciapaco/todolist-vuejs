import Vue from 'vue';
import TabelaTarefas from './../components/TabelaTarefas';
import FormularioTarefas from './../components/FormularioTarefas';
export default Vue.component('home', {
    template:
        /* html */
        `
  <v-container>
  <v-layout row wrap justify-space-between class="my-3">
   <h1> {{title}} </h1> 
   <v-btn 
   dark
   fab
   large
   color="primary"
   @click="exibirFormulario = !exibirFormulario"    
   >
 <v-icon>
 {{ exibirFormulario ? 'mdi-arrow-left' : 'mdi-plus' }}
 </v-icon>

   </v-btn>
    </v-layout>
  <form-tarefa @voltar="exibirFormulario = false" v-if="exibirFormulario"></form-tarefa>      
  <tabela-tarefas @editar="exibirFormulario = true" v-else></tabela-tarefas>

  </v-container>
 
    
  
  `,
  
  components: {
    TabelaTarefas,
    FormularioTarefas
},
data() {
    return {
    title: "Todolist vuejs",
    exibirFormulario: false
    }
},
computed: {
    tituloBotao: function() {
       return  this.exibirFormulario ? 'Voltar' : 'Nova Tarefa' ;
    }
}
});
