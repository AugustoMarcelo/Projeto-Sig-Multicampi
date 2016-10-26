Ext.define('Packt.view.ContainerQrCode', {
    extend: 'Ext.window.Window',
    alias: 'widget.containerqrcode',

    autoShow: true,
    resizable: false,
    draggable: false,
    closable: false,
    height: 400,
    width: 300,
    layout: {
        type: 'border',
        padding: '10'
    },

    items: [
        {
            xtype: 'image',
            region: 'center',
            itemId: 'qrcode',
            frame: true,
            src: ''
        },
        {
            xtype: 'textfield',
            itemId: 'textfieldcode',
            allowBlank: false,
            region: 'south',
            style: {
                marginTop: '5px'
            },
            height: 50,
            fieldStyle: 'font-size: 14pt; padding-left: 10px;',
            maskRe: /^\d$/,
            minLength: 6,
            maxLength: 6,
            emptyText: 'Digite a chave da EMCM',
            enableKeyEvents: true
        },
        {
            xtype: 'button',
            itemId: 'confirmCode',
            style: {
                marginTop: '5px'
            },
            disabled: true,
            height: 50,
            region: 'south',
            formBind: true,
            text: 'Confirmar'
        }
    ]
});