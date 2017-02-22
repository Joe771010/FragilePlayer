import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import YouTube from 'react-youtube'

import DatabseContainer from '../containers/DatabaseContainer'
import PlayListContainer from '../containers/PlayListContainer'
import PlayerContainer from '../containers/PlayerContainer'

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className='mainUpperArea'>
          <DatabseContainer />
          <PlayListContainer />
        </div>
        <div>
          <PlayerContainer />
        </div>
      </div>
    )
  }
}


module.exports = Main
