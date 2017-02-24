export const onSignInAction = (userId, userEmail) => {
  return {
    type: 'USER_SIGN_IN',
    userId: userId,
    userEmail: userEmail
  }
}

export const onSignOutAction = () => {
  return {
    type: 'USER_SIGN_OUT',
  }
}

export const onSignOutClickOkAction = () => {
  return {
    type: 'USER_SIGN_OUT_OK',
  }
}

export const onSignOutClickCancelAction = () => {
  return {
    type: 'USER_SIGN_OUT_CANCEL',
  }
}

export const createDatabaseAction = (db) => {
  return {
    type: 'CREATE_DATABASE',
    db: db
  }
}

export const editDatabaseAction = (song) => {
  return {
    type: 'EDIT_DATABASE',
    song: song
  }
}

export const setSelectedSongsAction = (selectedRow) => {
  return {
    type: 'SET_SELECTED_SONGS',
    selectedRow: selectedRow
  }
}

export const onDataDeleteAction = (row) => {
  return {
    type: 'DELETE_DATA',
    row: row
  }
}

export const onDataDeleteClickOkAction = () => {
  return {
    type: 'DELETE_DATA_OK',
  }
}

export const onDataDeleteClickCancelAction = () => {
  return {
    type: 'DELETE_DATA_CANCEL',
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

export const onAddDataClickOkAction = () => {
  return {
    type: 'CLICK_ADD_DATA_OK'
  }
}

export const onAddDataClickCancelAction = () => {
  return {
    type: 'CLICK_ADD_DATA_CANCEL'
  }
}

export const inputErrorVideoIdAction = (text) => {
  return {
    type: 'ERROR_INPUT_VIDEO_ID',
    text: text
  }
}

export const inputErrorSongAction = (text) => {
  return {
    type: 'ERROR_INPUT_SONG',
    text: text
  }
}

export const inputErrorSingerAction = (text) => {
  return {
    type: 'ERROR_INPUT_SINGER',
    text: text
  }
}
