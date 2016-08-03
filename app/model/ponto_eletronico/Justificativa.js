Ext.define('Packt.model.ponto_eletronico.Justificativa', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'integer'},                                              //ATRIBUTO IDENTIFICADOR DA JUSTIFICATIVA
        {name: 'nomeUsuario', type: 'string', persist: false},                      //ATRIBUTO UTILIZADO SOMENTE PARA MOSTRAR O NOME DO USUÁRIO NO GRID; NÃO SERÁ PERSISTIDO NO BANCO
        {name: 'dataPonto', type: 'date', dateFormat: 'Y-m-d', persist: false},     //ATRIBUTO UTILIZADO SOMENTE PARA MOSTRAR A DATA DO PONTO NO GRID; NÃO SERÁ PERSISTIDO NO BANCO
        {name: 'idPonto', type: 'integer'},                                         //ATRIBUTO REFERÊNCIA DO PONTO A SER JUSTIFICADO
        {name: 'justificativa', type: 'string'},                                    //JUSTIFICATIVA DO PONTO
        {name: 'dataJustificativa', type: 'date', dateFormat: 'Y-m-d'},             //DATA DA JUSTIFICATIVA
        {name: 'entrada01', type: 'date', dateFormat: 'H:i:s'},                     //ATRIBUTO IDENTIFICADOR DO HORÁRIO DE ENTRADA NO 1º EXPEDIENTE  
        {name: 'saida01', type: 'date', dateFormat: 'H:i:s'},                       //ATRIBUTO IDENTIFICADOR DO HORÁRIO DE SAIDA NO 1º EXPEDIENTE
        {name: 'entrada02', type: 'date', dateFormat: 'H:i:s'},                     //ATRIBUTO IDENTIFICADOR DO HORÁRIO DE ENTRADA NO 2º EXPEDIENTE
        {name: 'saida02', type: 'date', dateFormat: 'H:i:s'},                       //ATRIBUTO IDENTIFICADOR DO HORÁRIO DE SAIDA NO 2º EXPEDIENTE
    ]   
});