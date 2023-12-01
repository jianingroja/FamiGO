import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { updateUserInfo } from '../../services/users';
import { getUser } from '../../redux/userSlice';
import { UserInfoUpdate, IUser } from '../../types/user';

import Logo from '../../assets/logo.png';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const { handleUserInfoUpdate } = useAuth();

  const user = getUser();
  const { username, description } = user as IUser;

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

      const res = await updateUserInfo(username, updates);
      handleUserInfoUpdate(res);

      if (newUsername) {
        navigate(`/profile/${newUsername}`);
      } else {
        navigate(`/profile/${username}`);
      }
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
            placeholder={username}
            className="username-input"
          />
          <textarea
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
            placeholder={description}
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
