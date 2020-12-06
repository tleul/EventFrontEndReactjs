import Catagory from './Catagory';
import axios from 'axios';
import Events from './Events';
import React from 'react';
import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';
import { loadevent, deleteevent } from '../redux/actions/event';
import { loaduser } from '../redux/actions/auth';
import { loadcategory } from '../redux/actions/category';
import Spinner from './spinners/Spinners';
import Profile from './profile/Profile';
import { toast, ToastContainer } from 'react-toastify';

class Home extends React.Component {
	state = {
		category: this.props.category,
		event: this.props.event,
	};
	deleteEvent = (id) => {
		this.props.deleteevent(id);
	};
	filterEvent = (id, check) => {
		this.setState({ filterEvent: check });
		this.setState({
			filterevents: this.state.events.filter(
				(event) => event.category._id == id,
			),
		});
	};
	componentWillMount() {
		this.props.loadevent();
		this.props.loadcategory();
	}

	render() {
		return (
			<>
				{this.props.isAuthenticated && (
					<div>
						<Profile name={this.props.user.name} />
					</div>
				)}

				<div class='d-flex flex-row  bd-highlight mb-3'>
					{this.props.loadingEvent && this.props.loadingCategroy ? (
						<>
							<Catagory filterEvent={this.filterEvent} />

							<Events
								admin={
									this.props.isAuthenticated
										? this.props.user.admin
										: false
								}
								deleteEvent={this.deleteEvent}
							/>
						</>
					) : (
						<Spinner />
					)}
				</div>
			</>
		);
	}
}

Home.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	event: PropTypes.array,
	loadevent: PropTypes.func.isRequired,
	loadcategory: PropTypes.func.isRequired,
	category: PropTypes.array,
	loadingEvent: PropTypes.bool.isRequired,
	deleteevent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	event: state.event.event,
	loadingEvent: state.event.loading,
	user: state.auth.user,
	category: state.category.category,
	loadingCategroy: state.category.loading,
});

export default connect(mapStateToProps, {
	loadevent,
	loadcategory,
	deleteevent,
})(Home);
