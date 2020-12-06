const Profile = ({ name }) => {
	return (
		name && (
			<div class='alert alert-primary' role='alert'>
				Welcome {name.toUpperCase()}!!! enjoy our events
			</div>
		)
	);
};

export default Profile;
