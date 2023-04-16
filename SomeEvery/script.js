// SOME EVERY

let nomes = [
    {nome: "igor",idade: 14, },
    {nome: "joao", idade: 19,},
    {nome: "antonio", idade: 18}

];


//console.log (nomes.some(nome => nome === "joao"));


console.log (nomes.every(nome => nome.idade >=15));

if(nomes.every(nome => nome.idade >=18)){
    console.log("todos são maiores de 18 anos")
} else {
    console.log("ops alguem é de menor ")
}