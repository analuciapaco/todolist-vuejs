import Vue from 'vue';
import TarefaService from '../service/TarefaService';
import FormatterUtil from '../util/FormatterUtil';

export default Vue.component("tabela-tarefas", {
    template:
/* html*/ `
<v-simple-table>
    <thead>
        <th>Título da Tarefa</th>
        <th>Descrição</th>
        <th>Prazo</th>
        <th>Finalizado</th>
        <th>Ações</th>
    </thead>

    <tbody>
        <tr v-for="(tarefa, i) in tasks">
            <td>{{tarefa.titulo}}</td>
            <td>{{tarefa.descricao}}</td>
            <td>{{FormatterUtil.formatarData(tarefa.prazo)}}</td>
              <td>
                 <input type="checkbox" true-value="true" false-value="false" v-model="tarefa.finalizado" @change="marcarTarefa"> 
                Sim: <input type="radio"  v-model="tarefa.finalizado" value="true">
                Não: <input type="radio" v-model="tarefa.finalizado" value="false">
                {{ tarefa.finalizado }}

            </td>
            <td>
            <v-tooltip top>
            <template v-slot:activator="{on}">
            <v-btn  text icon v-on="on"  color=blue @click="visualizar(i)"> 
            <v-icon> 
            mdi-eye
            </v-icon> 
            </v-btn>
            </template>
            <span>
            Visualizar Tarefa
            </span>
            </v-tooltip top>

            <v-tooltip top>
            <template v-slot:activator="{on}">
            <v-btn text icon v-on="on" color=green @click="editar(i)">
            <v-icon> 
            mdi-pencil
            </v-icon> 
            </v-btn>
            </template>
            <span>
            Editar Tarefa
            </span>
            </v-tooltip top>

            <v-tooltip top>
            <template v-slot:activator="{on}">
            <v-btn text icon v-on="on" color=red @click="remover(i)">
            <v-icon> 
            mdi-delete
            </v-icon> 
            </v-btn>
            </template>
            <span>
            Excluir Tarefa
            </span>
            </v-tooltip top> 
            </td>
        
        </tr>
    </tbody>
</v-simple-table>

`,
    data() {
        return {
             FormatterUtil: FormatterUtil
        }
    },
    methods: {
          marcarTarefa() {
            TarefaService.atualizarLista(this.tasks);
        },
        visualizar(i:number) {
             this.$router.push({ name: 'detalhe', params: { tarefaSelecionada: this.tasks[i] } });
 
        },
        editar(i:number) {
              //disparar a ação de editar
              this.$store.dispatch( 'tarefas/editar', i);
              this.$emit('editar');
    
        },
       
        remover(i:number) {
            if (confirm("Tem certeza que deseja remover esta tarefa?")){
              this.$store.dispatch('tarefas/remover', i);
            }
          }
    },
    
    mounted() {
        this.$store.dispatch('tarefas/carregarTarefas');

    },
     computed: {
        tasks: function (){
            return this.$store.state.tarefas.tarefas;
        }
     },
});