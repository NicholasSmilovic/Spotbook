import React, {Component} from 'react';

let pictureStyle = {borderRadius: '50%',
                    marginLeft: '2.5em',
                    marginTop: '1em'}
let displayNameStyle = {textAlign: 'center'}
let matchPercentStyle = {textAlign: 'center', color: '#1ED760'}

class UserMatch extends Component{
  render (){
    return(
        <div>
          <div className='userMatchProfile'>
            <img style={pictureStyle}src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 style={displayNameStyle}>His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
          </div>
          <div className='userMatchPercentage'>
            <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
            <h3 style={matchPercentStyle}> 82% matched! </h3>
          </div>
          <hr></hr>
          <div className='userMatchProfile'>
            <img style={pictureStyle}src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 style={displayNameStyle}>His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
          </div>
          <div className='userMatchPercentage'>
            <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
            <h3 style={matchPercentStyle}> 82% matched! </h3>
          </div>
          <hr></hr>
          <div className='userMatchProfile'>
            <img style={pictureStyle}src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 style={displayNameStyle}>His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
          </div>
          <div className='userMatchPercentage'>
            <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
            <h3 style={matchPercentStyle}> 82% matched! </h3>
          </div>
          <hr></hr>
          <div className='userMatchProfile'>
            <img style={pictureStyle}src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 style={displayNameStyle}>His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
          </div>
          <div className='userMatchPercentage'>
            <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
            <h3 style={matchPercentStyle}> 82% matched! </h3>
          </div>
          <hr></hr>
          <div className='userMatchProfile'>
            <img style={pictureStyle}src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 style={displayNameStyle}>His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
          </div>
          <div className='userMatchPercentage'>
            <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
            <h3 style={matchPercentStyle}> 82% matched! </h3>
          </div>
        </div>
      )
  }
}

export default UserMatch;