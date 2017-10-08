import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ReactVoiceInput from 'react-voice-input'
import TextField from 'material-ui/TextField'

import * as socketIO from 'socket.io-client'

import Main from './components/Main'
import Header from './components/Header'
import './App.css'

const socket = socketIO('http://192.168.43.230:50000')

const style = {
  height: '100%',
  width: '100%',
  marginTop: '65px',
  display: 'flex',
  justifyContent: 'center'
}

const fixedBottom = {
  position: 'fixed',
  top: '90%',
  left: '95%'
}

class App extends Component {
  state = {
    open: false,
    command: ''
  }

  handleOpen = () => {
    this.setState({open: true})
    
  }

  handleClose = () => {
    this.setState({open: false})
  }

    onInputChange = (event) => {
    this.setState({
      command: event.target.value
    })
  }
 
  onResult = (result) => {
    this.setState({
      command: result
    })
  }
  sendCommand = () => {
    // console.log(this.state.command)
    if ( this.state.command === 'on' ) {
      socket.emit('pump', 1)
    } else {
      socket.emit('pump', 0)
    }
  }
  render() {
     const onEnd = () => {
      console.log('on end')
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.sendCommand}
      />,
    ]
    return (
      <div className="App">
        <Header/>
        <div style={style}>
          <Paper style={{ 'padding': '10px', 'width': '98%', 'height': '100%' }} zDepth={1}>
            <Main />
          </Paper>
          <FloatingActionButton onClick={this.handleOpen} style={fixedBottom}>
            <ContentSend />
        </FloatingActionButton>
        <Dialog
          contentStyle={{width: '25%', minWidth: '100%'}}
          title="Speak Now..."
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <ReactVoiceInput
          onResult={this.onResult}
          onEnd={onEnd}
        >
        <TextField
            hintText="speak..."
            style={{width: '97.5%'}}
            value={this.state.command} onChange={this.onInputChange}
        />
        </ReactVoiceInput>
        </Dialog>
        </div>
      </div>
    )
  }
}

export default App
