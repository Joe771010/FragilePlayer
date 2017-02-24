import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import PauseCircleOutline from 'material-ui/svg-icons/av/pause-circle-outline';
import Replay from 'material-ui/svg-icons/av/replay';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import SkipNext from 'material-ui/svg-icons/av/skip-next';
import Slider from 'material-ui/Slider'
import DropDownMenu from 'material-ui/DropDownMenu';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import YouTube from 'react-youtube'

import MainStyles from '../styles/MainStyles.css'
import PlayerStyles from '../styles/PlayerStyles.js'

const injectTapEventPlugin = require("react-tap-event-plugin");


class Player extends React.Component {
  constructor(props) {
    super(props)
    injectTapEventPlugin();
  }
  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    const playIconButton = this.props.youtubeState==0? <Replay />:
                           this.props.youtubeState==1? <PauseCircleOutline />: <PlayCircleOutline />

    return (
      <div className='playerArea'>
        <div style={PlayerStyles.controlPanel}>
          <div style={PlayerStyles.controlButtons}>
            <IconButton
              iconStyle={PlayerStyles.controlButtonIconStyle}
              style={PlayerStyles.controlButtonStyle}
              onClick={this.props.onPreviousClick}
            >
              <SkipPrevious />
            </IconButton>
            <IconButton
              iconStyle={PlayerStyles.controlButtonIconStyle}
              style={PlayerStyles.controlButtonStyle}
              onClick={this.props.onPlayClick}
            >
              {playIconButton}
            </IconButton>
            <IconButton
              iconStyle={PlayerStyles.controlButtonIconStyle}
              style={PlayerStyles.controlButtonStyle}
              onClick={this.props.onNextClick}
            >
              <SkipNext />
            </IconButton>
          </div>
          <div style={PlayerStyles.volumeSliderPanel}>
            <Slider
              style = {PlayerStyles.volumeSlider}
              min = {0}
              max = {1}
              defaultValue = {0.2}
              onChange = {this.props.onVolumeChange}
            />
          </div>
        </div>

        <div style={PlayerStyles.infoPanel}>
          <div style={PlayerStyles.songInfo}>
            <div style={PlayerStyles.songNamePanel}>
              <div style={PlayerStyles.songNameText}>{this.props.song.Name} - {this.props.song.Singer}</div>
            </div>
            <div style={PlayerStyles.songSliderPanel}>
              <Slider
                style = {PlayerStyles.songSlider}
                min = {0}
                max = {this.props.duration==0? 100:this.props.duration}
                value = {this.props.time}
                onChange = {this.props.onTimeChange}
              />
            </div>
          </div>
          <div style={PlayerStyles.otherInfo}>
            <DropDownMenu value={this.props.playMode} onChange={this.props.onPlayModeChange} style={PlayerStyles.playModeItemStyle}>
              <MenuItem primaryText="依序播放" value={1} style={PlayerStyles.playModeItemStyle}/>
              <MenuItem primaryText="單曲循環" value={2} style={PlayerStyles.playModeItemStyle}/>
              <MenuItem primaryText="隨機播放" value={3} style={PlayerStyles.playModeItemStyle}/>
            </DropDownMenu>
          </div>
        </div>
        <div style={PlayerStyles.youtubeDebug}>
          <YouTube
            opts={opts}
            videoId={this.props.song.VideoId}
            onReady={this.props.onReady}
            onStateChange={this.props.onStateChange}
          />
        </div>
      </div>
    )
  }
}

module.exports = Player
