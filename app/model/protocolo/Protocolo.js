Ext.define('Packt.model.protocolo.Protocolo', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id'},
        {name: 'movimentacao'},
        {name: 'id_patrimonio'},
        {name: 'tombo', persist: false},
        {name: 'especificacoes', persist: false},
        {name: 'denominacao', persist: false},
        {name: 'mediador'},
        {name: 'solicitante'},            
        {name: 'data', type: 'date', dateFormat: 'Y-m-d H:i:s'}        
    ]
});