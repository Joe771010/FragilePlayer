const initialState = () => {
  return {
    songs: [{Name:'', Singer:''}],
    selected: [],
    displayAddDataArea: false,
    addData: {
      videoId: '',
      song: '',
      singer: ''
    }
  }
}

const database = (state = initialState(), action) => {
  switch(action.type) {
    case 'CREATE_DATABASE':
      return Object.assign({}, state, {
          songs: action.db,
          selected: zeroArray(action.db.length)
      })
    case 'SET_SELECTED_SONGS':
      let newSelected = state.selected.concat([]);
      newSelected[action.selectedRow] = 1-newSelected[action.selectedRow];
      return Object.assign({}, state, {
          selected: newSelected
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
      return Object.assign({}, state, {
          addData: Object.assign({}, state.addData, {
            videoId: action.text
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
        addData: {
          videoId: '',
          song: '',
          singer: ''
        }
      })
    case 'CLICK_ADD_DATA_CANCEL':
      return Object.assign({}, state, {
        displayAddDataArea: false,
        addData: {
          videoId: '',
          song: '',
          singer: ''
        }
      })
    default:
      return state;
  }
}

// allocate an array of size n and value=0
const zeroArray = (n) => {
  let a = new Array(n);
  a.fill(0);
  return a;
}

export default database
