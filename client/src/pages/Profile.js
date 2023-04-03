import React from 'react';
import '../components/css/profile.css';
import { CURRENT_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const ProfilePage = ({ user }) => {
    const { loading, data } = useQuery(CURRENT_USER);
    const currentUser = data?.me || {};
    if (loading) {
        return <div>Loading...</div>;
    }
        console.log(currentUser);
    return (
        <div className="profile-container">
            <div className="main-body">
            <div className="profile row gutters-sm">
                <div className="profileAlign col-md-4 mb-3">
                    <div className="card profileCard">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src={require('../images/profileicon.png')} alt="account icon" width="150" />
                                <div className="mt-3">
                                    <h4>{currentUser.name}</h4>
                                    <p className="text-grey mb-1">Environment Protector </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='account'>
                    <div className="card mb-3">
                        <div className="card-body accountCard">

                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0">Account Information</h3>
                                </div>
                            </div>

                            <hr></hr>

                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-grey">
                                    {currentUser.name}
                                </div>
                            </div>

                            <hr></hr>

                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-grey">
                                {currentUser.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
      );
};
  
  export default ProfilePage;