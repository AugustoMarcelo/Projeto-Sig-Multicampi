Ext.define('Packt.util.Log', {

	statics: {
		//FUNÇÕES DE CRIAÇÃO DE LOGS PARA AS OPERAÇÕES REFERENTES AOS PRODUTOS
		montaLogUPDATE: function(record, values, gridLog, image) {	
			var picture = record._record.raw.picture;
			var materiaisStore = Ext.getStore('materiais');
			var siglasStore = Ext.getStore('unidadesmedida');
			var siglaAntes = siglasStore.findRecord('id', record._record.raw.Sigla_id);
			var siglaDepois = siglasStore.findRecord('id', values.Sigla_id);
			var tipoMaterialDepois = materiaisStore.findRecord('id', values.tipoMaterial);
			var tipoMaterialAntes = materiaisStore.findRecord('id', record._record.raw.tipoMaterial);
			if (picture == null) {
				picture = 'Sem imagem'
			}

			//RECUPERANDO OS NOMES DAS SIGLAS CONFORME O ID REFERENCIADO NA TABELA
			if(siglaAntes != null) {
				siglaAntes = siglaAntes.get('name');
			}

			if(siglaDepois != null) {
				siglaDepois = siglaDepois.get('name');				
			}
			
			if(tipoMaterialDepois != null) {
				tipoMaterialDepois = tipoMaterialDepois.get('name');
			}

			if(tipoMaterialAntes != null) {
				tipoMaterialAntes = tipoMaterialAntes.get('name');
			}			
						
	        var store = gridLog.getStore(),
	        formImage = Ext.ComponentQuery.query('#imageForm')[0],	        	    	        
	        numberChanges = 0,
	        msgOperation = '',
	        msgCODIGO = '',
	        msgNOME = '',
	        msgSIGLA_ID = '',
	        msgQTDE = '',
	        msgQTDEMIN = '',
	        msgPICTURE = '',
	        msgDESCRICAO = '',
	        msgDATACADASTRO = '',
	        msgTIPOMATERIAL = '',
	        dataOperacao = new Date(),
	        varDetailsBefore = "CÓDIGO: "+record._record.raw.codigo+"<br />"+"NOME: "+record._record.raw.nome+"<br />"+"UNID. DE MEDIDA: "+siglaAntes+"<br />"+"QUANTIDADE: "+record._record.raw.quantidade+"<br />"+"QTDE. MÍNIMA: "+record._record.raw.quantidadeMin+"<br />"+"IMAGEM: "+picture+"<br />"+"MATERIAL: "+tipoMaterialAntes+"<br />"+"DESCRIÇÃO: "+record._record.raw.descricao+"<br />"+"DATA CADASTRO: "+record._record.raw.dataCadastro,
			varDetailsAfter = "CÓDIGO: "+values.codigo+"<br />"+"NOME: "+values.nome+"<br />"+"UNID. DE MEDIDA: "+siglaDepois+"<br />"+"QUANTIDADE: "+values.quantidade+"<br />"+"QTDE. MÍNIMA: "+values.quantidadeMin+"<br />"+"IMAGEM: "+picture+"<br />"+"MATERIAL: "+tipoMaterialDepois+"<br />"+"DESCRIÇÃO: "+values.descricao+"<br />"+"DATA CADASTRO: "+values.dataCadastro;
		
	        if(record) { //VERIFICAÇÃO DE QUAIS PROPRIEDADES FORAM ALTERADAS
	            if(record._record.raw.codigo != values.codigo) {
	                numberChanges += 1;
	                msgCODIGO = '[CÓDIGO]';
	            }
	            if(record._record.raw.nome != values.nome) {
	                numberChanges += 1;
	                msgNOME = '[NOME]';
	            }
	            if(record._record.raw.Sigla_id != values.Sigla_id) {
	                numberChanges += 1;
	                msgSIGLA_ID = '[UNID. DE MEDIDA]';
	            }
	            if(record._record.raw.quantidade != values.quantidade) {
	                numberChanges += 1;
	                msgQTDE = '[QUANTIDADE]';
	            }
	            if(record._record.raw.quantidadeMin != values.quantidadeMin) {
	                numberChanges += 1;
	                msgQTDEMIN = '[QTDE. MÍNIMA]';
	            }

	            if((('resources/productImages/'+record._record.raw.picture) != formImage.src) && (formImage.src != '') && (formImage.src != 'resources/productImages/sem_imagem.gif')) {//GAMBIARRA	            	
	                numberChanges +=1;
	                msgPICTURE = '[IMAGEM]';
	                varDetailsAfter = "CÓDIGO: "+values.codigo+"<br />"+"NOME: "+values.nome+"<br />"+"UNID. DE MEDIDA: "+siglaDepois+"<br />"+"QUANTIDADE: "+values.quantidade+"<br />"+"QTDE. MÍNIMA: "+values.quantidadeMin+"<br />"+"IMAGEM: "+image+"<br />"+"MATERIAL: "+tipoMaterialDepois+"<br />"+"DESCRIÇÃO: "+values.descricao+"<br />"+"DATA CADASTRO: "+values.dataCadastro;	                
	            }
	            if(record._record.raw.tipoMaterial != values.tipoMaterial) {
	            	numberChanges +=1;
	            	msgTIPOMATERIAL = '[MATERIAL]';
	            }
	            if(record._record.raw.descricao != values.descricao) {
	                numberChanges +=1;
	                msgDESCRICAO = '[DESCRIÇÃO]';
	            }
	            if(record._record.raw.dataCadastro != values.dataCadastro) {
	                numberChanges += 1;
	                msgDATACADASTRO = '[DATA CADASTRO]';
	            }
	        }

	        if(numberChanges > 1) {
	            msgOperation = "As propriedades " + msgCODIGO+msgNOME+msgSIGLA_ID+msgQTDE+msgQTDEMIN+msgPICTURE+msgTIPOMATERIAL+msgDESCRICAO+msgDATACADASTRO + " foram alteradas.";

	        } else if (numberChanges == 1) {
	            msgOperation = "A propriedade " + msgCODIGO+msgNOME+msgSIGLA_ID+msgQTDE+msgQTDEMIN+msgPICTURE+msgTIPOMATERIAL+msgDESCRICAO+msgDATACADASTRO + " foi alterada.";

	        } else {
	            msgOperation = '';
	        }

	        if(numberChanges > 0) {
	            Ext.Ajax.request({
	                method: 'POST',
	                url: 'php/security/importUserSession.php',
	                success: function(conn, response, options, e0pts) {
	                    var result = Packt.util.Util.decodeJSON(conn.responseText);
	                    var log = Ext.create('Packt.model.inventory.log.Log', {
	                        information: msgOperation,
	                        User_id: result.nome+'| '+result.matricula,
	                        operation: 'O produto de COD.: '+values.codigo+' foi alterado.',
	                        detailsBefore: varDetailsBefore,
	                        detailsAfter: varDetailsAfter,
	                        dateOperation: dataOperacao
	                    });
	                    store.add(log);
	                    store.sync();
	                    store.reload();
	                }
	            });
	        }
		},

		montaLogINSERT: function(record, values, gridLog) {
			var store = gridLog.getStore(),
			dataOperacao = new Date(),
			varDetailsBefore = 'Este produto não possui informações neste campo, pois suas propriedades não foram alteradas.',
            varDetailsAfter = 'Este produto não possui informações neste campo, pois suas propriedades não foram alteradas.';       
            Ext.Ajax.request({
            	method: 'POST',
            	url: 'php/security/importUserSession.php',
            	success: function(conn, response, options, e0pts) {
            		var result = Packt.util.Util.decodeJSON(conn.responseText);
            		var log = Ext.create('Packt.model.inventory.log.Log', {
            			information: 'COD.: ' + values.codigo +'| NOME: '+ values.nome,
            			User_id: result.nome+'| '+result.matricula,
            			operation: 'O produto de COD.: ' +values.codigo+ ' foi adicionado.',
            			detailsBefore: varDetailsBefore,
            			detailsAfter: varDetailsAfter,
            			dateOperation: dataOperacao
            		});
            		store.add(log);
            		store.sync();            		
            		store.reload();                        		            	
            	}            	
            });         
		},

		montaLogDELETE: function(record, gridLog) {				
			var picture = record[0].data.picture;
			var materiaisStore = Ext.getStore('materiais');
			var siglasStore = Ext.getStore('unidadesmedida');
			var sigla = siglasStore.findRecord('id', record[0].data.Sigla_id);
			var tipoMaterial = materiaisStore.findRecord('id', record[0].data.tipoMaterial);
			if(tipoMaterial != null) {
				tipoMaterial = tipoMaterial.get('name');
			}
			if(sigla != null) {
				sigla = sigla.get('name');
			}
			if (picture == null) {
				picture = 'Sem imagem';
			}
			var store = gridLog.getStore(),
			dataOperacao = new Date(),					
			varDetailsBefore = "CÓDIGO: "+record[0].data.codigo+"<br />"+"NOME: "+record[0].data.nome+"<br />"+"UNID. DE MEDIDA: "+sigla+"<br />"+"QUANTIDADE: "+record[0].data.quantidade+"<br />"+"QTDE. MÍNIMA: "+record[0].data.quantidadeMin+"<br />"+"IMAGEM: "+picture+"<br />"+"MATERIAL: "+tipoMaterial+"<br />"+"DESCRIÇÃO: "+record[0].data.descricao+"<br />"+"DATA CADASTRO: "+record[0].raw.dataCadastro,
			varDetailsAfter = 'Este produto não possui informações neste campo, pois suas propriedades não foram alteradas.';
			Ext.Ajax.request({
				method: 'POST',
				url: 'php/security/importUserSession.php',
				success: function(conn, response, options, e0pts) {
					var result = Packt.util.Util.decodeJSON(conn.responseText);
					var log = Ext.create('Packt.model.inventory.log.Log', {
						information: 'COD.: ' + record[0].data.codigo + '| NOME: '+ record[0].data.nome,
						User_id: result.nome+'| '+result.matricula,
						operation: 'O produto de COD.: ' +record[0].data.codigo+ ' foi excluído.',
						detailsBefore: varDetailsBefore,
						detailsAfter: varDetailsAfter,
						dateOperation: dataOperacao
					});
					store.add(log);
					store.sync();
					store.reload();
				}
			});
		},

		//FUNÇÕES DE CRIAÇÃO DE LOGS PARA AS OPERAÇÕES REFERENTES AOS USUÁRIOS
		montaLogUserINSERT: function(record, values, gridLog) {
			var store = gridLog.getStore(),
			dataOperacao = new Date(),
			varDetailsBefore = 'Este usuário não possui informações neste campo, pois suas propriedades não foram alteradas.',
			varDetailsAfter = 'Este usuário não possui informações neste campo, pois suas propriedades não foram alteradas.';
			Ext.Ajax.request({
				method: 'POST',
				url: 'php/security/importUserSession.php',
				success: function(conn, response, options, e0pts) {
					var result = Packt.util.Util.decodeJSON(conn.responseText);
					var log = Ext.create('Packt.model.security.log.Log', {
						information: 'MAT.: ' + values.registration +'| NOME: ' + values.name,
						User_id: result.nome+'| '+result.matricula,
						operation: 'O usuário de MAT.: ' +values.registration+ ' foi adicionado',
						detailsBefore: varDetailsBefore,
						detailsAfter: varDetailsAfter,
						dateOperation: dataOperacao
					});
					store.add(log);
					store.sync();
					store.reload();
				}
			});
		},

		montaLogUserUPDATE: function(record, values, gridLog, image) {
			var picture = record._record.raw.picture;
			if (picture == null) {
				picture = 'Sem imagem';
			}
			var store = gridLog.getStore(),
			formImage = Ext.ComponentQuery.query('#userImageForm')[0],
			numberChanges = 0,
			msgOperation = '',
			msgUSER = '',
			msgNOME = '',
			msgREGISTRATION = '',
			msgPICTURE = '',
			msgGROUP = '',
			msgLEVEL = '',
			msgSTATUS = '',
			dataOperacao = new Date(),
			varDetailsBefore = 'USUÁRIO: '+record._record.raw.userName+"<br />"+'NOME: '+record._record.raw.name+"<br />"+'MATRÍCULA: '+record._record.raw.registration+"<br />"+'IMAGEM: '+picture+"<br />"+'GRUPO: '+record._record.raw.Group_id+"<br />"+'LEVEL: '+record._record.raw.level+"<br />"+'STATUS: '+record._record.raw.status, 
			varDetailsAfter = 'USUÁRIO: '+values.userName+"<br />"+'NOME: '+values.name+"<br />"+'MATRÍCULA: '+values.registration+"<br />"+'IMAGEM: '+picture+"<br />"+'GRUPO: '+values.Group_id+"<br />"+'LEVEL: '+values.level+"<br />"+'STATUS: '+values.status;
		
			if(record) { //VERIFICAÇÃO DE QUAIS PROPRIEDADES FORAM ALTERADAS
	            if(record._record.raw.userName != values.userName) {
	                numberChanges += 1;
	                msgUSER = '[USUÁRIO]';
	            }
	            if(record._record.raw.name != values.name) {
	                numberChanges += 1;
	                msgNOME = '[NOME]';
	            }
	            if(record._record.raw.Group_id != values.Group_id) {
	                numberChanges += 1;
	                msgGROUP = '[GRUPO]';
	            }
				if(record._record.raw.level != values.level) {
					numberChanges += 1;
					msgLEVEL = '[LEVEL]';
				}
				if(record._record.raw.status != values.status) {
					numberChanges += 1;
					msgSTATUS = '[STATUS]';
				}
	            if(record._record.raw.registration != values.registration) {
	                numberChanges += 1;
	                msgREGISTRATION = '[MATRÍCULA]';
	            }
	            if(('resources/profileImages/'+record._record.raw.picture) != formImage.src && formImage.src != '') {
	                numberChanges += 1;
	                msgPICTURE = '[IMAGEM]';
	                varDetailsAfter = 'USUÁRIO: '+values.userName+"<br />"+'NOME: '+values.name+"<br />"+'MATRÍCULA: '+values.registration+"<br />"+'IMAGEM: '+image+"<br />"+'GRUPO: '+values.Group_id+"<br />"+'LEVEL: '+values.level+"<br />"+'STATUS: '+values.status;
	            }	           
	        }

	        if(numberChanges > 1) {
	        	msgOperation = 'As propriedades ' +msgUSER+msgNOME+msgGROUP+msgREGISTRATION+msgPICTURE+msgLEVEL+msgSTATUS+ ' foram alteradas.';

	        } else if (numberChanges == 1) {
	        	msgOperation = 'A propriedade ' +msgUSER+msgNOME+msgGROUP+msgREGISTRATION+msgPICTURE+msgLEVEL+msgSTATUS+ ' foi alterada.';

	        } else {
	        	msgOperation = '';
	        }

	        if(numberChanges > 0) {
	        	Ext.Ajax.request({
	        		method: 'POST',
	        		url: 'php/security/importUserSession.php',
	        		success: function(conn, response, options, e0pts) {
	        			var result = Packt.util.Util.decodeJSON(conn.responseText);
	        			var log = Ext.create('Packt.model.security.log.Log', {
	        				information: msgOperation,
	        				User_id: result.nome+'| '+result.matricula,
	        				operation: 'O usuário de MAT.: ' +values.registration+ ' foi alterado.',
	        				detailsBefore: varDetailsBefore,
	        				detailsAfter: varDetailsAfter,
	        				dateOperation: dataOperacao
	        			});
	        			store.add(log);
	        			store.sync();
	        			store.reload();
	        		}
	        	});
	        }
		},

		montaLogUserDELETE: function(record, gridLog) {
			var picture = record[0].data.picture;
			if (picture == null) {
				picture = 'Sem imagem';
			}
			var store = gridLog.getStore(),
			dataOperacao = new Date(),
			varDetailsBefore = "USUÁRIO: "+record[0].data.userName+"<br />"+"NOME: "+record[0].data.name+"<br />"+"MATRÍCULA: "+record[0].data.registration+"<br />"+"GRUPO: "+record[0].data.Group_id+"<br />"+"IMAGEM: "+picture+'LEVEL: '+record[0].data.level+"<br />"+'STATUS: '+record[0].data.status,
			varDetailsAfter = 'Este produto não possui informações neste campo, pois suas propriedades não foram alteradas.';
			Ext.Ajax.request({
				method: 'POST',
				url: 'php/security/importUserSession.php',
				success: function(conn, response, options, e0pts) {
					var result = Packt.util.Util.decodeJSON(conn.responseText);
					var log = Ext.create('Packt.model.security.log.Log', {
						information: 'MAT.: ' + record[0].data.registration + '| NOME: ' + record[0].data.name,
						User_id: result.nome+'| '+result.matricula,
						operation: 'O usuário de MAT.: ' +record[0].data.registration+ ' foi excluído',
						detailsBefore: varDetailsBefore,
						detailsAfter: varDetailsAfter,
						dateOperation: dataOperacao
					});
					store.add(log);
					store.sync();
					store.reload();
				}
			});
		}
	}
});