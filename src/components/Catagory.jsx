import { filter } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { filterevent, loadevent } from '../redux/actions/event';
import category from '../redux/reducers/category';

class Catagory extends React.Component {
	filterEvent = (categoryId) => {
		this.props.filterevent(categoryId);
	};
	getallevent = () => {
		this.props.loadevent();
	};
	render() {
		return (
			<div className='pr-5'>
				<ul className='list-group text-decoration-none '>
					<li className='list-group-item active text-center'>
						Catagory
					</li>
					<Link>
						<li
							onClick={() => this.getallevent()}
							className=' list-group-item text-dark text-center'>
							All Category
						</li>
					</Link>

					{this.props.category.map((cata) => (
						<Link
							onClick={() => this.filterEvent(cata._id)}
							className='text-dark text-decoration-none'>
							<li class='list-group-item text-center'>
								{cata.category_Name}
							</li>
						</Link>
					))}
				</ul>
			</div>
		);
	}
}
Catagory.propTypes = {
	filterevent: PropTypes.func.isRequired,
	category: PropTypes.array,
};
const mapStateToProps = (state) => ({
	category: state.category.category,
});
export default connect(mapStateToProps, { filterevent, loadevent })(Catagory);
