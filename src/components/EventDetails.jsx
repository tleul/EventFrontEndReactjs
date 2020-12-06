import React from 'react';
const queryString = require('query-string');
class EventDetails extends React.Component {
    state = {
        id: this.props.match.params.id,
        name:this.props.match.params.title
}
	render() {

        return (
            <>
			<div className='pr-5'>
                <h1>id:</h1> <span>{this.state.id}</span>
                <h1>Title:</h1><span>{this.state.name}</span>
                </div>
                </>
		);
	}
}

export default EventDetails;
