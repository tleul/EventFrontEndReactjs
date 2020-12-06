import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../resources/fakeCategoryService';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loaduser, logoutuser } from '../redux/actions/auth';
const Navbar = ({ loaduser, isAuthenticated, logoutuser, user }) => {
	useEffect(() => {
		loaduser();
	}, []);
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light  bg-primary'>
				<Link className='navbar-brand' to='/'>
					<img
						className='bg-primary'
						src='/logo.png'
						alt=''
						width='100'
						height='100'
					/>{' '}
					Event Manager
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'>
					<ul className='navbar-nav  mr-auto'>
						<>
							<li className='nav-item  active'>
								<Link className='nav-link' to='/'>
									Events{' '}
									<span className='sr-only'>(current)</span>
								</Link>
							</li>
						</>
						{/* <li className='nav-item active'>
							<Link className='nav-link' to='#'>
								Customers{' '}
								<span className='sr-only'>(current)</span>
							</Link>
						</li> */}
						{isAuthenticated && user.admin && (
							<>
								{' '}
								<li className='nav-item active'>
									<Link className='nav-link' to='/categories'>
										Add Categories{' '}
										<span className='sr-only'>
											(current)
										</span>
									</Link>
								</li>
								<li className='nav-item active'>
									<Link className='nav-link' to='/addevent'>
										Create Events{' '}
										<span className='sr-only'>
											(current)
										</span>
									</Link>
								</li>{' '}
							</>
						)}
						{!isAuthenticated ? (
							<>
								{' '}
								<li className='nav-item active'>
									<Link className='nav-link' to='/login'>
										Login{' '}
										<span className='sr-only'>
											(current)
										</span>
									</Link>
								</li>
								<li className='nav-item active pl-'>
									<Link className='nav-link' to='/signup'>
										Signup{' '}
										<span className='sr-only'>
											(current)
										</span>
									</Link>
								</li>
							</>
						) : (
							<>
								<li className='nav-item bg-primary   active'>
									<Link>
										<span
											role='button'
											tabIndex='0'
											className='nav-link text-white text-bold '
											onClick={() => logoutuser()}>
											Logout
										</span>
									</Link>

									<span className='sr-only'>(current)</span>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		</>
	);
};
Navbar.propTypes = {
	user: PropTypes.array,
	loaduser: PropTypes.func.isRequired,
	logoutuser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});
export default connect(mapStateToProps, { loaduser, logoutuser })(Navbar);
