// função entrar

function entrar(){
    var area =  document.getElementById('area');
    var texto = prompt('Digite o seu nome?');

    if(texto == '' || texto == null){
        alert('Digite seu nome novamente! ');
        area.innerHTML = 'Bem vindo... ';
    } else {
        area.innerHTML = 'Bem vindo ' + texto;
    }

    
}
