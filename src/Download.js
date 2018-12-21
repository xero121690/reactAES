import React, { Component } from 'react';



class Download extends Component {


  //  If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  // going to load just the id first
  componentDidMount () {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    this.props.handleChange('fileName', params.get('filename'));
    this.props.downloadLoad();
    
    // when actually dealing with filename in API, it is actually camelCase fileName
    console.log('params: ', params.get('filename')); // think about dealing with filenames
    console.log('params.get ', params.get('key'))
    console.log('componentDidMount')
  }
  render() {
    return (
      <div>
        <h1>You're about to read and destroy the note with id {this.props.fileName}</h1>
        <button onClick={this.props.handleSubmit}>Yes, show me the note</button>
        <button disabled>No, not now</button>
        <h2> </h2>
      </div>
    );
  }
}

export default Download;