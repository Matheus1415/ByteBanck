import { Armazenador } from "./Armazendor.js";
import { ValidaDeposito, ValidarDebito } from "./Decorator.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta
{
    private nome: string
    private saldo: number = Armazenador.Obter<number>("saldo") || 0;
    private transacao: Transacao[] = Armazenador.Obter<Transacao[]>(("transacao"), (key:string, value: any) =>{
        if(key === "data"){
            return new Date(value);
        }
        return value;
    }) || []


    constructor(nome: string){
        this.nome = nome
    }

    public getTutular() : string
    {
        return this.nome
    }

    @ValidarDebito
    public debitar(valor:number) :void {  

        this.saldo -= valor
        Armazenador.salvar("saldo",this.saldo.toString())
    }
    
    @ValidaDeposito
    public depositar(valor:number) :void {
    
        this.saldo += valor
        Armazenador.salvar("saldo",this.saldo.toString())
    
    }

    public getGrupoTransacao(): GrupoTransacao[]{
        const gruposTranzacoes: GrupoTransacao[] = []
        const listaTransacao:Transacao[] = structuredClone(this.transacao);
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
    }

    public getSaldo() {
        return this.saldo;
    }

    public getDataAcesso(): Date {
        return new Date();
    }

    public registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {

            this.depositar(novaTransacao.valor)
        } 
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor)
        } 
        else {
            alert("Tipo de Transação é inválido!");
            return;
        }
        this.transacao.push(novaTransacao)
        console.log(this.getGrupoTransacao());
        Armazenador.salvar("transacoes", JSON.stringify(this.transacao))
    }

}

export class ContaPremium extends Conta
{
    registrarTransacao(transacao: Transacao): void{
        if(transacao.tipoTransacao === TipoTransacao.DEPOSITO){
            console.log("Você ganhou um bônus de 0,50R$")
            transacao.valor += 0.5
        }
        
        super.registrarTransacao(transacao)
    }
}

export default Conta