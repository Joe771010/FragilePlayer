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

export const onVolumeChangeAction = (volume) => {
  return {
    type: 'CHANGE_VOLUME',
    volume: volume
  }
}

export const onYoutubeStateChangeAction = () => {
  return {
    type: 'YOUTUBE_STATE_CHANGED'
  }
}

export const onTimeChangeAction = (time) => {
  return {
    type: 'CHANGE_TIME',
    time: time
  }
}

export const autoSlidingAction = () => {
  return {
    type: 'SLIDE_AUTO',
  }
}
