import { combineReducers } from 'redux'

import player from './player'
import database from './database'

const rootReducer = combineReducers({
  player,
  database
});

export default rootReducer
