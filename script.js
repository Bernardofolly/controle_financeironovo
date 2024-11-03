// Função para cadastrar uma nova transação
function cadastrarTransacao(data, valor, categoria, tipo) {
    // Cria um objeto para a transação com os dados fornecidos
    const novaTransacao = {
      data: data,
      valor: parseFloat(valor), // Converte o valor para número decimal
      categoria: categoria,
      tipo: tipo // "receita" ou "despesa"
    };
  
    // Recupera a lista de transações do localStorage
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
  
    // Adiciona a nova transação à lista
    transacoes.push(novaTransacao);
  
    // Salva a lista atualizada no localStorage
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  
    // Confirma o cadastro
    console.log("Transação cadastrada com sucesso!");
}

document.getElementById("formTransacao").addEventListener("submit", function (e) {
    e.preventDefault(); // Previne o envio padrão do formulário
  
    // Captura os valores do formulário
    const data = document.getElementById("data").value;
    const valor = document.getElementById("valor").value;
    const categoria = document.getElementById("categoria").value;
    const tipo = document.getElementById("tipo").value;
  
    // Chama a função para cadastrar a transação
    cadastrarTransacao(data, valor, categoria, tipo);
  
    // Limpa os campos do formulário
    document.getElementById("formTransacao").reset();
});

function gerarRelatorio(dataInicial, dataFinal) {
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    
    const transacoesFiltradas = transacoes.filter(transacao => {
      const dataTransacao = new Date(transacao.data);
      return dataTransacao >= inicio && dataTransacao <= fim;
    });
  
    let totalReceitas = 0;
    let totalDespesas = 0;
    const listaReceitas = document.getElementById("listaReceitas");
    const listaDespesas = document.getElementById("listaDespesas");
  
    listaReceitas.innerHTML = "";
    listaDespesas.innerHTML = "";
  
    transacoesFiltradas.forEach(transacao => {
      const item = document.createElement("li");
      item.innerHTML = `${transacao.data} - ${transacao.categoria} <span>R$ ${transacao.valor.toFixed(2)}</span>`;
  
      if (transacao.tipo === "receita") {
        totalReceitas += transacao.valor;
        listaReceitas.appendChild(item);
      } else if (transacao.tipo === "despesa") {
        totalDespesas += transacao.valor;
        listaDespesas.appendChild(item);
      }
    });
  
    const saldo = totalReceitas - totalDespesas;
    document.getElementById("valorSaldo").innerText = saldo.toFixed(2);
    
    const mensagemSaldo = saldo >= 0 ? "Parabéns! Suas despesas estão equilibradas" : "Atenção! Suas despesas estão acima das receitas";
    if (saldo<0){
      document.getElementById("saldoTotal").style.color = "rgb(255, 0, 0)";
    }
    document.getElementById("mensagemSaldo").innerText = mensagemSaldo;
  }

document.getElementById("formRelatorio").addEventListener("submit", function (e) {
    e.preventDefault(); // Previne o envio do formulário
  
    // Captura as datas do formulário
    const dataInicial = document.getElementById("dataInicial").value;
    const dataFinal = document.getElementById("dataFinal").value;
  
    // Chama a função para gerar o relatório
    gerarRelatorio(dataInicial, dataFinal);
});