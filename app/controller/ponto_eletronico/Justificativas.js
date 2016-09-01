Ext.define('Packt.controller.ponto_eletronico.Justificativas', {
    extend: 'Ext.app.Controller',

    views: [
        'ponto_eletronico.Justificativas'
    ],

    stores: [
        'ponto_eletronico.Justificativas'
    ],

    refs: [
        {
            ref: 'justificativas',
            selector: 'justificativas'
        },
        {
            ref: 'justificaPontoForm',
            selector: 'justificapontoform',
            autoCreate: true,
            xtype: 'justificapontoform'
        }
    ],

    init: function (application) {
        this.control({
            "justificativaslist": {
                render: this.onRender,
                cellclick: this.onCellClick,
                itemmouseleave: this.onItemMouseLeave,
                itemcontextmenu: this.onRightClickRow,
                selectionchange: this.onHabilitarBotoes
            },
            "justificativas button#edit": {
                click: this.onEditJustificativa
            }
        });
    },

    onEditJustificativa: function (button, e, options) {
        var grid = button.up('panel').down('grid');
        var record = grid.getSelectionModel().getSelection();
        if (record[0]) {
            var form = this.getJustificaPontoForm();
            var fieldset = form.down('form').getComponent('fieldset_horarios');
            var fs_datefield = form.down('form').getComponent('fieldContainer_date');
            form.setTitle('Editando ponto de ' + Ext.Date.format(record[0].get('dataPonto'), 'd/m/Y'));
            form.down('form').loadRecord(record[0]);
            fs_datefield.query('datefield[name=dataPonto]')[0].setValue(record[0].raw.dataPonto);
            fieldset.query('textfield#entradaExp1')[0].setValue(record[0].raw.entrada01);
            fieldset.query('textfield#saidaExp1')[0].setValue(record[0].raw.saida01);
            fieldset.query('textfield#entradaExp2')[0].setValue(record[0].raw.entrada02);
            fieldset.query('textfield#saidaExp2')[0].setValue(record[0].raw.saida02);
            form.down('checkbox[name=checkDayFault]').setValue(record[0].get('dia'));
            for (var i = 0; i < fieldset.query('textfield').length; i++) {
                if (fieldset.query('textfield')[i].getValue() != "") {
                    fieldset.query('checkbox')[i].setValue(true);
                }
            }
        }
    },

    onHabilitarBotoes: function (model, selected, options) {
        var grid = this.getJustificativas();
        var btnEdit = grid.down('#edit');
        Ext.Ajax.request({
            url: 'php/security/importUserSession.php',
            success: function (conn, response, options, e0pts) {
                var result = Packt.util.Util.decodeJSON(conn.responseText);                                
                if (selected[0] && (result.user_id == selected[0].get('id_usuario'))) {
                    if (btnEdit.isDisabled()) {
                        btnEdit.setDisabled(false);
                    }
                } else {
                    if (!btnEdit.isDisabled()) {
                        btnEdit.setDisabled(true);
                    }
                }
            }
        });
    },

    onRightClickRow: function (view, record, item, index, e, eOpts) {
        e.stopEvent();
        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Ver justificativa',
                    iconCls: 'verJustificativa',
                    handler: function () {
                        Ext.create('Ext.window.Window', {
                            //title: 'Justificativa',
                            title: record.get('nomeUsuario') + ' - ' + Ext.Date.format(record.get('dataPonto'), 'd/m/Y'),
                            modal: true,
                            autoShow: true,
                            height: 200,
                            width: 400,
                            layout: 'fit',
                            items: {
                                xtype: 'container',
                                maxWidth: 400,
                                margin: 10,
                                html: record.get('justificativa')
                            }
                        });
                    }
                }
            ]
        });

        menu.addListener('click', function () {
            menu.destroy()
        });
        menu.showAt(e.getXY());
    },

    /**
     * EVENTO QUE MOSTRA A COLUNA COM OS NOMES DAS PESSOAS QUE JUSTIFICARAM ALGUM PONTO.
     * SOMENTE USUÁRIOS COM LEVEL ESPECÍFICO PODERÃO VISUALIZAR ESSA COLUNA.
     */
    onRender: function (component, options) {
        Ext.Ajax.request({
            url: 'php/security/importUserSession.php',
            success: function (conn, response, options, e0pts) {
                var result = Packt.util.Util.decodeJSON(conn.responseText);
                if (result.level < 3) {
                    for (var i = 0; i < component.columns.length; i++) {
                        component.columns[i].setVisible(true);
                    }
                }
            }
        });
    },

    /**
     * EVENTO QUE DESTROI A TOOLTIP SEMPRE QUE O USUÁRIO PASSA O MOUSE DE UMA LINHA DO GRID PARA OUTRA
     */
    onItemMouseLeave: function (view, record, item, index, e, eOpts) {
        if (view.tip) {
            view.tip.destroy();
        }
    },

    /**
     * EVENTO QUE GERENCIA O CLIQUE EM UMA CÉLULA DO GRID E MOSTRA UMA TOOLTIP AO USUÁRIO
     */
    onCellClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var store = Ext.getStore('pontoeletronico');                                    //REFERÊNCIA DA STORE DOS PONTOS                                        
        var cellIndexStart = 0;                                                         //VARIÁVEL QUE DETERMINARÁ A PRIMEIRA CÉLULA QUE CONTÉM HORÁRIO
        var cellIndexEnd = 5;                                                           //VARIÁVEL QUE DETERMINARÁ A ÚLTIMA CÉLULA QUE CONTÉM HORÁRIO

        if (view.tip) {
            view.tip.destroy();
            view.tip = null;
        }

        if (view.getGridColumns().length > 6) {                                         //SE O GRID MOSTRAR MAIS DE 6 COLUNAS, OS ÍNDICES DAS CÉLULAS QUE CONTÉM HORÁRIOS SERÃO ALTERADOS
            cellIndexStart = 1;
            cellIndexEnd = 6;
        }

        if (cellIndex > cellIndexStart && cellIndex < cellIndexEnd) {                   //VERIFICANDO SE O USUÁRIO ESTÁ CLICANDO EM UMA CÉLULA QUE CONTÉM HORÁRIO
            view.tip = Ext.create('Ext.tip.ToolTip', {
                itemId: 'tooltip-horario',
                autoShow: false,
                showDelay: 0,
                stateful: false,
                target: view.el,
                width: 100,
                title: 'Horário original',
                delegate: view.cellSelector,
                trackMouse: false,
                autoHide: true,
            });
            /**
             * COMO O MÉTODO LOAD DA STORE É ASSÍNCRONO, OS VALORES DA TOOLTIP SÃO CONFIGURADOS EM SEU CALLBACK
             */
            store.load({
                params: {
                    limit: 10000
                },
                callback: function (records, operation, success) {
                    var ponto = store.findRecord('id', record.get('idPonto'));
                    var horario;
                    if (cellIndex == (cellIndexStart + 1)) {                                        //VERIFICANDO QUAL O ÍNDICE DA CÉLULA CLICADA PELO USUÁRIO PARA PEGAR O HORÁRIO DO EXPEDIENTE CORRESPONDENTE
                        horario = ponto.get('entrada01');
                    } else if (cellIndex == (cellIndexStart + 2)) {
                        horario = ponto.get('saida01');
                    } else if (cellIndex == (cellIndexStart + 3)) {
                        horario = ponto.get('entrada02');
                    } else if (cellIndex == (cellIndexStart + 4)) {
                        horario = ponto.get('saida02');
                    }
                    horario = horario != null ? Ext.Date.format(horario, 'H:i:s') : "--:--:--";
                    view.tip.update(horario);                                                       //ATUALIZANDO A TOOLTIP COM O HORÁRIO INFORMADO PELO USUÁRIO NO MOMENTO QUE O PONTO FOI BATIDO
                }
            });

        }
    }
});