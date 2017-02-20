import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Clear from 'material-ui/svg-icons/content/clear';

import MainStyles from '../styles/MainStyles.css'
import PlayListStyles from '../styles/PlayListStyles.js'

class PlayList extends React.Component {
  render() {
    let songsInList = this.props.songsInList;
    return (
      <div className='playListArea'>
        <Table selectable = {false}>
          <TableBody showRowHover={true} displayRowCheckbox={false}>
            {songsInList.map((x, i) => {
              let rowStyle = (this.props.currentSongIndex == i)? PlayListStyles.tableRowCurrent: PlayListStyles.tableRow
              return (
                <TableRow key={i} style={rowStyle}>
                  <TableRowColumn style={PlayListStyles.tableColumnPlay}>
                    <PlayArrow
                      hoverColor='pink'
                      onClick={() => this.props.onPlayClick(i)}
                      style={PlayListStyles.icon}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={PlayListStyles.tableColumnSongName}>{x.Name}</TableRowColumn>
                  <TableRowColumn style={PlayListStyles.tableColumnRemove}>
                    <Clear
                      hoverColor='pink'
                      onClick={() => this.props.onRemoveClick(i)}
                      style={PlayListStyles.icon}
                    />
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const styles = {
  contentText: {
    fontSize: '12px',
  }
}

module.exports = PlayList
