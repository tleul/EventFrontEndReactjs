const Input = ({ type, name, value, lable, onchangehandler, error }) => {
	return (
		<>
			<div className='form-group    mb-3'>
				<label for={lable}>{lable}</label>

				<input
					onChange={onchangehandler}
					type={name === 'password' ? 'password' : type}
					name={name}
					value={value}
					className='form-control btn-outline-success text-black'
					id={lable}
					placeholder={`Enter ${lable.toLowerCase()}`}
				/>

				{error && (
					<div class='alert alert-danger' role='alert'>
						{error}
					</div>
				)}
			</div>
		</>
	);
};

export default Input;
