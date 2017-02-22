const initialState = () => {
  return {
    songs: [{Name:'', Singer:''}],
    selected: [],
    displayAddDataArea: false,
    displayDeleteDataDialog: false,
    rowToDelete: -1,
    addData: emptyAddData()
  }
}

const database = (state = initialState(), action) => {
  switch(action.type) {
    case 'CREATE_DATABASE':
      let sorted = sortSongs(action.db)
      return Object.assign({}, state, {
          songs: sorted,
          selected: zeroArray(action.db.length)
      })
    case 'EDIT_DATABASE':
      return Object.assign({}, state, {
        displayAddDataArea: true,
        addData: Object.assign({}, state.addData, {
          videoId: action.song.VideoId,
          song: action.song.Name,
          singer: action.song.Singer
        })
      })
    case 'SET_SELECTED_SONGS':
      let newSelected = state.selected.concat([]);
      newSelected[action.selectedRow] = 1-newSelected[action.selectedRow];
      return Object.assign({}, state, {
          selected: newSelected
      })
    case 'DELETE_DATA':
      return Object.assign({}, state, {
          displayDeleteDataDialog: true,
          rowToDelete: action.row
      })
    case 'DELETE_DATA_OK':
      return Object.assign({}, state, {
          displayDeleteDataDialog: false
      })
    case 'DELETE_DATA_CANCEL':
      return Object.assign({}, state, {
          displayDeleteDataDialog: false
      })
    case 'ADD_SONGS_TO_PLAY_LIST':
      return Object.assign({}, state, {
          selected: zeroArray(state.songs.length)
      })
    case 'DISPLAY_ADD_DATA_AREA':
      return Object.assign({}, state, {
          displayAddDataArea: true
      })
    case 'CHANGE_ADD_DATA_TEXT_VIDEO_ID':
      let exist = state.songs.find((x) => {
                    return x.VideoId === action.text
                  })
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            videoId: action.text,
            errorTextVideoId: (exist!=undefined)? '已存在,按下新增後會覆蓋': ''
          })
      })
    case 'CHANGE_ADD_DATA_TEXT_SONG':
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            song: action.text
          })
      })
    case 'CHANGE_ADD_DATA_TEXT_SINGER':
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            singer: action.text
          })
      })
    case 'CLICK_ADD_DATA_OK':
      return Object.assign({}, state, {
        displayAddDataArea: false,
        addData: emptyAddData()
      })
    case 'CLICK_ADD_DATA_CANCEL':
      return Object.assign({}, state, {
        displayAddDataArea: false,
        addData: emptyAddData()
      })
    case 'ERROR_INPUT_VIDEO_ID':
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            errorTextVideoId: action.text,
            errorTextSong: '',
            errorTextSinger: ''
          })
      })
    case 'ERROR_INPUT_SONG':
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            errorTextVideoId: '',
            errorTextSong: action.text,
            errorTextSinger: ''
          })
      })
    case 'ERROR_INPUT_SINGER':
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            errorTextVideoId: '',
            errorTextSong: '',
            errorTextSinger: action.text
          })
      })
    default:
      return state;
  }
}

const sortSongs = (songs) => {
  return songs.sort((a, b) => {
    if(a.Singer < b.Singer) return -1;
    if(a.Singer > b.Singer) return 1;
    return 0;
  })
}

const emptyAddData = () => {
  return {
    videoId: '',
    song: '',
    singer: '',
    errorTextVideoId: '',
    errorTextSong: '',
    errorTextSinger: ''
  }
}

// allocate an array of size n and value=0
const zeroArray = (n) => {
  let a = new Array(n);
  a.fill(0);
  return a;
}

export default database
