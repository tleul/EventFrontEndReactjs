import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Catagory from './components/Catagory';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import EventDetails from './components/EventDetails';
import Events from './components/Events';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CategoriesDetails from './components/CategoryDetails';
import EventForm from './components/Forms/EventForm';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

import { loaduser } from './redux/actions/auth';
import Toaster from './components/erroralert/AlertMessage';
import { ToastContainer } from 'react-toastify';

import AlertMessage from './components/erroralert/AlertMessage';
function App({ msg }) {
	return (
		<>
			<BrowserRouter>
				{' '}
				<Navbar />
				<ToastContainer />;
				<div className='container mt-5'>
					{' '}
					{msg && <AlertMessage msg={msg.msg} />}
					<Switch>
						<Route
							path='/events/:id/:title'
							component={EventDetails}
						/>
						<Route
							path='/categories'
							component={CategoriesDetails}
						/>
						<Route
							path='/addevent/:new?/:id?'
							component={EventForm}
						/>
						<Route path='/login' component={Login} />
						<Route path='/signup' component={Signup} />{' '}
						<Route path='/' component={Home} />
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}
App.propTypes = {
	msg: PropTypes.object,
};

const mapStateToProps = (state) => ({
	msg: state.msg.msg,
});

export default connect(mapStateToProps, null)(App);
