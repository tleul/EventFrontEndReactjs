import React from 'react';
import CategoryList from '../ controls/Category';
import { withRouter } from 'react-router-dom';
import Input from '../ controls/Input';
import axios from 'axios';
import { getCategories } from '../../resources/fakeCategoryService';
import { namefix, typefix } from '../../services/formServices';
import { validateEventForm } from '../../services/validate';
import { errors } from 'joi-browser';
import Radio from '../ controls/Radio';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addevent, updateevent } from '../../redux/actions/event';
import { loadcategory } from '../../redux/actions/category';
class EventForm extends React.Component {
	state = {
		event: {
			event_Name: '',
			event_Description: '',
			event_Location: '',
			adult_Ticket_Price_number: '',
			child_Ticket_Price_number: '',
		},
		radioCheck: true,
		active: true,
		event_category: '',
		errors: {},
		disableSubmit: true,
	};
	onchangehandler = ({ currentTarget: input }) => {
		const { name, value } = input;

		const event = { ...this.state.event };
		event[name] = value;
		this.setState({ event });

		const validate = validateEventForm({
			...event,
			event_category: this.state.event_category,
		});
		if (validate) {
			this.setState({ errors: validate });
			this.setState({ disableSubmit: true });
		}
		if (!validate) {
			this.setState({ errors: {} });
			this.setState({ disableSubmit: false });
		}
		console.log(validate);
	};
	onradiocheck = (e) => {
		this.setState({ active: e.target.value === 'true' ? true : false });
	};
	categoryselector = (e) => {
		const category = this.props.category.filter(
			(cat) => cat.category_Name === e.target.value,
		);

		this.setState({ event_category: category[0]._id });
		const validate = validateEventForm({ event_category: e.target.value });

		if (validate) {
			const errors = this.state.errors;
			errors.event_category = validate.event_category;
			this.setState({ errors });
			this.setState({ disableSubmit: true });
		}

		if (!validate) {
			const errors = this.state.errors;
			delete errors.event_category;

			this.setState({ errors });
			this.setState({ disableSubmit: false });
		}
	};
	componentDidMount() {
		this.props.loadcategory();
	}
	onsubmithandler = async (e) => {
		e.preventDefault();

		const body = {
			...this.state.event,
			event_category: this.state.event_category,
			active: this.state.active,
		};
		if (this.props.match.params.new === 'false') {
			let id = this.props.match.params.id;
			const result = await this.props.updateevent(body, id);
			if (result) return this.props.history.push('/');
		}
		const result = await this.props.addevent(body);
		if (result) return this.props.history.push('/');
	};
	getEventData = async () => {
		let id = this.props.match.params.id;
		const { data } = await axios.get(
			`/api/event/${id}`,
		);
		const {
			event_Name,
			event_Description,
			event_Location,
			adult_Ticket_Price_number,
			child_Ticket_Price_number,
			active,
			event_category,
		} = data;
		const event = {
			event_Name,
			event_Description,
			event_Location,
			adult_Ticket_Price_number,
			child_Ticket_Price_number,
		};

		this.setState({ event, active, event_category });
	};
	componentWillMount() {
		if (this.props.match.params.new === 'false') this.getEventData();
	}
	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to='/' />;
		}
		return (
			<>
				<div className='border border-primary p-5 w-50 mx-auto  '>
					<section className='text-center pb-10'>
						<hr />
						{this.props.match.params.new ? (
							<h3 className='font-bold text-2xl'>Update Event</h3>
						) : (
							<h3 className='font-bold text-2xl'>Add Event</h3>
						)}
						<p className='text-gray-600 pt-2'></p>
						<p className='text-gray-600 pt-2'>
							Please fill the form carefully.
						</p>
						<hr />
					</section>

					<form action=' ' onSubmit={this.onsubmithandler}>
						{Object.entries(this.state.event).map((name) => (
							<>
								<Input
									error={this.state.errors[name[0]]}
									onchangehandler={this.onchangehandler}
									key={namefix(name[0])}
									value={name[1]}
									name={name[0]}
									lable={namefix(name[0])}
									type={
										typefix(name[0])
											? typefix(name[0])
											: 'text'
									}
								/>
							</>
						))}
						<Radio
							error={this.state.errors.active}
							selected={this.state.active}
							onradiocheck={this.onradiocheck}
						/>
						<CategoryList
							value={this.state.event_category}
							error={this.state.errors.event_category}
							categoryselector={this.categoryselector}
							options={this.props.category}
						/>
						<div className='text-center'>
							<button
								disabled={this.state.disableSubmit}
								type='submit'
								className='btn-primary btn-lg btn text-center'>
								Save
							</button>
						</div>
					</form>
				</div>
			</>
		);
	}
}
EventForm.propTypes = {
	addevent: PropTypes.func.isRequired,
	category: PropTypes.array,
	loadcategory: PropTypes.func.isRequired,
	updateevent: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	category: state.category.category,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
	addevent,
	loadcategory,
	updateevent,
})(withRouter(EventForm));
