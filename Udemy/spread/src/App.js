

function App() {
  function spread(){
    let a1 = [1,2,3];
    let a2 = [...a1,4,5,6];
    a2.map((x)=>{
      alert(x);
    })

    //outro exemplo
    let pessoa = {nome: 'Douglas',
              idade: '46'};
    let pessoaAno = {...pessoa,ano:2022};
    alert(`${pessoaAno.nome} tem ${pessoaAno.idade} em ${pessoaAno.ano}`);
  }
  return (
    <div >
       <button onClick={spread}>Spread</button>
    </div>
  );
}

export default App;
