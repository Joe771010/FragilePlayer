import React from 'react'
import {connect} from 'react-redux'

import Player from '../components/Player'

import {
  setYoutubePlayerAction,
  onPlayClickAction,
  onNextClickAction,
  onPreviousClickAction,
  onYoutubeStateChangeAction,
  onVolumeChangeAction,
  onPlayModeChangeAction,
  onTimeChangeAction,
  autoSlidingAction} from '../actions/player'

class PlayerContainer extends React.Component {
  componentDidMount() {
    // 讓歌曲進度的slider能夠自動捲動, 每1000ms去更新一次state
    setInterval(() => {
      this._autoSliding();
    }, 1000)
  }

  /*
  因為不允許api call被寫在reducer, 所以如果有要用到api call, 統一用'_'開頭的function來做
  */

  _onYoutubeSet(event) {
    // api call
    event.target.setVolume(20);
    event.target.setPlaybackQuality('medium')
    // send action
    this.props.onYoutubeSet(event)
  }
  _onPlayClick() {
    // api call
    if(this.props.currentSongIndex != -1) {
      switch(this.props.youtubeState) {
        case 0:
          this.props.youtube.playVideo();
          break;
        case 1:
          this.props.youtube.pauseVideo();
          break;
        case 2:
          this.props.youtube.playVideo();
          break;
        case 5:
          this.props.youtube.playVideo();
          break;
      }
    }
    // send action
    this.props.onPlayClick()
  }
  _onVolumeChange(event, volume) {
    // api call
    if(this.props.youtube.isMuted) this.props.youtube.unMute()
    this.props.youtube.setVolume(volume*100);
    // send action
    this.props.onVolumeChange(event, volume)
  }
  _onTimeChange(event, value) {
    // send action (放在api call前面讓介面比較不會lag)
    this.props.onTimeChange(event, value)
    this.props.autoSliding()
    // api call
    switch(this.props.youtubeState) {
      case 1:
        this.props.youtube.seekTo(value, true);
        break;
      case 2:
        this.props.youtube.seekTo(value, true);
        break;
      case 5:
        this.props.youtube.seekTo(value, true);
        this.props.youtube.playVideo();
        break;
    }
  }
  _onStateChange() {
    let youtubeState = this.props.youtube.getPlayerState()
    if(youtubeState == 0 && this.props.playMode == 2) {
      this.props.youtube.playVideo();
    }
    // send action
    this.props.onStateChange(youtubeState)
  }
  _autoSliding() {
    // api call
    let t = this.props.youtube? this.props.youtube.getCurrentTime(): 0
    // send action
    this.props.autoSliding(t)
  }
  render() {
    return (
      <Player
        song = {this.props.song}

        youtubeState = {this.props.youtubeState}
        duration = {this.props.duration}
        time = {this.props.time}
        playMode = {this.props.playMode}

        
        onReady = {(event) => this._onYoutubeSet(event)}
        onPlayClick = {() => this._onPlayClick()}
        onPreviousClick = {this.props.onPreviousClick}
        onNextClick = {this.props.onNextClick}
        onVolumeChange = {(event, value) => this._onVolumeChange(event, value)}
        onTimeChange = {(event, value) => this._onTimeChange(event, value)}
        onStateChange = {() => this._onStateChange()}
        onPlayModeChange = {this.props.onPlayModeChange}
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
    youtube: state.player.youtube,
    song: state.player.song,
    // videoId: state.player.videoId,
    youtubeState: state.player.youtubeState,
    duration: duration,
    time: time,
    currentSongIndex: state.player.currentSongIndex,
    playMode: state.player.playMode,
    // songName: state.player.songName,
    // singerName: state.player.singerName
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
    onNextClick: () => {
      dispatch(onNextClickAction())
    },
    onPreviousClick: () => {
      dispatch(onPreviousClickAction())
    },
    onVolumeChange: (event, value) => {
      // slider change event
      dispatch(onVolumeChangeAction(value*100))
    },
    onTimeChange: (event, value) => {
      // slider change event
      dispatch(onTimeChangeAction(value))
    },
    onStateChange: (youtubeState) => {
      dispatch(onYoutubeStateChangeAction(youtubeState))
    },
    autoSliding: (time) => {
      dispatch(autoSlidingAction(time))
    },
    onPlayModeChange: (event, key, payload) => {
      dispatch(onPlayModeChangeAction(payload))
    }
  }
}

// module.exports = PlayerContainer
export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
