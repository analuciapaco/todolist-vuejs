import Vue from 'vue';
import TarefaService from '../service/TarefaService';
import Store from 'vuex';
export default Vue.component('form-tarefa', {
    template: /* html */
        `
    <form>
    <v-container grid-list-md >
    <h2>{{ indiceEdicao !=null ? 'Editar tarefa' : 'Nova Tarefa'  }}</h2>
   
   <v-layout row wrap>
   <v-flex>
   <v-text-field xs12 sm4
      :loading= "carregando"
      :disabled= "carregando"
      filled
      name="titulo"
      :error-messages="errors.collect('titulo')"
      v-validate="'required'"
      type="text" 
      class="v-text-field" 
      label="Título da Tarefa" 
      v-model="task.titulo"
      hint="Ex: Café da tarde"
     >
     </v-text-field>
    </v-flex>
   <v-flex>
   <v-text-field xs12 sm4
   :loading= "carregando"
   filled
   name="descricao"
   :error-messages="errors.collect('descricao')"
   v-validate="'required'"
   type="text" 
   label="Descrição da Tarefa" 
   v-model="task.descricao"
   hint="Ex: Tomar café da tarde"
     >
    </v-text-field>
    </v-flex>
    <v-flex>
    <v-menu
    v-model="datepicker"
                     :close-on-content-click="false"
                     :nudge-right="40"
                     transition="scale-transition"
                     offset-y
                     full-width
                     min-width="290px"
    >
    <template v-slot:activator="{on}">
    <v-text-field xs12 sm4
    :loading= "carregando"
    filled
    name="prazo"
    :error-messages="errors.collect('prazo')"
    v-validate="'required'"
    type="date" 
    label="Prazo de Conclusão" 
    v-model="task.prazo"
    hint="Ex: Até 01/01/2019"
    v-on="on"
    readonly
     >
     </v-text-field>
   
    </template>
    <v-date-picker
    v-model="task.prazo"
    @input="datepicker = false"
    >
    </v-date-picker>
 
    </v-menu>
    </v-flex>
   
    </v-layout justify-end>
    <v-layout> 
    <v-btn  :loading= "carregando" color="success" text  type="button" @click="salvar">Salvar</v-btn >
    <v-btn  :loading= "carregando"  color="error" text type="button" @click="cancelar">Cancelar</v-btn >
    </v-layout> 
   
     </v-container>   
   </form>
    `,
    data() {
        return {
            datepicker: false,
            carregando: false,
        }
    },
    methods: {
      async  salvar() {
       this.carregando=true;
        if(await this.$validator.validate()){
            this.carregando = true;
           this.$store.dispatch('tarefas/salvarTarefa', this.task);
            this.$store.dispatch('alertas/showSuccessSnackbar', 'Tarefa salva com sucesso')
            this.carregando = false;
             this.cancelar();
         } else {
            this.$store.dispatch('alertas/showErrorSnackbar', 'Preencha os campos obrigatórios');
            this.carregando = false;   
        }
         
        },
        cancelar() {
            this.task = {};
            this.indiceEdicao = null;
            this.$store.dispatch('tarefas/limparEdicao');
            this.$emit('voltar');
        }

    },
    computed: {
        indiceEdicao() {
            return this.$store.state.tarefas.indiceEdicao;
        },
        task: {
            get() {
                return this.$store.getters['tarefas/getTarefaEdicao'];
            }
            
        }
    }
})