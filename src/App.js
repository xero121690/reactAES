import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './Note';
import Files from './Files';
import Home from './Home';
import Download from './Download';
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
      urlLink: '',
      fileName: 'testing',
    }
    this.userButton = this.userButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.downloadLoad = this.downloadLoad.bind(this);
  }

  handleChange = (name, value) => (e) => {
    console.log(e.target);
    console.log('handleChange hit!')
    if (e.target !== undefined) {
      this.setState({ [e.target.name]: e.target.value })
    }
    if (typeof name !== undefined && typeof value !== undefined) {
      this.setState({ [name]: value })
    }
    
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

  // POST for Note upload and encryption
  apiPost = async () => {
    // fetch should have api you are hitting

    const response = await fetch('/note', {
      method: 'POST', 
      headers: {
        'Content-Type': 'text/plain', 
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
    return body;
  };

  // apiPost replacement CONTINUE
  downloadLoad = async () => {
    const response = await fetch('/loadNote', {
      // POST becasue you are sending body
      method: 'POST',
      headers: {
        'Content-type': 'text/plain'
      },
      body: JSON.stringify({
        fileName: this.state.fileName,
      })
    });
   const body = await response.text();
   console.log('logging response: ', body);
   console.log(response.status)
  //  if for whatever reason, no body.message sent, replace it with whatever the body has. (backend)
   if (response.status !== 200) throw new Error(body.message ? body.message : response.status + ' ' + body);
   return body;
  }

  
  handleSubmit = async e => {
    e.preventDefault();
    this.apiPost()
      .then(res => this.setState({ urlLink: res })) // place data incoming here
      .catch(err => console.log(err)); // if incoming data is error, console.log, it will detect the error matching the await 
  }

  // CONTINUE
  searchParams (paramString) {
    const params = new URLSearchParams(paramString);
    console.log(params);
    this.props.handleChange('fileName', params.get('filename'));
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
        {/* Switch goes down matching the path, ONLY renders the first path match it finds */}
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/files" component={Files} />
        <Route 
          path="/Download" 
          // passing props here allows react router to pass its properties to the component
          // properties such as history, location, match 
          render={(props) => (
            <Download
            downloadLoad={this.downloadLoad}
            fileName={this.state.fileName}
            handleChange={this.handleChange}
            {...props}
            />
        )} />
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
              urlLink={this.state.urlLink}
            />
          )} 
        />
        {/* anything that isn't accounted for above, is redirected to / */}
        <Redirect to="/" />
        </Switch>
        {/* <Note 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          txtData={this.state.txtData}
          encryptionKey={this.state.encryptionKey}
          isEncrypted={this.state.isEncrypted}
          cipherText={this.state.cipherText}
          urlLink={this.state.urlLink}

        /> */}
      </div>
    );
  }
}

export default App;
