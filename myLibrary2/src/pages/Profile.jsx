import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <section className="profile-page">
      <h1>Your Profile</h1>

      <div className="profile-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.uid}</p>

        <button onClick={logout}>Logout</button>
      </div>
    </section>
  );
}
