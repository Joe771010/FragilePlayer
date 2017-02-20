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
import PlayerStyles from '../styles/PlayerStyles.css'

const injectTapEventPlugin = require("react-tap-event-plugin");


class Player extends React.Component {
  constructor(props) {
    super(props)
    injectTapEventPlugin();
  }
  render() {
    const opts = {
      height: '150',
      width: '150',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    const playIconButton = this.props.youtubeState==0? <Replay />:
                           this.props.youtubeState==1? <PauseCircleOutline />: <PlayCircleOutline />

    return (
      <div className='playerArea'>
        <div className='controlPanel'>
          <div className='controlButtons'>
            <IconButton
              iconStyle={styles.controlButtonIconStyle}
              style={styles.controlButtonStyle}
              onClick={this.props.onPreviousClick}
            >
              <SkipPrevious />
            </IconButton>
            <IconButton
              iconStyle={styles.controlButtonIconStyle}
              style={styles.controlButtonStyle}
              onClick={this.props.onPlayClick}
            >
              {playIconButton}
            </IconButton>
            <IconButton
              iconStyle={styles.controlButtonIconStyle}
              style={styles.controlButtonStyle}
              onClick={this.props.onNextClick}
            >
              <SkipNext />
            </IconButton>
          </div>
          <div className='volumeSliderPanel'>
            <Slider
              className = 'volumeSlider'
              defaultValue = {0.2}
              onChange = {this.props.onVolumeChange}
            />
          </div>
        </div>

        <div className='infoPanel'>
          <div className='songInfo'>
            <div className='songNamePanel'>
              <div className='songNameText'>{this.props.songName} - {this.props.singerName}</div>
            </div>
            <div className='songSliderPanel'>
              <Slider
                className = 'songSlider'
                min = {0}
                max = {this.props.duration + 0.1}
                value = {this.props.time}
                onChange = {this.props.onTimeChange}
              />
            </div>
          </div>
          <div className='otherInfo'>
            <DropDownMenu value={this.props.playMode} onChange={this.props.onPlayModeChange} style={styles.playModeItemStyle}>
              <MenuItem primaryText="依序播放" value={1} style={styles.playModeItemStyle}/>
              <MenuItem primaryText="單曲循環" value={2} style={styles.playModeItemStyle}/>
              <MenuItem primaryText="隨機播放" value={3} style={styles.playModeItemStyle}/>
            </DropDownMenu>
          </div>
        </div>

        <div className='youtubeDebug'>
          <YouTube
            opts={opts}
            videoId={this.props.videoId}
            onReady={this.props.onReady}
            onStateChange={this.props.onStateChange}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  controlButtonIconStyle: {
    width: '36px',
    height: '36px'
  },
  controlButtonStyle: {
    width: '50px',
    height: '50px',
    padding: '7px'
  },
  playModeItemStyle: {
    fontFamily: 'Microsoft JhengHei',
    fontSize: '14px'
  }
}

module.exports = Player
