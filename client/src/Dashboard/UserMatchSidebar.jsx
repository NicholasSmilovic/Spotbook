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

    const listUsers = this.props.allUsersCompared.map((user,index) => {
      return <div key={user.id} ><UserMatch percent={user.percentMatch} id={user.id}/></div>
    })


      return (
        <div className='row'>
          <div className='col-md-12 user-sidebar'>

          <Slider {...settings}>

            {listUsers}

          </Slider>

          </div>
        </div>
      )


  }
}

export default UserMatchSidebar;