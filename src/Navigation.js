import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Note from './Note';
import Files from './Files';
import Home from './Home';
class Navigation extends Component {

  render () {
    return (
      // react's class attribute is a key word, thus className being used here
      <div className="Navigation">
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
          render={(props)=> (
            <Note 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              txtData={this.state.txtData}
              key={this.state.key}
              isEncrypted={this.state.isEncrypted}
              cipherText={this.state.cipherText}
              file={this.state.file}
            />
          )} 
        />
        <Redirect to="/" />
        </Switch>
    </div>
    )
  }

}

export default Navigation;