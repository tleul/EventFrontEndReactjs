import Joi from 'joi-browser';
export const validateEventForm = (event) => {
	const schema = {
		event_Name: Joi.string().required().min(3).max(20).label('Event Name'),
		event_Description: Joi.string()
			.required()
			.min(3)
			.max(20)
			.label('Event Description'),
		event_Location: Joi.string().required().label('Event Location'),
		adult_Ticket_Price_number: Joi.number()
			.required()
			.positive()
			.label('Adult Ticket Price'),
		child_Ticket_Price_number: Joi.number()
			.required()
			.positive()
			.label('Child Ticket Price'),
		event_category: Joi.string()
			.required()
			.label('Event Category is Required'),
	};
	const result = Joi.validate(event, schema, {
		abortEarly: false,
	});

	if (!result.error) return null;
	const errors = {};
	for (let item of result.error.details) errors[item.path[0]] = item.message;
	return errors;
};
export const validateUser = (user) => {
	const schema = {
		email: Joi.string().email().required().label('Email Address'),
		password: Joi.string().min(6).required().label('Password'),
	};
	const result = Joi.validate(user, schema, {
		abortEarly: false,
	});

	if (!result.error) return null;
	const errors = {};
	for (let item of result.error.details) errors[item.path[0]] = item.message;
	return errors;
};
export const validateUserSignUP = (user) => {
	const schema = {
		name: Joi.string().min(3).required().label('Name'),
		email: Joi.string().email().required().label('Email Address'),
		password: Joi.string().min(6).required().label('Password'),
	};

	const result = Joi.validate(user, schema, {
		abortEarly: false,
	});
	if (!result.error) return null;
	const errors = {};
	for (let item of result.error.details) errors[item.path[0]] = item.message;
	return errors;
};
