export const createDatabaseAction = (db) => {
  return {
    type: 'CREATE_DATABASE',
    db: db
  }
}

export const setSelectedSongsAction = (selectedRow) => {
  return {
    type: 'SET_SELECTED_SONGS',
    selectedRow: selectedRow
  }
}

export const displayAddDataAreaAction = () => {
  return {
    type: 'DISPLAY_ADD_DATA_AREA'
  }
}

export const onAddDataTextVideoIdChangeAction = (text) => {
  return {
    type: 'CHANGE_ADD_DATA_TEXT_VIDEO_ID',
    text: text
  }
}

export const onAddDataTextSongChangeAction = (text) => {
  return {
    type: 'CHANGE_ADD_DATA_TEXT_SONG',
    text: text
  }
}

export const onAddDataTextSingerChangeAction = (text) => {
  return {
    type: 'CHANGE_ADD_DATA_TEXT_SINGER',
    text: text
  }
}

export const onAddDataClickActionOk = () => {
  return {
    type: 'CLICK_ADD_DATA_OK'
  }
}

export const onAddDataClickActionCancel = () => {
  return {
    type: 'CLICK_ADD_DATA_CANCEL'
  }
}
