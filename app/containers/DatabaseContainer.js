import React from 'react'
import {connect} from 'react-redux'

import Database from '../components/Database'

import {
  createDatabaseAction,
  setSelectedSongsAction,
  displayAddDataAreaAction,
  onAddDataTextVideoIdChangeAction,
  onAddDataTextSongChangeAction,
  onAddDataTextSingerChangeAction,
  onAddDataClickActionOk,
  onAddDataClickActionCancel
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
    if(this.props.addDataValues.videoId.length != 11) {

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

  render() {
    return (
      <Database
        songs = {this.props.songs}
        selectedRows = {this.props.selectedRows}
        onRowSelect = {this.props.onRowSelect}
        addSongsToPlayList = {this.props.addSongsToPlayList}
        displayAddDataArea = {this.props.displayAddDataArea}
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
      dispatch(onAddDataClickActionOk())
    },
    onAddDataClickCancel: () => {
      dispatch(onAddDataClickActionCancel())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabseContainer)
