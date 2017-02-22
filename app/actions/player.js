export const setYoutubePlayerAction = (youtube) => {
  return {
    type: 'SET_YOUTUBE_PLAYER',
    youtube: youtube
  }
}

export const onPlayClickAction = () => {
  return {
    type: 'CLICK_PLAY'
  }
}

export const onNextClickAction = () => {
  return {
    type: 'CLICK_NEXT'
  }
}

export const onPreviousClickAction = () => {
  return {
    type: 'CLICK_PREVIOUS'
  }
}

export const onVolumeChangeAction = (volume) => {
  return {
    type: 'CHANGE_VOLUME',
    volume: volume
  }
}

export const onPlayModeChangeAction = (playMode) => {
  return {
    type: 'CHANGE_PLAY_MODE',
    playMode: playMode
  }
}

export const onYoutubeStateChangeAction = (youtubeState) => {
  return {
    type: 'YOUTUBE_STATE_CHANGED',
    youtubeState: youtubeState
  }
}

export const onTimeChangeAction = (time) => {
  return {
    type: 'CHANGE_TIME',
    time: time
  }
}

export const autoSlidingAction = (time) => {
  return {
    type: 'SLIDE_AUTO',
    time: time
  }
}

export const addSongsToPlayListAction = (songs, selectedRows) => {
  let songsToAdd = []
  for(let i=0; i<selectedRows.length; i++) {
    if(selectedRows[i]==1) songsToAdd.push(songs[i])
  }
  return {
    type: 'ADD_SONGS_TO_PLAY_LIST',
    songsToAdd: songsToAdd
  }
}

export const playFromPlayListAction = (songIndex) => {
  return {
    type: 'PLAY_FROM_PLAY_LIST',
    songIndex: songIndex
  }
}

export const removeFromPlayListAction = (songIndex) => {
  return {
    type: 'REMOVE_FROM_PLAY_LIST',
    songIndex: songIndex
  }
}

export const playFromDatabaseAction = (song) => {
  return {
    type: 'PLAY_FROM_DATABASE',
    song: song
  }
}
