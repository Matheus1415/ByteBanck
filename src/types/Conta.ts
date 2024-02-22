import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;

const transacao: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) =>{
    if(key =="data"){
        return new Date(value)
    }
    return value
}) || [];

function debitar(valor:number) :void {
    if(valor <= 0){
        throw new Error("O valor a ser debitado tem que ser maior que zero");
    }

    if(valor >= saldo){
        throw new Error("Saldo insuficiente");
    }

    saldo -= valor
    localStorage.setItem("saldo",saldo.toString())
}

function depositar(valor:number) :void {
    if(valor <= 0){
        throw new Error("O valor a Depositado tem que ser maior que zero");
    }

    saldo += valor
    localStorage.setItem("saldo",saldo.toString())

}

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    getGrupoTransacao(): GrupoTransacao[]{
        const gruposTranzacoes: GrupoTransacao[] = []
        const listaTransacao:Transacao[] = structuredClone(transacao);
        const transacaoOrdenada: Transacao[] = listaTransacao.sort((t1, t2) => t2.data.getTime() - t1.data.getTime())
        let labelAtualGrupoTransacao: string = "";

        for(let transacao of transacaoOrdenada){
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br",{month:"long", year:"numeric"})
            if(labelAtualGrupoTransacao !+ labelGrupoTransacao){
                labelAtualGrupoTransacao = labelGrupoTransacao
                gruposTranzacoes.push({
                    babel: labelGrupoTransacao,
                    transacoes: []
                })
            }
            gruposTranzacoes.at(-1).transacoes.push(transacao)
        }
        return gruposTranzacoes
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
        } 
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor)
        } 
        else {
            alert("Tipo de Transação é inválido!");
            return;
        }
        transacao.push(novaTransacao)
        console.log(this.getGrupoTransacao());
        localStorage.setItem("transacoes", JSON.stringify(transacao))
    }
}

export default Conta;