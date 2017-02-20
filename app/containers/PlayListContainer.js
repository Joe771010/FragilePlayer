import React from 'react'
import {connect} from 'react-redux'

import {playFromPlayListAction, removeFromPlayListAction} from '../actions/player'

import PlayList from '../components/PlayList'

class PlayListContainer extends React.Component {
  render() {
    return (
      <PlayList
        currentSongIndex = {this.props.currentSongIndex}
        songsInList = {this.props.songsInList}
        onPlayClick = {this.props.onPlayClick}
        onRemoveClick = {this.props.onRemoveClick}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    songsInList: state.player.playList,
    currentSongIndex: state.player.currentSongIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayClick: (songIndex) => {
      dispatch(playFromPlayListAction(songIndex))
    },
    onRemoveClick: (songIndex) => {
      dispatch(removeFromPlayListAction(songIndex))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayListContainer)
