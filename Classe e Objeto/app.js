// app.js

// Array para armazenar todos os OBJETOS criados a partir da classe Tarefa
const tarefas = [];

// ----------------------------------------------------
// 1. DEFINIÇÃO DA CLASSE (O MOLDE)
// ----------------------------------------------------

class Tarefa {
    /**
     * CONSTRUCTOR: Processo de criação do Objeto
     * Define o estado inicial dos atributos.
     */
    constructor(descricao) {
        this.descricao = descricao;
        this.concluida = false; // Todo objeto Tarefa começa como NÃO concluída
    }

    /**
     * METODO: Ação que altera o ESTADO do Objeto (muda 'concluida' para true).
     */
    marcarComoConcluida() {
        // Se a tarefa já está concluida, desmarca. Senão, marca.
        this.concluida = !this.concluida;
    }
    /**
         * MÉTODO: Converte o estado do Objeto para um Elemento HTML.
         * @returns {HTMLElement} O item da lista (<li>) pronto para o DOM.
         */
    toHtml() {
        // Usa o ATRIBUTO 'concluida' do Objeto para determinar o estilo
        const classe = this.concluida ? 'concluida' : 'pendente';

        const li = document.createElement('li');
        li.className = classe;
        li.innerHTML = `
        <span>${this.descricao}</span>
        <button class = "toggle-btn">
        ${this.concluida ? 'Desmarcar' : 'Concluir'}
        </button>
        `;

        return li;
    }

}

/** -----------------------------------------
   * LÓGICA DO DOM (Manipulação da Interface)
   * ------------------------------------------
   */

//Pegando os elementos do HTML
const listaUl = document.getElementById('listaDeTarefas');
const inputTexto = document.getElementById('novaTarefaTexto');
const adicionarBtn = document.getElementById('adicionarBtn');

/**
 * Função para atualizar a visualização (o DOM) com base nos Objetos.
 */

function renderizarLista() {
    listaUl.innerHTML = ''; // Limpa a lista no HTML

    // Percorre o Array que contém os OBJETOS de Tarefa
    tarefas.forEach((tarefaObjeto, index) => {
        
        // Usa o método do objeto para obter o elemento <li>
        const itemLi = tarefaObjeto.toHtml();
        
        // Adiciona o evento de clique ao botão de toggle
        itemLi.querySelector('.toggle-btn').addEventListener('click', () => {
            
            // 1. Chama o MÉTODO para ALTERAR O ESTADO do OBJETO
            tarefaObjeto.marcarComoConcluida(); 
            
            // 2. Re-renderiza a lista para que a alteração do estado apareça na tela
            renderizarLista(); 
        });

        listaUl.appendChild(itemLi);
    });
}


// Evento que CRIA o novo Objeto quando o botão 'Adicionar' é clicado
adicionarBtn.addEventListener('click', () => {
    const texto = inputTexto.value.trim();
    if (texto) {
        
        // CRIAÇÃO DO OBJETO: Instanciando a Classe
        const novaTarefa = new Tarefa(texto);
        
        // Adiciona o OBJETO à nossa lista de controle (array)
        tarefas.push(novaTarefa); 
        
        inputTexto.value = ''; // Limpa o input
        
        renderizarLista(); // Atualiza a tela com o novo Objeto
    }
});