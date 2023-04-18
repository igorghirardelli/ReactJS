import React, {useState, useEffect,useMemo,useCallback} from "react";



function App() {

  const [tarefas, setTarefas] = useState([
    ' Pagar a conta de agua ',
    ' Ir no dentista ',
    ' Jogar bola'
    
  ]);

  const [input, setInput] = useState('');






  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas])






  const handleAdd = useCallback(() => {
    setTarefas([... tarefas, input])
    setInput('');
  }, [input,tarefas]);

 


  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);





  return (
    <div>
      
      <ul>  
        {tarefas.map(tarefa => (
          <li key={tarefa} >{tarefa}</li>
        ))}

      </ul>
      <br/>

      <strong>Voce tem {totalTarefas} tarefas!</strong> <br/>

      <input type="text" value={input}  onChange={(e) => setInput (e.target.value)} />   
      <button type="button" onClick={handleAdd} >Adicionar</button>

    </div>
  );
}

export default App;
