import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: true
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login(){
    this.setState({status:true});
  }
  logout(){
    this.setState({status:false});
  }
  render(){
     return (
      //  this.state.status === true &&
      //   <div>
      //   <h1>Welcome to System</h1>
      // </div>
      
      this.state.status === true ?
      <div>
        <h1>Welcome to System</h1>
        <button onClick={this.logout}>Logout</button>
      </div> 
      :
      <div>
        <h1>Do Login</h1>
        <button onClick={this.login}>Login</button>
      </div>      
       
    
  );
  }
 
}

export default App;
