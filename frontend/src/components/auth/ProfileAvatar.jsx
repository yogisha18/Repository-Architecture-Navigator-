import { useState, useRef } from 'react';
import { User, LogOut, Settings, Camera, UserCircle } from 'lucide-react';
import useProfilePicture from '../../hooks/useProfilePicture';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

export default function ProfileAvatar() {
  const { user, logout } = useAuth();
  const { pfp, handleUpload, error } = useProfilePicture();
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        className="profile-avatar-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {pfp || user?.avatar ? (
          <img src={pfp || user?.avatar} alt="PFP" className="user-avatar-img" />
        ) : (
          <div className="user-initials-avatar">
            {getInitials(user?.name)}
          </div>
        )}
        <div className="avatar-glow" />
      </button>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <ProfileDropdown 
            user={user} 
            onLogout={logout} 
            onUpload={triggerUpload} 
            onClose={() => setIsOpen(false)} 
          />
        </>
      )}

      {error && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] p-2 rounded shadow-xl z-50 animate-bounce">
          {error}
        </div>
      )}
    </div>
  );
}
