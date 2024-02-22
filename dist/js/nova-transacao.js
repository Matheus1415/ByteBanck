const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Ops preencha todos os campos");
        return;
    }
    const inputTransacao = elementoFormulario.querySelector("#tipoTransacao");
    const inputValor = elementoFormulario.querySelector("#valor");
    const inputDate = elementoFormulario.querySelector("#data");
    let tipoTransacao = inputTransacao.value;
    let valor = parseFloat(inputValor.value);
    let data = new Date(inputDate.value);
    if (tipoTransacao == TipoTransferencia.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransferencia.TRANFERENCIA || tipoTransacao == TipoTransferencia.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert("Tipo de transação inválido");
        return;
    }
    elementoSaldo.textContent = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
