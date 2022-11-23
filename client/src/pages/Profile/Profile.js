import { useEffect } from 'react';
import './Profile.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    auth.logout();
    navigate('/login');
  };

  return (
    <main className="profile">
      <div className="profile__user-container">
        <h1 className="profile__user">Welcome - {auth.user?.username}</h1>
        <button onClick={logoutHandler} className="profile__logout-btn">
          Logout
        </button>
      </div>
      <div className="profile__posts">
        <h3>Here are your books:</h3>
      </div>
    </main>
  );
}

export default Profile;
