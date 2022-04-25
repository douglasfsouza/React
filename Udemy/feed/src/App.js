import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Feed from "./components/feed"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      feed: [
        {id: "1", userName: "Douglas", curtidas:5, comentarios:3},
        {id: "2", userName: "Andreia", curtidas:3, comentarios:2},
        {id: "3", userName: "Matheus", curtidas:13, comentarios:12},
        {id: "4", userName: "Nico", curtidas:13, comentarios:25}, 
        {id: "5", userName: "Suzanne", curtidas:130, comentarios:120} 
      ]
    }        
    
  }
  
  render(){
    return (
      <div key="root-app" id="100">
        {this.state.feed.map((item)=>{
          return (
            <Feed key={item.id} id={item.id} userName={item.userName} curtidas={item.curtidas} comentarios={item.comentarios} />
          );

        })};
        
      </div>
    );
  }
  
}



export default App;
