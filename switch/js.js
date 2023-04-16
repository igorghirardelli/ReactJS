
document.write("<br> Escolha o seu pedido: <br>");
document.write("<br> 0 = sorvete/ 1 = suco <br>");
document.write("<br> 2 = coca cola/ 3 = agua <br> <br> ");

//switch
function pedir(){
    x = prompt("Oque deseja pedir?");
    switch(x){
        case "0": alert("Voce pediu um sorvete");
        break;
        case "1": alert("Voce pediu um suco");
        break;
        case "2": alert("Voce pediu uma coca cola");
        break;
        case "3": alert("Voce pediu uma agua");
        break;
        default:
            alert("ops não temos essa opção:");
    }
}
