Ext.define('Packt.controller.inventory.Products', {
	extend: 'Ext.app.Controller',

	requires: [
        'Packt.util.Util',
        'Packt.util.Alert',
        'Packt.util.Log',
        'Ext.ux.IFrame'
    ],

	views: [        
		'inventory.Products',
        'inventory.ProductForm',
        'inventory.ProductsGridWarning',
        'inventory.log.Logs',
        'inventory.log.ProductsLogList',
        'inventory.UnidadeMedidaForm' 
	],

	stores: [
        'inventory.UnidadesMedida',
        'inventory.Materiais',
        'Packt.store.inventory.ProductsWarning',
        'Packt.store.inventory.Products'        
    ],

	refs: [
        {
            ref: 'products',
            selector: 'products'
        },
        {
            ref: 'productsList',
            selector: 'productslist'
        },
        {
            ref: 'productsGridWarning',
            selector: 'productsgridwarning'
        },
        {
            ref: 'productPicture',
            selector: 'productform image'
        },
        {
            ref: 'productForm',
            selector: 'productform',
            autoCreate: true,
            xtype: 'productform'
        },
        {
            ref: 'productsLogList',
            selector: 'productsloglist',
            autoCreate: true,
            xtype: 'productsloglist'
        },
        {
            ref: 'materialForm',
            selector: 'materialform',
            autoCreate: true,
            xtype: 'materialform'
        },
        {
            ref: 'unidadeMedidaForm',
            selector: 'unidademedidaform',
            autoCreate: true,
            xtype: 'unidademedidaform'
        }        
    ],

	init: function(application) {
		this.control({
            "productslist": {
                render: this.onRender,
                selectionchange: this.onHabilitarBotoesGrid
            },                                     
            "productsgridwarning": {
                render: this.onRender
            },
            "products button#add": {
                click: this.onButtonClickAdd
            },
            "products button#edit": {
                click: this.onButtonClickEdit
            },
            "products button#delete": {
                click: this.onButtonClickDelete
            },
            "products menuitem#material": {
                click: this.onButtonClickMaterial
            },
            "products menuitem#unidadeMedida": {
                click: this.OnButtonClickUnidadesMedidas
            },
            "products button#exportar_pdf": {
                click: this.onButtonClickPDF
            },
            "materialform button#cancelar": {
                click: this.onButtonClickCancel
            },
            "materialform button#salvar": {
                click: this.onButtonClickSalvarSubForms
            },
            "materialform button#editar": {
                click: this.onButtonClickEditarSubForms
            },            
            "materialform button#clear": {
                click: this.limparCampo
            },
            "materialform grid": {
                selectionchange: this.habilitarEditarMaterial
            },
            "materialform form textfield[name=name]": {
                change: this.onHabilitarBotoesSubForms
            },
            "unidademedidaform grid": {
                selectionchange: this.habilitarEditarUnidade
            },
            "unidademedidaform form textfield[name=name]": {
                change: this.onHabilitarBotoesSubForms
            },
            "unidademedidaform button#cancelar": {
                click: this.onButtonClickCancel
            },            
            "unidademedidaform button#salvar": {
                click: this.onButtonClickSalvarSubForms
            },
            "unidademedidaform button#editar": {
                click: this.onButtonClickEditarSubForms
            },
            "unidademedidaform button#clear": {
                click: this.limparCampo
            },
            "productform button#save": {
                click: this.onButtonClickSave
            },
            "productform button#cancel": {
                click: this.onButtonClickCancel
            },
            "productform filefield": {
                change: this.onFileFieldChange
            }
        });

        if (!Ext.getStore('unidadesmedida')) {
            Ext.create('Packt.store.inventory.UnidadesMedida');
        } 

        if(!Ext.getStore('materiais')) {
            Ext.create('Packt.store.inventory.Materiais');
        }
    },

    onRender: function(component, options) {         
        component.getStore().load();                
    },

    limparCampo: function(button, e, options) {        
        var textfield = button.up('form').down('textfield');        
        textfield.setValue("");
        textfield.focus(false, 100);
    },

    //Função para habilitar os botões de editar e excluir quando o usuário selecionar um registro   
    onHabilitarBotoesGrid: function(model, selected, e0pts) {       
        var grid = this.getProducts();                   
        var btnDel = grid.down('#delete');
        var btnEdit = grid.down('#edit');        
        if(selected[0]) {
            if(btnDel.isDisabled()) {
                btnDel.setDisabled(false);
            }
            if(btnEdit.isDisabled()) {
                btnEdit.setDisabled(false);
            }        
        } else {
            if(!btnDel.isDisabled()) {
                btnDel.setDisabled(true);
            }
            if(!btnEdit.isDisabled()) {
                btnEdit.setDisabled(true);
            }            
        }
    },

    habilitarEditarUnidade: function(model, selected, e0pts) {       
        var form = this.getUnidadeMedidaForm();                 
        var btnEditar = form.down('#editar');

        if(selected[0]) {
            if(btnEditar.isDisabled()) {
                btnEditar.setDisabled(false);
            }        
        } else {
            if(!btnEditar.isDisabled()) {
                btnEditar.setDisabled(true);
            }            
        }
    },    

    habilitarEditarMaterial: function(model, selected, e0pts) {       
        var form = this.getMaterialForm();        
        var btnEditar = form.down('#editar');

        if(selected[0]) {
            if(btnEditar.isDisabled()) {
                btnEditar.setDisabled(false);
            }        
        } else {
            if(!btnEditar.isDisabled()) {
                btnEditar.setDisabled(true);
            }            
        }
    },    

    onHabilitarBotoesSubForms: function(component, newValue, oldValue, e0pts) {
        /*PEGANDO A REFERÊNCIA DO FORM ATRAVÉS DA HIERARQUIA DE COMPONENTES*/                         
        var form = component.up('form');
        var btnSalvar = form.down('#salvar');
        var btnLimpar = form.down('#clear');        
        if(component.getValue() != "") {
            if(btnSalvar.isDisabled()) {
                btnSalvar.setDisabled(false);
            }
            if(btnLimpar.isDisabled()) {
                btnLimpar.setDisabled(false);
            }
        } else {
            if(!btnLimpar.isDisabled()) {
                btnLimpar.setDisabled(true);
            }
            if(!btnSalvar.isDisabled()) {
                btnSalvar.setDisabled(true);
            }
        }
    },

    onButtonClickPDF: function(button, e, options) {
        var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
        var searchField = Ext.ComponentQuery.query('#searchfield-filtro')[0];
        var combo = Ext.ComponentQuery.query('#combo-material')[0];
        var comboParam = combo.getValue();
        if(combo.getValue() == null) {
            comboParam = combo.getDisplayValue();
        }        
        //Criando uma nova aba para a carregar o PDF
        newTab = mainPanel.add({
            xtype: 'panel',
            closable: true,
            iconCls: 'pdf',
            title: 'PDF dos Produtos',
            layout: 'fit',
            html: 'Carregando PDF...',
            items: [{
                xtype: 'uxiframe',
                src: 'php/pdf/exportarProdutosPdf.php?material='+comboParam+'&searchfield='+searchField.getValue()
            }]
        });

        mainPanel.setActiveTab(newTab);
    },

    onButtonClickAdd: function(button, e, options) {
        var win = Ext.create('Packt.view.inventory.ProductForm');
        win.setTitle(translations.windowTitleAddProduct);
        win.show();
    },

    onButtonClickEdit: function(button, e, options) {        
        //var grid1 = this.getProductsList();        /*button.up('panel').down('grid'),*/        
        var grid = button.up('panel').down('grid'),        
        record = grid.getSelectionModel().getSelection();                
        
        if(record[0]){                        
            var editWindow = this.getProductForm();
            var img = editWindow.down('image');
            editWindow.down('form').loadRecord(record[0]);


            if(record[0].get('picture')) {                                
                img.setSrc('resources/productImages/' + record[0].get('picture'));

            } else {
                img.setSrc('resources/productImages/sem_imagem.gif');
            }
            editWindow.setTitle(record[0].get('nome'));
            editWindow.show();
        }        
    },

    /*FUNÇÃO FEITA PARA SER UTILIZADA NOS FORMS DE MATERIAIS E UNIDADES DE MEDIDA*/ 
    onButtonClickEditarSubForms: function(button, e, options) {
        var grid = button.up('window').down('grid'),
        record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            var form = button.up('form');
            form.loadRecord(record[0]);
            form.down('textfield[name=name]').focus(false, 100);
            form.down('#salvar').setText('Salvar alterações');
        }
    },

    onButtonClickSalvarSubForms: function(button, e, options) {         
        if(button.up('window').xtype == 'unidademedidaform') {
            var url = 'php/inventory/saveUnidadeMedida.php'; 
            var mensagem = 'Unid. de Medida adicionada com sucesso!';

        } else {
            var url = 'php/inventory/saveMaterial.php';
            var mensagem = 'Material adicionado com sucesso!';
        }

        var win = button.up('window');
            form = button.up('window').down('form'),
            store = button.up('window').down('grid').getStore();            
        if(form.getForm().isValid()) {                  
            form.getForm().submit({
                clientValidation: true,
                url: url,
                success: function(form, action) {
                    var result = action.result;
                    if(result.success) {
                        store.load();                        
                        Packt.util.Alert.msg('Sucesso!', mensagem);
                        win.close();
                    } else {
                        Packt.util.Alert.msg(result.msg);
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Erro', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Erro', 'Falha na conexão com o servidor.');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Erro', action.result.msg);
                    }
                }
            });
        }
    },

    onButtonClickSave: function(button, e, options) {
        var win = button.up('window'),
        formPanel = win.down('form'),
        //var formPanel = this.getProductForm(),
        store = this.getProductsList().getStore(),
        grid = this.getProductsList(),        
        gridLog = this.getProductsLogList(),
        record = formPanel.getForm(),
        values = formPanel.getValues(),        

        //AJUSTE TÉCNICO!!!
        
        selectedRow = grid.getSelectionModel().getSelection()[0];
        var row = store.indexOf(selectedRow);
        if(row == 0) {
            grid.getSelectionModel().deselectAll();
        }
        grid.getSelectionModel().select(row-1);                
        //AJUSTE TÉCNICO!!!                
        if(formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                clientValidation: true,
                url: 'php/inventory/saveProduct.php',
                success: function(form, action) {
                    var result = action.result;                    
                    if(result.success) {

                        if(result.cadastro) {                            
                            Packt.util.Log.montaLogINSERT(record, values, gridLog);                            

                        } else {
                            Packt.util.Log.montaLogUPDATE(record, values, gridLog, result.image);                                                        
                        }           

                    Packt.util.Alert.msg(translations.msgProductSave1, translations.msgProductSave2);
                    store.load();                    
                    win.close();
                    } else {
                        Packt.util.Util.showErrorMsg(result.msg);
                    }                    
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                    }
                }
            });
        }

    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },

    onButtonClickDelete: function(button, e, options) {
        //var grid = this.getProductsList(),
        var grid = button.up('panel').down('grid'),
        record = grid.getSelectionModel().getSelection(),
        store = grid.getStore(),
        gridLog = this.getProductsLogList();

        Ext.Msg.show({
            title: translations.msgTitleDelete,
            msg: translations.msgQuestionDelete,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    Ext.Ajax.request({
                        url: 'php/inventory/deleteProduct.php',
                        params: {
                            id: record[0].get('id'),
                            picture: record[0].get('picture')
                        },
                        success: function(conn, response, options, e0pts) {
                            var result = Packt.util.Util.decodeJSON(conn.responseText);                            
                            if(result.success) {                                                                                               
                                Packt.util.Log.montaLogDELETE(record, gridLog);
                                Packt.util.Alert.msg(translations.msgProductSave1, translations.msgProductDeleted);
                                store.load(); 
                            } else {
                                Packt.util.Util.showErrorMsg(conn.responseText);
                            }                                    
                        },
                        failure: function(conn, response, options, e0pts) {
                            Packt.util.Util.showErrorMsg(conn.responseText);
                        }
                    });
                }
            }
        });
    },

    onButtonClickMaterial:  function(button, e, options) {
        var win = Ext.create('Packt.view.inventory.MaterialForm');
        win.show();
    },

    OnButtonClickUnidadesMedidas: function(button, e, options) {
        var win = Ext.create('Packt.view.inventory.UnidadeMedidaForm');
    },

    onFileFieldChange: function(filefield, value, options) {
        var file = filefield.fileInputEl.dom.files[0];

        var picture = this.getProductPicture();

        if(typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file);

        } else if (!(/image/i).test(file.type)) {
            Ext.Msg.alert('Warning', 'You can only update image files!');
            filefield.reset();
        }
    }
});
	