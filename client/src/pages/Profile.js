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
        <div class="profile-container">
            <div class="main-body">
            <div class="row gutters-sm">
                <div class="col-md-4 mb-3">
                    <div class="card profileCard">
                        <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                                <img src="https://www.freeiconspng.com/uploads/account-profile-user-icon--icon-search-engine-10.png" alt="account icon" width="150" />
                                <div class="mt-3">
                                    <h4>{currentUser.name}</h4>
                                    <p class="text-grey mb-1">Environment Protector </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card mb-3">
                        <div class="card-body accountCard">

                            <div class="row accountInfo">
                                <div class="col-sm-3">
                                    <h3 class="mb-0">Account Information</h3>
                                </div>
                            </div>

                            <hr></hr>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Full Name</h6>
                                </div>
                                <div class="col-sm-9 text-grey">
                                    {currentUser.name}
                                </div>
                            </div>

                            <hr></hr>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-grey">
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