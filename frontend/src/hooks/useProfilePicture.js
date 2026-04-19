import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function useProfilePicture() {
  const { user, login } = useAuth();
  const [pfp, setPfp] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      const savedPfp = localStorage.getItem(`pfp_${user.id}`);
      if (savedPfp) setPfp(savedPfp);
    }
  }, [user]);

  const handleUpload = (file) => {
    setError('');
    
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, or GIF)');
      return;
    }

    // Check file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPfp(base64String);
      if (user?.id) {
        localStorage.setItem(`pfp_${user.id}`, base64String);
        // Also update the user object in context so navbar updates
        login({ ...user, avatar: base64String });
      }
    };
    reader.readAsDataURL(file);
  };

  const removePfp = () => {
    setPfp(null);
    if (user?.id) {
      localStorage.removeItem(`pfp_${user.id}`);
      login({ ...user, avatar: null });
    }
  };

  return { pfp, error, handleUpload, removePfp, setError };
}
