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

// constructor(props) {
//   super(props);
//   this.state = {
//     player: null,
//     playing: false
//   }
//   this.play = this.play.bind(this)
//   this.onReady = this.onReady.bind(this)
// }

// render() {
//   const opts = {
//     height: '360',
//     width: '480',
//     playerVars: { // https://developers.google.com/youtube/player_parameters
//       autoplay: 0
//     }
//   };
//
//   return (
//     <div>
//       <YouTube
//         videoId="EmjhISspkyY"
//         opts={opts}
//         onReady={this.onReady}
//       />
//       <div>
//         <RaisedButton primary={true} label='Button' style={style1} onClick={this.play}/>
//       </div>
//     </div>
//   )
// }

// onReady(event) {
//   this.setState({
//     player: event.target
//   })
// }
//
// play(event) {
//   // console.log(this.state.player)
//   if(this.state.playing == true){
//     this.state.player.pauseVideo()
//   }else {
//     this.state.player.playVideo()
//   }
//   this.setState({
//     playing: !this.state.playing
//   })
// }

const style1 = {
  width: '50px',
  height: '50px'
}

module.exports = Main
