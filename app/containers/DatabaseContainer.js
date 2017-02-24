import React from 'react'
import {connect} from 'react-redux'

import Database from '../components/Database'

import {
  onSignInAction,
  onSignOutAction,
  onSignOutClickOkAction,
  onSignOutClickCancelAction,
  createDatabaseAction,
  editDatabaseAction,
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

import {addSongsToPlayListAction, playFromDatabaseAction} from '../actions/player'

// firebase
import firebase from 'firebase'

class DatabseContainer extends React.Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.props.onSignInClick(user.uid, user.email)
        // load songs
        this.firebaseRef = firebase.database().ref('users/' + user.uid)
        this.firebaseRef.on('value', (dataSnapShot) => {
          let data = [];
          dataSnapShot.forEach((childSnapShot) => {
            let p = {
              VideoId: childSnapShot.key,
              Name: childSnapShot.val().Name,
              Singer: childSnapShot.val().Singer
            }
            data.push(p);
          });
          this.props.onDatabaseCreate(data);
        });
      } else {
        // No user is signed in.
        // this.props.onSignOutClick()
      }
    });
  }
  _onUserSignClick() {
    if(this.props.userId == '') {
      // sign in
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
      // firebase.auth().signInWithPopup(provider).then(function(result) {
      //   console.log('Sign-in succeeded')
      // }.bind(this)).catch(function(error) {
      //   console.log('Sign-in failed')
      // });
    } else {
      // sign out
      // firebase.auth().signOut();
      this.props.onSignOutClick();
    }
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
        userId = {this.props.userId}
        userEmail = {this.props.userEmail}
        onUserSignClick = {() => this._onUserSignClick()}
        onSignOutClickOk = {this.props.onSignOutClickOk}
        onSignOutClickCancel = {this.props.onSignOutClickCancel}
        songs = {this.props.songs}
        selectedRows = {this.props.selectedRows}
        playFromDatabase = {this.props.playFromDatabase}
        editDatabase = {this.props.editDatabase}
        onRowSelect = {this.props.onRowSelect}
        onDataDelete = {this.props.onDataDelete}
        onDataDeleteClickOk = {() => this._onDeleteDataClickOk()}
        onDataDeleteClickCancel = {this.props.onDataDeleteClickCancel}
        addSongsToPlayList = {this.props.addSongsToPlayList}
        displaySignOutDialog = {this.props.displaySignOutDialog}
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
    userId: state.database.userId,
    userEmail: state.database.userEmail,
    songs: state.database.songs,
    selectedRows: state.database.selected,
    displaySignOutDialog: state.database.displaySignOutDialog,
    displayAddDataArea: state.database.displayAddDataArea,
    displayDeleteDataDialog: state.database.displayDeleteDataDialog,
    rowToDelete: state.database.rowToDelete,
    addDataValues: state.database.addData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInClick: (userId, userEmail) => {
      dispatch(onSignInAction(userId, userEmail))
    },
    onSignOutClick: () => {
      dispatch(onSignOutAction())
    },
    onSignOutClickOk: () => {
      dispatch(onSignOutClickOkAction())
    },
    onSignOutClickCancel: () => {
      dispatch(onSignOutClickCancelAction())
    },
    onDatabaseCreate: (db) => {
      dispatch(createDatabaseAction(db))
    },
    playFromDatabase: (song) => {
      dispatch(playFromDatabaseAction(song))
    },
    editDatabase: (song) => {
      dispatch(editDatabaseAction(song))
    },
    onRowSelect: (row) => {
      dispatch(setSelectedSongsAction(row))
    },
    addSongsToPlayList: (songs, selectedRows) => {
      dispatch(addSongsToPlayListAction(songs, selectedRows))
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabseContainer)
