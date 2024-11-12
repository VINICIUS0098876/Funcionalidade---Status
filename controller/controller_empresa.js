// Import do arquivo responsavel pela interação com DB(model)
const { application } = require('express')
const funcionandoDAO = require('../model/DAO/empresa.js')

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
const { join } = require('@prisma/client/runtime/library.js')
const { json } = require('body-parser')

const setAtualizar = async function(id, dadoAtualizado, contentType){
    try{

        let idFuncionario = id

        // console.log(dadoAtualizado);
        // Validação de content-type (apenas aplication/json)
        if(String(contentType).toLowerCase() == 'application/json'){
            let dadosID = funcionandoDAO.listById(idFuncionario)

            
            if(idFuncionario == '' || idFuncionario == undefined || idFuncionario == isNaN(idFuncionario) || idFuncionario == null){
                return message.ERROR_INVALID_ID
                
            }else if(idFuncionario > dadosID.length){
                return message.ERROR_NOT_FOUND
            }else{
                // Cria o objeto JSON para devolver os dados criados na requisição
                let atualizarJSON = {}
                
                    //Validação de campos obrigatórios ou com digitação inválida
                    if(dadoAtualizado.status == ''    || dadoAtualizado.status == undefined       ||  dadoAtualizado.status == null               || dadoAtualizado.status.length > 255 ){
                        return message.ERROR_REQUIRED_FIELDS
                    }
                    else{
                            // Encaminha os dados do filme para o DAO inserir no DB
                            let dadosFuncionario = await funcionandoDAO.update(dadoAtualizado, idFuncionario)
                
                            // Validação para verificar se o DAO inseriu os dados do DB
                        
                            if(dadosFuncionario){
                    
                                //Cria o JSON de retorno dos dados (201)
                                atualizarJSON.funcionario      = dadosFuncionario
                                atualizarJSON.status      = message.SUCCESS_UPDATED_ITEM.status
                                atualizarJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                                atualizarJSON.message     = message.SUCCESS_UPDATED_ITEM.message
                                return atualizarJSON //201
                                
                            }else{
                                return message.ERROR_INTERNAL_SERVER_DB //500
                            }
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
        }catch(error){
            console.log(error)
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}

const setListarPorId = async function(id){
    try {
        // Recebe o id do filme
    let idFuncionario = id

    //Cria o objeto JSON
    let JSON = {}


    //Validação para verificar se o id é válido(Vazio, indefinido e não numérico)
    if(idFuncionario == '' || idFuncionario == undefined || isNaN(idFuncionario)){
        return message.ERROR_INVALID_ID // 400
    }else{

        //Encaminha para o DAO localizar o id do filme 
        let dadosFuncionario = await funcionandoDAO.listById(idFuncionario)

        // Validação para verificar se existem dados de retorno
        if(dadosFuncionario){

            // Validação para verificar a quantidade de itens encontrados.
            if(dadosFuncionario.length > 0){

                for(let funcionarios of dadosFuncionario){
                    let cargoFuncionario = await funcionandoDAO.listCargoById(funcionarios.id)
                    let departamentoFuncionario = await funcionandoDAO.listDepartamentoById(funcionarios.id)
                    delete funcionarios.id_departamento
                    delete funcionarios.id_cargo
                    funcionarios.departamento = departamentoFuncionario
                    funcionarios.cargo = cargoFuncionario
                }

                //Criar o JSON de retorno
                JSON.funcionario = dadosFuncionario
                JSON.status_code = 200
    
                
                return JSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }
   } catch (error) {
       console.log(error)
       return message.ERROR_INTERNAL_SERVER_DB
   }
}

const setFiltrarStatus = async function(status){
    try {
        // Recebe o nome da especialidade
        let statusFuncionario = status
    //Cria o objeto JSON
    let JSON = {}

    //Validação para verificar se o id é válido(Vazio, indefinido e não numérico)
    if(statusFuncionario == '' || statusFuncionario == undefined){
        return message.ERROR_INVALID_ID // 400
    }else{
        
        //Encaminha para o DAO localizar o id do filme 
        let dadosFuncionario = await funcionandoDAO.filter(statusFuncionario)
        
        
        // Validação para verificar se existem dados de retorno
        if(dadosFuncionario){
            
            // Validação para verificar a quantidade de itens encontrados.
            if(dadosFuncionario.length > 0){
                // for (let index = 0; index < dadosAvaliacao.length; index++) {
                //     dadosAvaliacao[index].total_avaliacoes = parseInt(dadosAvaliacao[index].total_avaliacoes)
                // }
                
                //Criar o JSON de retorno
                JSON.funcionarios = dadosFuncionario
                JSON.quantidade = dadosFuncionario.length
                JSON.status_code = 200
    
                
                return JSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }
   } catch (error) {
       console.log(error)
       return message.ERROR_INTERNAL_SERVER_DB
   }
}

const setListarFuncionarios = async function(){
    try {
        let JSON = {}


   let dadosFuncionario = await funcionandoDAO.listAll()
   {
    if(dadosFuncionario){


        if(dadosFuncionario.length> 0){


            for(let funcionarios of dadosFuncionario){
                let cargoFuncionario = await funcionandoDAO.listCargoById(funcionarios.id)
                let departamentoFuncionario = await funcionandoDAO.listDepartamentoById(funcionarios.id)
                delete funcionarios.id_departamento
                delete funcionarios.id_cargo
                funcionarios.departamento = departamentoFuncionario
                funcionarios.cargo = cargoFuncionario
            }


            JSON.funcionarios = dadosFuncionario
            JSON.quantidade = dadosFuncionario.length
            JSON.status_code = 200
            return JSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }


    }
    }
    catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
}
}

const setDeletar = async function(id){
    try {
        let idFuncionario = id
    
        if(idFuncionario == '' || idFuncionario == undefined || idFuncionario == isNaN(idFuncionario) || idFuncionario == null){
            return message.ERROR_INVALID_ID
        }else{        

            let dadosFuncionario = await funcionandoDAO.deletar(idFuncionario)
    
        
            if(dadosFuncionario){
              return  message.SUCCESS_DELETED_ITEM
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}



module.exports = {
    setAtualizar,
    setListarPorId,
    setFiltrarStatus,
    setListarFuncionarios,
    setDeletar
}