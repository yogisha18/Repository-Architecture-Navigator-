import { User, LogOut, Settings, Camera, Shield } from 'lucide-react';

export default function ProfileDropdown({ user, onLogout, onUpload, onClose }) {
  return (
    <div className="profile-dropdown-menu animate-slideDown">
      <div className="dropdown-header">
        <div className="font-bold text-bright">{user?.name}</div>
        <div className="text-[10px] text-muted truncate">{user?.email}</div>
      </div>
      
      <div className="dropdown-divider" />
      
      <button className="dropdown-item" onClick={onClose}>
        <User size={14} />
        <span>My Profile</span>
      </button>
      
      <button className="dropdown-item" onClick={onUpload}>
        <Camera size={14} />
        <span>Change Photo</span>
      </button>
      
      <button className="dropdown-item" onClick={onClose}>
        <Settings size={14} />
        <span>Settings</span>
      </button>

      <div className="dropdown-divider" />
      
      <button className="dropdown-item text-red-400 hover:bg-red-500/10" onClick={onLogout}>
        <LogOut size={14} />
        <span>Logout</span>
      </button>
    </div>
  );
}
