import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { updateUserInfo } from '../../services/users';
import { UserInfoUpdate } from '../../types/user';

import Logo from '../../assets/logo.png';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const { username: currUsername } = useParams();
  const { handleUserInfoUpdate } = useAuth();

  const [newUsername, setNewUsername] = useState('');
  const [presentation, setPresentation] = useState('');
  const [avatar] = useState(Logo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updates: UserInfoUpdate = {
        newUsername,
        description: presentation,
        avatar,
      };

      const res = await updateUserInfo(currUsername!, updates);

      handleUserInfoUpdate(res);
      navigate(`/profile/${newUsername}`);
    } catch (error) {
      console.error('Failed to update the profile', error);
      return;
    }
  };

  return (
    <div>
      <div className="editProfile-container">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="User Name"
            className="username-input"
          />
          <textarea
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
            placeholder="Presentation"
            className="presentation-textarea"
          ></textarea>
          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
