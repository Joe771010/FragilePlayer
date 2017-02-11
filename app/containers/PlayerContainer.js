import React from 'react'
import {connect} from 'react-redux'

import Player from '../components/Player'

import {setYoutubePlayerAction, onPlayClickAction, onYoutubeStateChangeAction, onVolumeChangeAction, onTimeChangeAction, autoSlidingAction} from '../actions'

class PlayerContainer extends React.Component {
  componentDidMount() {
    // 讓歌曲進度的slider能夠自動捲動, 每1000ms去更新一次state
    setInterval(() => {
      this.props.autoSliding();
    }, 1000)
  }
  render() {
    return (
      <Player
        videoId = {this.props.videoId}
        youtubeState = {this.props.youtubeState}
        duration = {this.props.duration}
        time = {this.props.time}
        onReady = {this.props.onYoutubeSet}
        onPlayClick = {this.props.onPlayClick}
        onVolumeChange = {this.props.onVolumeChange}
        onTimeChange = {this.props.onTimeChange}
        onStateChange = {this.props.onStateChange}
      />
    )
  }

  ///////////////////////////////////////////

}

///////////////////////////////////////////
const mapStateToProps = (state) => {
  let duration = state.player.youtube? state.player.youtube.getDuration(): 0;
  let time = state.player.youtube? state.player.youtube.getCurrentTime(): 0;
  return {
    videoId: state.player.videoId,
    youtubeState: state.player.youtubeState,
    duration: duration,
    time: time
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onYoutubeSet: (event) => {
      dispatch(setYoutubePlayerAction(event.target))
    },
    onPlayClick: () => {
      dispatch(onPlayClickAction())
    },
    onVolumeChange: (event, value) => {
      // slider change event
      dispatch(onVolumeChangeAction(value*100))
    },
    onTimeChange: (event, value) => {
      // slider change event
      dispatch(onTimeChangeAction(value))
    },
    onStateChange: () => {
      dispatch(onYoutubeStateChangeAction())
    },
    autoSliding: () => {
      dispatch(autoSlidingAction())
    }
  }
}

// module.exports = PlayerContainer
export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
