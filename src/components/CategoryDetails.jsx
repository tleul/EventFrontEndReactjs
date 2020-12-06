import React from 'react';
import { filterEvent, getEvents } from '../resources/fakeEventService';
import API from '../services/api';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategoryForm from './Forms/CategoryForm';
import AlertMessage from './erroralert/AlertMessage';
import { deletecategory, loadcategory } from '../redux/actions/category';
class CategoriesDetails extends React.Component {
	state = {
		toggleCategoryForm: false,
	};
	togglecategory = () => {
		this.setState({ toggleCategoryForm: !this.state.toggleCategoryForm });
	};
	componentWillMount() {
		this.props.loadcategory();
	}
	deleteCategory = async (id) => {
		this.props.deletecategory(id);
	};
	updateCategory = () => {};
	render() {
		return (
			<>
				{this.state.toggleCategoryForm && (
					<CategoryForm togglecategory={this.togglecategory} />
				)}
				<table className='table'>
					<thead>
						<th>Title</th>
						<th>
							{!this.state.toggleCategoryForm && (
								<button
									onClick={this.togglecategory}
									className='btn-success mt-2 btn-sm '>
									Add Category
								</button>
							)}
						</th>
					</thead>
					<tbody>
						{this.props.category.map((cat) => (
							<tr key={cat._id}>
								<td>{cat.category_Name}</td>
								<td>
									<button className='btn-primary mt-2 btn-sm '>
										Update
									</button>
								</td>
								<td>
									<button
										onClick={() =>
											this.deleteCategory(cat._id)
										}
										className='btn-danger mt-2 btn-sm '>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}
}
CategoriesDetails.propTypes = {
	deletecategory: PropTypes.func.isRequired,
	loadcategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	category: state.category.category,
	loading: state.category.loading,
});
export default connect(mapStateToProps, { deletecategory, loadcategory })(
	CategoriesDetails,
);
