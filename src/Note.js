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
        <textarea onChange={this.props.handleChange} value={this.props.txtData} name={'txtData'}/>
        <br />
        <br />
        <label>Key: </label>
        <input onChange={this.props.handleChange} value={this.props.encryptionKey} name={'encryptionKey'}></input>
        <button onClick={this.props.handleSubmit}>Encrypt!</button>
        <br/>

        {(this.props.isEncrypted) ? <textarea value={this.props.cipherText} onChange={this.props.handleChange} name={'cipherText'} /> : <br/>}
        {(this.props.file) ? <div style={box}> {this.props.file} </div>: <br/>}
      </div>
    );
  }
}

export default Note;