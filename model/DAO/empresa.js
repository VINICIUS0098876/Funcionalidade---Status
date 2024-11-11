const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const update = async function(dadosFuncionario, idFuncionario){
    let sql
    try {
        sql = `update funcionarios set
        status = '${dadosFuncionario.status}', data_demissao = CURDATE(), data_admissao = CURDATE()
        where funcionarios.id = ${idFuncionario}`
        
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
        return true
     }else{
        return false
     }
    } catch (error) {
        console.log(error);
        return false
    }
}

const listById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from funcionarios where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsUsuario = await prisma.$queryRawUnsafe(sql);

            return rsUsuario;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const filter = async function(status){
    try {
        let sql = `SELECT f.id, f.nome, d.nome AS departamento, c.nome AS cargo, f.data_admissao, f.data_demissao
FROM funcionarios f
JOIN departamentos d ON f.id_departamento = d.id
JOIN cargos c ON f.id_cargo = c.id
WHERE f.status = '${status}';`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        console.log(error);
        return false
    }
}

const listCargoById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from cargos where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsUsuario = await prisma.$queryRawUnsafe(sql);

            return rsUsuario;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const listDepartamentoById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from departamentos where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsUsuario = await prisma.$queryRawUnsafe(sql);

            return rsUsuario;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

module.exports = {
    update,
    listById,
    filter,
    listCargoById,
    listDepartamentoById
}
