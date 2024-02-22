export function ValidarDebito(target: any, properKey: string, description: PropertyDescriptor){
    const orifinalMetodo = description.value;

    description.value = function(valorDebito: number){
        if(valorDebito <= 0){
            throw new Error("O valor do debito não pode ser menor que zero")
        }

        if(valorDebito > this.saldo){
            throw new Error("Seu saldo é insuficiente para realizar a operação")
        }

        return orifinalMetodo.apply(this, [valorDebito])
    }

    return description;
}


export function ValidaDeposito(target: any, properKey: string, description: PropertyDescriptor){
    const orifinalMetodo = description.value;

    description.value = function(valorDeposito: number){
        if(valorDeposito <= 0){
            throw new Error("O valor a ser depositado tem que sar maior que zero")
        }

        return orifinalMetodo.apply(this, [valorDeposito])
    }

    return description;
}