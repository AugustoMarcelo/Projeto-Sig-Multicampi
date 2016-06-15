Ext.define('Packt.model.protocolo.Protocolo', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id'},
        {name: 'movimentacao'},
        {name: 'tombo'},
        {name: 'denominacao'},
        {name: 'descricao'},
        {name: 'mediador'},
        {name: 'solicitante'},            
        {name: 'data', type: 'date', dateFormat: 'Y-m-d H:i:s'}        
    ]
});