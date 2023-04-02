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
        
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-name">{currentUser.name}</div>
                <div className="profile-email">{currentUser.email}</div>
                <div className="profile-score">Score: {currentUser.score}</div>
            </div>
        </div>
      );
    };
  
  export default ProfilePage;