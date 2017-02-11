const initialState = () => {
  return {
    youtube: null,
    videoId: 'EmjhISspkyY',
    youtubeState: -1,
    currentTime: 0
  }
}

/*
youtube api getPlayerState():
 -1 – unstarted
  0 – ended
  1 – playing
  2 – paused
  3 – buffering
  5 – video cued
*/

const player = (state = initialState(), action) => {
  let youtubePlayerState = undefined;
  switch(action.type) {
    case 'SET_YOUTUBE_PLAYER':
      // 初始音量 0-100
      action.youtube.setVolume(5);
      // 建立youtube player物件
      return Object.assign({}, state, {
          youtube: action.youtube
      })
    case 'CLICK_PLAY':
      clickPlay(state.youtube)
      return state;
    case 'CHANGE_VOLUME':
      changeVolume(state.youtube, action.volume)
      return state;
    case 'CHANGE_TIME':
      seek(state.youtube, action.time)
      return Object.assign({}, state, {
        currentTime: action.time
      })
    case 'SLIDE_AUTO':
      return Object.assign({}, state, {
        currentTime: state.youtube? state.youtube.getCurrentTime(): 0
      })
    case 'YOUTUBE_STATE_CHANGED':
      console.log(state.youtube.getPlayerState())
      return Object.assign({}, state, {
        youtubeState: state.youtube.getPlayerState()
      })
    default:
      return state
  }
}

const clickPlay = (youtube) => {
  let state = youtube.getPlayerState();
  switch(state) {
    case 0:
      youtube.playVideo();
      break;
    case 1:
      youtube.pauseVideo();
      break;
    case 2:
      youtube.playVideo();
      break;
    case 5:
      youtube.playVideo();
      break;
  }
}

const changeVolume = (youtube, volume) => {
  youtube.setVolume(volume);
}

const seek = (youtube, time) => {
  let state = youtube.getPlayerState();
  switch(state) {
    case 1:
      youtube.seekTo(time, true);
      break;
    case 2:
      youtube.seekTo(time, true);
      break;
    case 5:
      youtube.seekTo(time, true);
      youtube.playVideo();
      break;
  }
}



export default player
