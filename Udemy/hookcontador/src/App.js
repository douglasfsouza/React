import React, {useState} from "react";
function App() {
  const [counter, setCounter] = useState(0); 
  return (
    <div >
        <h1>You clicked {counter} times!!</h1>
        <button onClick={()=>setCounter(counter + 1)}>+</button>
    </div>
  );
}

export default App;
