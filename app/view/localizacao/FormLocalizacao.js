Ext.define('Packt.view.localizacao.FormLocalizacao', {
    extend: 'Ext.window.Window',
    alias: 'widget.formlocalizacao',

    modal: true,
    title: 'Adicionar um local',
    minHeight: 170,
    minWidth: 350,
    height: 170,
    width: 400,
    closable: false,
    autoShow: true,
    border: false,
    plain: true,   
    layout: 'fit', 
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,            
            layout: {
                type:'vbox',
                align: 'stretch'
            },
            defaultType: 'textfield',
            anchor: '-0, -0',
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'ID',
                    name: 'id'
                },
                {
                    fieldLabel: 'Sala',                    
                    name: 'sala',
                    emptyText: 'Ex.: 202, 198-B',
                    afterLabelTextTpl: Packt.util.Util.required,
                    allowBlank: false,
                    anchor: '-10' //O COMPONENTE TERÁ SUA LARGURA COM 10% A MENOS DO QUE O CONTAINER PAI E ALTURA 90% MENOR
                },
                {
                    fieldLabel: 'Localização',
                    name: 'localizacao',
                    emptyText: 'Localização da sala',                    
                    anchor: '-10'
                },
                {
                    fieldLabel: 'Responsável',                   
                    name: 'responsavel',
                    afterLabelTextTpl: Packt.util.Util.required,
                    allowBlank: false,
                    emptyText: 'Responsável pela sala',                    
                    anchor: '-10'
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'Cancelar',
            itemId: 'cancelar',
            iconCls: 'cancel'
        },
        {
            text: 'Salvar',
            itemId: 'salvar',
            iconCls: 'save'
        }
    ]
});