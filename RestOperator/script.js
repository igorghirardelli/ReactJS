
function cadrastar(usuarios, ...novosusuarios){
    let totalusuarios = [
        ...usuarios,
        ...novosusuarios
    ];
    return console.log(totalusuarios);
}

let usuarios =  ["igor", "joao"];

let novosusuarios  = cadrastar(usuarios, "antonio","lucas");