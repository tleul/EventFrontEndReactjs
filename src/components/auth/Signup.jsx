import React from 'react';
import Input from '../ controls/Input';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import { Redirect, Route } from 'react-router-dom';
import { namefix, typefix } from '../../services/formServices';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { validateUserSignUP } from '../../services/validate';
import API from '../../services/api';
import { registeruser } from '../../redux/actions/auth';
//WARNING && ERROR
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends React.Component {
	state = {
		user: { name: '', email: '', password: '' },
		adminPin: '',
		admin: false,
		error: {},
		notvalidated: false,
	};
	adminonchangehandler = ({ currentTarget: input }) => {
		this.setState({ adminPin: input.value });
		const { name, email, password } = this.state.user;
		const adminPin = this.state.adminPin;
		this.state.adminPin.length === 3 && name && email && password
			? this.setState({
					error: {},

					notvalidated: false,
			  })
			: this.setState({
					error: {
						adminPin:
							adminPin.length === 3
								? ''
								: 'Please Provide Four Digits admin pin you have recevied from employer ',
					},
					notvalidated: true,
			  });
	};
	onchangehandler = ({ currentTarget: input }) => {
		const { name, value } = input;
		const user = { ...this.state.user };
		user[name] = value.toLowerCase();
		this.setState({ user });
		if (this.state.adminPin.length === 4)
			this.setState({ error: { adminPin: '' } });
		const validate = validateUserSignUP(user);

		if (validate) this.setState({ error: validate, notvalidated: true });
		if (!validate) this.setState({ error: {}, notvalidated: false });
	};
	onsubmithandler = async (e) => {
		e.preventDefault();
		let admin = {
			admin: this.state.admin,
			adminPin: this.state.adminPin,
		};

		this.props.registeruser(this.state.user, admin);
	};
	onRadiocheck = (e) => {
		this.setState({
			admin: !this.state.admin,
		});

		this.setState({ notvalidated: !this.state.admi });
		const { name, email, password } = this.state.user;

		if (this.state.admin && name && email && password)
			this.setState({ notvalidated: false });
	};
	contextClass = {
		success: 'bg-blue-600',
		error: 'bg-red-600',
		info: 'bg-gray-600',
		warning: 'bg-orange-400',
		default: 'bg-indigo-600',
		dark: 'bg-white-600 font-gray-300',
	};

	render() {
		if (this.props.isAuthenticated) this.props.history.push('/');
		return (
			<div className='border border-primary p-5 w-50 mx-auto  '>
				<section className='text-center pb-10'>
					<hr />
					<h3 className='font-bold text-2xl'>Signup </h3>
					<p className='text-gray-600 pt-2'></p>
					<p className='text-gray-600 pt-2'></p>
					<hr />
				</section>

				<form onSubmit={this.onsubmithandler}>
					{Object.entries(this.state.user).map((user) => (
						<>
							<Input
								error={this.state.error[user[0]]}
								onchangehandler={this.onchangehandler}
								// key={namefix(name[0])}
								value={user[1]}
								name={user[0]}
								lable={namefix(user[0])}
								type={
									typefix(user[0]) ? typefix(user[0]) : 'text'
								}
							/>
						</>
					))}
					<div>
						<i>If you are the admin check the box</i>
						<br />
						<span className='badge badge-primary mr-3'>Admin</span>

						<input
							onClick={this.onRadiocheck}
							type='radio'
							checked={this.state.admin}
							id='true'
							value={this.state.admin}
						/>
					</div>
					{this.state.admin && (
						<div>
							<Input
								error={this.state.error.adminPin}
								onchangehandler={this.adminonchangehandler}
								lable='Admin Pin'
								placeholder='adminPin'
								name='adminPin'
								value={this.state.adminPin}
							/>
							<i>
								Please provide admin pin that you have receved
								from your employee{' '}
							</i>
						</div>
					)}

					<div className='text-center pb-3'>
						<button
							disabled={this.state.notvalidated}
							type='submit'
							className='btn-primary btn-lg btn text-center'>
							Signup
						</button>
					</div>
					<div>
						<i>
							If you have account please
							<span>
								{' '}
								<Link to='login'>Login</Link>
							</span>
						</i>
					</div>
				</form>
			</div>
		);
	}
}
Signup.propTypes = {
	registeruser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registeruser })(Signup);
