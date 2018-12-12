import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './Note';
import Files from './Files';
import Home from './Home';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
// import CryptoJS from 'crypto-js';

// TODO:
// Fix: content-type being uploaded to server


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      txtData: 'write something here',
      encryptionKey: '',
      isEncrypted: false,
      cipherText: '',
      file: '',

    }
    this.userButton = this.userButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    console.log(e.target);
    console.log('handleChange hit!')
    this.setState({ [e.target.name]: e.target.value })
  }

  // encryptStuff () {
  //   let key;
  //   // if key is not default, replace with updated key, else use key =
  //   (this.state.key !== '') ? key = this.state.key : key = '1234567891011121'
  //   var cipherText = CryptoJS.AES.encrypt(this.state.txtData, key);
  //   this.setState({ 
  //     cipherText: cipherText,
  //     isEncrypted: true 
  //   });
  // };




  userButton () {
    alert('sup ;)');
    console.log('hello');
  };

  apiPost = async () => {
    // fetch should have api you are hitting

    const response = await fetch('/submit', {
      method: 'POST', 
      headers: {
        'Content-Type': 'image/png', // *** fix this content-type
      },
      // converting JSON into string
      body: JSON.stringify({ 
        txtData: this.state.txtData, 
        encryptionKey: this.state.encryptionKey 
      })
    });
    
    // response.text() part of body methods
    const body = await response.text();
    console.log('logging response: ', body);
    if (response.status !== 200) throw Error(body.messsage);
    return body
  };

  
  handleSubmit = async e => {
    e.preventDefault();
    this.apiPost()
      .then(res => this.setState({ file: res })) // place data incoming here
      .catch(err => console.log(err)); // if incoming data is error, console.log
  }

  
  render() {
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Encrypt and Decrypt</h1>
        </header>
        <br/>
        <nav>  
          <Link to="/"><button>Home</button></Link>
          <Link to="/note"><button>Note</button></Link>
          <Link to="/files"><button>Files</button></Link>
        </nav>

        <hr />
        {/* Switch goes down matching the path, ONLY renders the first path it finds */}
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/files" component={Files} />
        <Route 
          path="/note" 
          render={()=> (
            <Note 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              txtData={this.state.txtData}
              encryptionKey={this.state.encryptionKey}
              isEncrypted={this.state.isEncrypted}
              cipherText={this.state.cipherText}
              file={this.state.file}
            />
          )} 
        />
        <Redirect to="/" />
        </Switch>
        {/* <Note 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          txtData={this.state.txtData}
          encryptionKey={this.state.encryptionKey}
          isEncrypted={this.state.isEncrypted}
          cipherText={this.state.cipherText}
          file={this.state.file}

        /> */}
      </div>
    );
  }
}

export default App;
