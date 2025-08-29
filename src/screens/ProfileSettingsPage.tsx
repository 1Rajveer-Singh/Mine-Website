import React from 'react';
import ProfileWrapper from '../components/ProfileWrapper';
import ProfileSettings from '../components/profile/ProfileSettings';

const ProfileSettingsPage: React.FC = () => {
  return (
    <ProfileWrapper title="Profile Settings">
      <ProfileSettings />
    </ProfileWrapper>
  );
};

export default ProfileSettingsPage;
