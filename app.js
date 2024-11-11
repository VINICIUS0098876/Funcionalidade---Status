const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()



app.use((request, response, next) => {

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())
    
    next()
})
const bodyParserJSON = bodyParser.json()


const controllerEmpresa = require('./controller/controller_empresa.js')
const { log } = require('console')


app.put('/v1/empresa/atualizar/funcionario/:id', cors(), bodyParserJSON, async function(request,response,next){

    let idFuncionario = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUptadeFuncionario = await controllerEmpresa.setAtualizar(idFuncionario, dadosBody, contentType)

    response.status(resultUptadeFuncionario.status_code)
    response.json(resultUptadeFuncionario)

})

app.get('/v1/empresa/funcionario/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idFuncionario = request.params.id
    //encaminha o id para a acontroller buscar o filme
    let dadosFuncionario = await controllerEmpresa.setListarPorId(idFuncionario)

    response.status(dadosFuncionario.status_code);
    response.json(dadosFuncionario);
})

app.get('/v1/empresa/funcionario/status/filtro', cors(), async function(request, response, next){        
    let status = request.query.status    
    let dadosFuncionario = await controllerEmpresa.setFiltrarStatus(status)

    response.status(dadosFuncionario.status_code)
    response.json(dadosFuncionario)
})

app.listen('8080', function(){
    console.log('API funcionando!!')
})