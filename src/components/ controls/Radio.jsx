const Radio = ({ onradiocheck, selected }) => {
	return (
		<>
			<div className='form-group   text-center p-3 border border-info '>
				<span className='position-sticky '>Is the Event Active</span>
				<div>
					<span className='badge badge-primary mr-3'>True</span>

					<input
						onChange={onradiocheck}
						type='radio'
						checked={selected === true ? true : false}
						id='true'
						value='true'
					/>
				</div>

				<div>
					<span className='badge badge-primary  mr-3'>False</span>

					<input
						onChange={onradiocheck}
						type='radio'
						id='false'
						checked={selected === false ? true : false}
						value='false'
					/>
				</div>
			</div>
		</>
	);
};

export default Radio;
