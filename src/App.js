import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoJS from 'crypto-js'
import smiley from './smiley.png';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pics: [smiley],
      txtData: 'write something here',
      key: '',
      isEncrypted: false,
      cipherText: '',
    }
    this.userButton = this.userButton.bind(this)
    this.deletePic = this.deletePic.bind(this)
    this.encryptStuff = this.encryptStuff.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

 

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  deletePic (e) {
    let pics = this.state.pics
    delete pics[0]
    this.setState({ pics })
    console.log(e.target.download)
  }

  encryptStuff () {
    let key;
    // if key is not default, replace with updated key, else use key =
    (this.state.key !== '') ? key = this.state.key : key = '1234567891011121'
    var cipherText = CryptoJS.AES.encrypt(this.state.txtData, key);
    this.setState({ 
      cipherText: cipherText,
      isEncrypted: true 
    })
  }


  userButton () {
    alert('sup ;)')
  }
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React AES Encrypt and Decrypt</h1>
        </header>

        {/* testing download feature */}
        {/* <a onClick={this.deletePic} href={smiley} download={'smiley.png'} >Save the image</a> */}

        <br/>

        <label>Text data: </label>
        <br/>
        <textarea onChange={this.handleChange} value={this.state.txtData} name={'txtData'}/>
        <br />
        <br />
        <label>Key (optional): </label>
        <input onChange={this.handleChange} value={this.state.key} name={'key'}></input>
        <button onClick={this.encryptStuff}>Encrypt!</button>
        <br/>

        {(this.state.isEncrypted) ? <textarea value={this.state.cipherText} onChange={this.handleChange} name={'cipherText'} /> : <br/>}
      </div>
    );
  }
}

export default App;
