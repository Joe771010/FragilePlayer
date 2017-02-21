import React from 'react'
import {connect} from 'react-redux'

import Database from '../components/Database'

import {
  createDatabaseAction,
  setSelectedSongsAction,
  onDataDeleteAction,
  onDataDeleteClickOkAction,
  onDataDeleteClickCancelAction,
  displayAddDataAreaAction,
  onAddDataTextVideoIdChangeAction,
  onAddDataTextSongChangeAction,
  onAddDataTextSingerChangeAction,
  onAddDataClickOkAction,
  onAddDataClickCancelAction,
  inputErrorVideoIdAction,
  inputErrorSongAction,
  inputErrorSingerAction
} from '../actions/database'

import {addSongsToPlayListAction} from '../actions/player'

// firebase
import firebase from 'firebase'

class DatabseContainer extends React.Component {
  componentWillMount() {
    this.firebaseRef = firebase.database().ref()
    this.firebaseRef.on('value', function(dataSnapShot){
      let data = [];
      dataSnapShot.forEach(function(childSnapShot){
        let p = {
          VideoId: childSnapShot.key,
          Name: childSnapShot.val().Name,
          Singer: childSnapShot.val().Singer
        }
        data.push(p);
      });
      this.props.onDatabaseCreate(data);
    }.bind(this));
  }
  _onAddDataClickOk() {
    // check input
    if (this.props.addDataValues.videoId.length != 11) {
      this.props.inputErrorVideoId('Invalid Id')
      return
    } else if (this.props.addDataValues.song.length == 0) {
      this.props.inputErrorSong('Song Name')
      return
    } else if (this.props.addDataValues.singer.length == 0) {
      this.props.inputErrorSinger('Singer Name')
      return
    }
    // api call
    let newSong = {
      [this.props.addDataValues.videoId]: {
        Name: this.props.addDataValues.song,
        Singer: this.props.addDataValues.singer
      }
    }
    this.firebaseRef.update(newSong)
    // send action
    this.props.onAddDataClickOk()
  }
  _onDeleteDataClickOk() {
    // api call
    let refToDelete = firebase.database().ref(this.props.songs[this.props.rowToDelete].VideoId)
    refToDelete.remove()
    // send action
    this.props.onDataDeleteClickOk()
  }

  render() {
    return (
      <Database
        songs = {this.props.songs}
        selectedRows = {this.props.selectedRows}
        onRowSelect = {this.props.onRowSelect}
        onDataDelete = {this.props.onDataDelete}
        onDataDeleteClickOk = {() => this._onDeleteDataClickOk()}
        onDataDeleteClickCancel = {this.props.onDataDeleteClickCancel}
        addSongsToPlayList = {this.props.addSongsToPlayList}
        displayAddDataArea = {this.props.displayAddDataArea}
        displayDeleteDataDialog = {this.props.displayDeleteDataDialog}
        onDisplayAddData = {this.props.onDisplayAddData}
        onAddDataTextVideoIdChange = {this.props.onAddDataTextVideoIdChange}
        onAddDataTextSongChange = {this.props.onAddDataTextSongChange}
        onAddDataTextSingerChange = {this.props.onAddDataTextSingerChange}
        onAddDataClickOk = {() => this._onAddDataClickOk()}
        onAddDataClickCancel = {this.props.onAddDataClickCancel}
        addDataValues = {this.props.addDataValues}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.database.songs,
    selectedRows: state.database.selected,
    displayAddDataArea: state.database.displayAddDataArea,
    displayDeleteDataDialog: state.database.displayDeleteDataDialog,
    rowToDelete: state.database.rowToDelete,
    addDataValues: state.database.addData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDatabaseCreate: (db) => {
      dispatch(createDatabaseAction(db))
    },
    onRowSelect: (row) => {
      dispatch(setSelectedSongsAction(row))
    },
    onDataDelete: (row) => {
      dispatch(onDataDeleteAction(row))
    },
    onDataDeleteClickOk: () => {
      dispatch(onDataDeleteClickOkAction())
    },
    onDataDeleteClickCancel: () => {
      dispatch(onDataDeleteClickCancelAction())
    },
    addSongsToPlayList: (songs, selectedRows) => {
      dispatch(addSongsToPlayListAction(songs, selectedRows))
    },
    onDisplayAddData: () => {
      dispatch(displayAddDataAreaAction())
    },
    onAddDataTextVideoIdChange: (event, newValue) => {
      dispatch(onAddDataTextVideoIdChangeAction(newValue))
    },
    onAddDataTextSongChange: (event, newValue) => {
      dispatch(onAddDataTextSongChangeAction(newValue))
    },
    onAddDataTextSingerChange: (event, newValue) => {
      dispatch(onAddDataTextSingerChangeAction(newValue))
    },
    onAddDataClickOk: () => {
      dispatch(onAddDataClickOkAction())
    },
    onAddDataClickCancel: () => {
      dispatch(onAddDataClickCancelAction())
    },
    inputErrorVideoId: (text) => {
      dispatch(inputErrorVideoIdAction(text))
    },
    inputErrorSong: (text) => {
      dispatch(inputErrorSongAction(text))
    },
    inputErrorSinger: (text) => {
      dispatch(inputErrorSingerAction(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabseContainer)
