import React, {Component} from 'react';

class ActiveQuery extends Component{

  handleActiveFilterKeyPress = (event) => {
    this.props.setQuery(event.target.value)
  }

  render (){
    return(
      <div>
        <form className="form-group">
          <label>Active Filter</label>
          <input className="form-control" onChange = {this.handleActiveFilterKeyPress} value = {this.props.query} />
        </form>
      </div>
      )
  }
}

export default ActiveQuery;