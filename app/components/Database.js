import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import LocalFlorist from 'material-ui/svg-icons/maps/local-florist';
import Delete from 'material-ui/svg-icons/action/delete';
import Done from 'material-ui/svg-icons/action/done';

import MainStyles from '../styles/MainStyles.css'

import DatabaseStyles from '../styles/DatabaseStyles'

class Database extends React.Component {
  render() {
    let songs = this.props.songs;
    let tableRows = songs.map((x, i) => {
      let rowStyle = (this.props.selectedRows[i]==1)? DatabaseStyles.tableRowSelected: DatabaseStyles.tableRow;
      return (
        <TableRow key={i} style={rowStyle}>
          <TableRowColumn style={DatabaseStyles.tableColumnSelect}>
            <LocalFlorist
              onClick={() => this.props.onRowSelect(i)}
              hoverColor='pink'
              style={DatabaseStyles.icon}
            />
          </TableRowColumn>
          <TableRowColumn className='tableColumnSongName' style={DatabaseStyles.tableColumnSongName}>{x.Name}</TableRowColumn>
          <TableRowColumn className='tableColumnSinger'   style={DatabaseStyles.tableColumnSinger}>{x.Singer}</TableRowColumn>
          <TableRowColumn className='tableColumnDelete'   style={DatabaseStyles.tableColumnDelete}>
            <Delete hoverColor='pink' style={DatabaseStyles.icon}/>
          </TableRowColumn>
        </TableRow>
      )
    });

    return (
      <div className='databaseArea'>
        <Table
          selectable = {false}
          onRowSelection = {this.props.onRowSelection}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={DatabaseStyles.tableRow}>
              <TableHeaderColumn style={DatabaseStyles.tableColumnSelect}></TableHeaderColumn>
              <TableHeaderColumn style={DatabaseStyles.tableColumnSongName}>歌曲</TableHeaderColumn>
              <TableHeaderColumn style={DatabaseStyles.tableColumnSinger}>演唱者</TableHeaderColumn>
              <TableHeaderColumn style={DatabaseStyles.tableColumnDelete}></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            key={Math.random()}
          >
            {/*TableRow的bug: 當selected改變時TableRow不會自動更新,網路上提出的解決方法是去給TableBody
             一個浮動的key強制他每次都會更新,也許會因此影響效能*/}
            {tableRows}
          </TableBody>
        </Table>
        <div>
          <RaisedButton
            label = "加入至播放清單"
            onClick = {() => this.props.addSongsToPlayList(this.props.songs, this.props.selectedRows)}
            labelStyle={DatabaseStyles.buttonText}
          />
          <RaisedButton
            label = "新增歌曲"
            onClick = {() => this.props.onDisplayAddData()}
            labelStyle={DatabaseStyles.buttonText}
          />
        </div>
        <div style={{display: this.props.displayAddDataArea==false? 'none':'inline'}}>
          <TextField hintText='Video Id' value={this.props.addDataValues.videoId} style={DatabaseStyles.addDataTextField} onChange={this.props.onAddDataTextVideoIdChange}/>
          <TextField hintText='Song' value={this.props.addDataValues.song} style={DatabaseStyles.addDataTextField} onChange={this.props.onAddDataTextSongChange}/>
          <TextField hintText='Singer' value={this.props.addDataValues.singer} style={DatabaseStyles.addDataTextField} onChange={this.props.onAddDataTextSingerChange}/>
          <RaisedButton label='新增' onClick={this.props.onAddDataClickOk} labelStyle={DatabaseStyles.buttonText}/>
          <RaisedButton label='取消' onClick={this.props.onAddDataClickCancel} labelStyle={DatabaseStyles.buttonText} />
        </div>
      </div>
    )
  }
}


module.exports = Database
