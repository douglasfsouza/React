import React, { Component } from "react";
class Feed extends Component{    
    render(){
      return (
        <div key={this.props.id} id={this.props.id}>             
          <h3 key={'h3-' + this.props.id} id={'h3-' + this.props.id}>{this.props.userName}</h3>
          <a key={'a-' + this.props.id} id={'a-' + this.props.id}>{this.props.curtidas} Curtidas / {this.props.comentarios} Comentarios</a>
          <hr key={'hr-' + this.props.id} id={'hr-' + this.props.id} />
        </div>
      )
    }
  }

  export default Feed