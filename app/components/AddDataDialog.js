import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import DatabaseStyles from '../styles/DatabaseStyles'

class AddDataDialog extends React.Component {
  render() {
    return (
      <Dialog
        open = {this.props.displayAddDataArea}
        modal = {true}
      >
        <div>
          <TextField
            id = 'video id'
            hintText='Video Id'
            defaultValue={this.props.addDataValues.videoId}
            errorText = {this.props.addDataValues.errorTextVideoId}
            onChange={this.props.onAddDataTextVideoIdChange}
            style={DatabaseStyles.addDataTextField}
          />
          <TextField
            id = 'song'
            hintText='Song'
            defaultValue={this.props.addDataValues.song}
            errorText = {this.props.addDataValues.errorTextSong}
            onChange={this.props.onAddDataTextSongChange}
            style={DatabaseStyles.addDataTextField}
          />
          <TextField
            id = 'singer'
            hintText='Singer'
            defaultValue={this.props.addDataValues.singer}
            errorText = {this.props.addDataValues.errorTextSinger}
            onChange={this.props.onAddDataTextSingerChange}
            style={DatabaseStyles.addDataTextField}
          />
          <RaisedButton label='新增/更新' onClick={this.props.onAddDataClickOk} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
          <RaisedButton label='取消' onClick={this.props.onAddDataClickCancel} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
          <div style={DatabaseStyles.addDataHint}>{'( Video Id為youtube歌曲網址最後面的11碼 )'}</div>
        </div>
      </Dialog>
    )

  }
}

module.exports = AddDataDialog
