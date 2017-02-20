/*
############# Reducer 不能有 API CALL #############
*/

const initialState = () => {
  return {
    // player
    youtube: null,
    videoId: '',
    youtubeState: -1,
    currentTime: 0,
    playMode: 1,
    // songName: '是誰在饒舌',
    // singerName: 'Reall Lin 聖凱',

    // play list
    playList: [WhoIsRapping()],
    currentSongIndex: -1
  }
}

const WhoIsRapping = () => {
  return {
    VideoId: '-iHywTWxYFY',
    Name: '是誰在饒舌',
    Singer: 'Reall Lin '
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
      // console.log('SET_YOUTUBE_PLAYER')
      // 建立youtube player物件
      return Object.assign({}, state, {
          youtube: action.youtube
      })
    case 'CLICK_PLAY':
      if(state.currentSongIndex == -1) {
        return Object.assign({}, state, {
          videoId: state.playList[0].VideoId,
          currentSongIndex: 0
        })
      } else {
        return state;
      }
    case 'CLICK_NEXT':
      if(state.currentSongIndex >= state.playList.length-1){
        return state;
      } else {
        return Object.assign({}, state, {
          videoId: state.playList[state.currentSongIndex+1].VideoId,
          currentSongIndex: state.currentSongIndex+1
        })
      }
    case 'CLICK_PREVIOUS':
      if(state.currentSongIndex <= 0){
        return state;
      } else {
        return Object.assign({}, state, {
          videoId: state.playList[state.currentSongIndex-1].VideoId,
          currentSongIndex: state.currentSongIndex-1
        })
      }
    case 'CHANGE_VOLUME':
      return state;
    case 'CHANGE_TIME':
      return Object.assign({}, state, {
        currentTime: action.time
      })
    case 'CHANGE_PLAY_MODE':
      return Object.assign({}, state, {
        playMode: action.playMode
      })
    case 'SLIDE_AUTO':
      return Object.assign({}, state, {
        currentTime: state.youtube? action.time: 0
      })
    case 'YOUTUBE_STATE_CHANGED':
      if (action.youtubeState == 0) {
        // current song ended
        if(state.playMode == 2) {
          return state;
        } else {
          let nextSongIndex = getNextSongIndex(state.playMode, state.currentSongIndex, state.playList.length);
          return Object.assign({}, state, {
            youtubeState: action.youtubeState,
            videoId: state.playList[nextSongIndex].VideoId,
            songName: state.playList[nextSongIndex].Name,
            singerName: state.playList[nextSongIndex].Singer,
            currentSongIndex: nextSongIndex
          })
        }
      } else {
        return Object.assign({}, state, {
          youtubeState: action.youtubeState,
          songName: state.playList[state.currentSongIndex].Name,
          singerName: state.playList[state.currentSongIndex].Singer
        })
      }

    //////////////////////////////
    case 'ADD_SONGS_TO_PLAY_LIST':
      return Object.assign({}, state, {
        playList: state.playList.concat(action.songsToAdd)
      })
    case 'PLAY_FROM_PLAY_LIST':
      return Object.assign({}, state, {
        videoId: state.playList[action.songIndex].VideoId,
        currentSongIndex: action.songIndex
      })
    case 'REMOVE_FROM_PLAY_LIST':
      let playList2 = state.playList.concat([]);
      playList2.splice(action.songIndex, 1);
      return Object.assign({}, state, {
        playList: playList2
      })
    default:
      return state
  }
}

const clickPlay = (state) => {
  let youtubeState = state.youtube.getPlayerState();
  switch(youtubeState) {
    case 0:
      state.youtube.playVideo();
      break;
    case 1:
      state.youtube.pauseVideo();
      break;
    case 2:
      state.youtube.playVideo();
      break;
    case 5:
      state.youtube.playVideo();
      break;
  }
}

const changeVolume = (youtube, volume) => {
  if(youtube.isMuted) youtube.unMute()
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

const getNextSongIndex = (playMode, current, total) => {
  if(playMode == 1) {
    return current+1>=total? current:current+1;
  } else if(playMode == 2) {
    return current;
  } else if(playMode == 3 && total>1) {
    let nextSongIndex = current;
    while(nextSongIndex == current) {
      nextSongIndex = Math.floor(Math.random()*total);
    }
    return nextSongIndex;
  } else {
    return current
  }
}



export default player
