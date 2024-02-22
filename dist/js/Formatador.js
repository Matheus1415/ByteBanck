function formatarMoeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
function FormatarData(data, formato) {
    if (formato === FormatoData.DIA_DA_SEMANA_DIA_MES) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "2-digit"
        });
    }
    else if (formato === FormatoData.PADRAO) {
        return data.toLocaleDateString("pt-br");
    }
}
