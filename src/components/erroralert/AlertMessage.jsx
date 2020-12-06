import React from 'react';

class AlertMessage extends React.Component {
	state = {};
	render() {
		return (
			<div class='alert alert-danger' role='alert'>
				{this.props.msg}
			</div>
		);
	}
}

export default AlertMessage;
