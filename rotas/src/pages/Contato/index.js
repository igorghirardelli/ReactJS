import{Link} from "react-router-dom";
function Contato(){

return(

    <div>
        <h1>Pagina contato</h1>
        <spa>Contato da empresa (34) 9837-7575 </spa> <br></br>

        <Link to = "/">Ir home</Link>
        <br></br>
        <Link to = "/sobre">Ir sobre</Link>
    </div>

);


}
export default Contato;