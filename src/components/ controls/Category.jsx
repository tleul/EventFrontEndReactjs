const CategoryList = ({ options, categoryselector, error, value }) => {
	return (
		<>
			<div className='input-group mb-3'>
				<select
					onChange={categoryselector}
					className='custom-select btn-outline-success'
					id='inputGroupSelect02'>
					<option>Choose...</option>
					{options.map((option) => (
						<option
							key={option.category_Name}
							value={option.category_Name}>
							{option.category_Name}
						</option>
					))}
				</select>
			</div>{' '}
			{error && (
				<div class='alert alert-danger' role='alert'>
					{error}
				</div>
			)}
		</>
	);
};

export default CategoryList;
