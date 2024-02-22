import { Transacao } from "./Transacao.js";

export type GrupoTransacao = {
    babel:string;
    transacoes: Transacao[];
}