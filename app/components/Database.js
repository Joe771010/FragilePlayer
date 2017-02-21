import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import LocalFlorist from 'material-ui/svg-icons/maps/local-florist';
import Delete from 'material-ui/svg-icons/action/delete';
import Done from 'material-ui/svg-icons/action/done';
import Sort from 'material-ui/svg-icons/content/sort';
import CropSquare from 'material-ui/svg-icons/image/crop-square';

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
            <CropSquare
              onClick={() => this.props.onRowSelect(i)}
              hoverColor='pink'
              style={DatabaseStyles.icon15}
            />
          </TableRowColumn>
          <TableRowColumn className='tableColumnSongName' style={DatabaseStyles.tableColumnSongName}>{x.Name}</TableRowColumn>
          <TableRowColumn className='tableColumnSinger'   style={DatabaseStyles.tableColumnSinger}>{x.Singer}</TableRowColumn>
          <TableRowColumn className='tableColumnDelete'   style={DatabaseStyles.tableColumnDelete}>
            <Delete
              onClick = {() => this.props.onDataDelete(i)}
              hoverColor='pink'
              style={DatabaseStyles.icon20}
            />
          </TableRowColumn>
        </TableRow>
      )
    });

    return (
      <div className='databaseArea'>
        <div style={DatabaseStyles.tableArea}>
          <Table
            selectable = {false}
            onRowSelection = {this.props.onRowSelect}
            height = {'315px'}
            bodyStyle={{overflow:'visible'}}
            style={DatabaseStyles.tableStyle}
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
        </div>
        <div>
          <RaisedButton
            label = "加入至播放清單"
            onClick = {() => this.props.addSongsToPlayList(this.props.songs, this.props.selectedRows)}
            labelStyle={DatabaseStyles.buttonText}
            style={DatabaseStyles.buttonStyle}
          />
          <RaisedButton
            label = "新增歌曲"
            onClick = {() => this.props.onDisplayAddData()}
            labelStyle={DatabaseStyles.buttonText}
            style={DatabaseStyles.buttonStyle}
          >
          </RaisedButton>
        </div>
        <Dialog
          open = {this.props.displayAddDataArea}
          model = {true}
        >
          <div>
            <TextField
              id = 'video id'
              hintText='Video Id'
              errorText = {this.props.addDataValues.errorTextVideoId}
              onChange={this.props.onAddDataTextVideoIdChange}
              style={DatabaseStyles.addDataTextField}
            />
            <TextField
              id = 'song'
              hintText='Song'
              errorText = {this.props.addDataValues.errorTextSong}
              onChange={this.props.onAddDataTextSongChange}
              style={DatabaseStyles.addDataTextField}
            />
            <TextField
              id = 'singer'
              hintText='Singer'
              errorText = {this.props.addDataValues.errorTextSinger}
              onChange={this.props.onAddDataTextSingerChange}
              style={DatabaseStyles.addDataTextField}
            />
            <RaisedButton label='新增' onClick={this.props.onAddDataClickOk} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
            <RaisedButton label='取消' onClick={this.props.onAddDataClickCancel} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
            <div style={DatabaseStyles.addDataHint}>{'( Video Id為youtube歌曲網址最後面的11碼 )'}</div>
          </div>
        </Dialog>
        <Dialog
          open = {this.props.displayDeleteDataDialog}
          model = {true}
        >
          <div>
            <text style={DatabaseStyles.deleteText}>確定刪除歌曲?</text>
            <RaisedButton label='確定' onClick={this.props.onDataDeleteClickOk} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
            <RaisedButton label='取消' onClick={this.props.onDataDeleteClickCancel} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
          </div>
        </Dialog>
      </div>
    )
  }
}


module.exports = Database
