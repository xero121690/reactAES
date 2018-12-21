import React, { Component } from 'react';
import './App.css';
class Note extends Component {
  render() {
    const box = {
      backgroundColor: 'lightgrey',
      maxWidth: '500px',
      border: '#f1f1f1',
      padding: '25px',
      margin: '25px',
      display: 'inline-block'
      };
    return (
      <div className="Note">
        <label>Text data: </label>
        <br/>
        {/* 
        reason this.props.handleChange() has (), and not this.props.handlechange
        is because handleChange = (name, value) => (e) => 
        meaning name and value need to be passed, even if it is undefined, hence ()
        */}
        <textarea onChange={this.props.handleChange()} value={this.props.txtData} name={'txtData'}/>
        <br />
        <br />
        <label>Key: </label>
        <input onChange={this.props.handleChange()} value={this.props.encryptionKey} name={'encryptionKey'}></input>
        <button onClick={this.props.handleSubmit}>Encrypt!</button>
        <br/>

        {(this.props.isEncrypted) ? <textarea value={this.props.cipherText} onChange={this.props.handleChange()} name={'cipherText'} /> : <br/>}
        {(this.props.urlLink) ? <div style={box}> {this.props.urlLink} </div>: <br/>}
      </div>
    );
  }
}

export default Note;