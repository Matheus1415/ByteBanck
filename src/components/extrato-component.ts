import Conta from "../types/Conta-antiga.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTrnazacoesExtarto: HTMLElement = document.querySelector(".extrato .registro-transacoes");
renderizarExtarto()
function renderizarExtarto(): void {
    const gruposTranzacoes: GrupoTransacao[] = Conta.getGrupoTransacao()
    let htmlRegistro: string = ""

    for (let grupoTranzacao of gruposTranzacoes) {
        let htmlItem: string = ""
        for (let transacao of grupoTranzacao.transacoes) {
            htmlItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `
        }

        htmlRegistro += `
            <div class="grupo-transacao">
                <h3 class="titulo">${grupoTranzacao.babel}</h3>
                ${htmlItem}
            </div>
        `
    }

    if(htmlRegistro === ""){
        htmlRegistro = "<div> Não a transações</div>"
    }

    elementoRegistroTrnazacoesExtarto.innerHTML = htmlRegistro;
}


const ExtartoComponentes = {
    atualizar(): void{
        renderizarExtarto();
    }
}

export default ExtartoComponentes;