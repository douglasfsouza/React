 
function Nome({nome,sobre,setNome}){
    return(
        <div>
            <span style={{color:'red'}}>Nome: {nome} {sobre}</span>
            <br/>
            <button onClick={()=>setNome('Andreia')}>Mudar</button>     
                 
        </div>
    )
}

export default Nome;