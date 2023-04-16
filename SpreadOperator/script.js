

function cadrastoPessoa(info){
    let novosDados = {
        ... info, 
        cargo:"programador",
        status: 1,
        codigo: '1502'
    };
    return novosDados
}

console.log(cadrastoPessoa({nome:"igor", sobrenome: "aaron", ano: 2022}));