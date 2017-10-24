import React, {Component} from 'react';
import UserMatch from './UserMatch.jsx'
import Slider from 'react-slick';



class UserMatchSidebar extends React.Component {
  render() {
    var settings = {
      swipe: true,
      touchMove: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className='row'>
        <div className='col-md-12 user-sidebar'>

          <Slider {...settings}>

          <div className='user-match-profile'>
            <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2>His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
              <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
              <h3> 82% matched! </h3>
          </div>
          <div className='user-match-profile'>
            <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 >His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
              <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
              <h3> 82% matched! </h3>
          </div>
          <div className='user-match-profile'>
            <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h2 >His Excellency, John Gustavo IV, King of Spain and Andorra, Ruler of the Mediterranean</h2>
              <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
              <h3> 82% matched! </h3>
          </div>


          </Slider>

        </div>
      </div>

      )
  }
}

export default UserMatchSidebar;