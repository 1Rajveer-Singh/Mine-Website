import React from 'react';
import ProfileWrapper from '../components/ProfileWrapper';
import Notifications from '../components/profile/Notifications';

const NotificationsPage: React.FC = () => {
  return (
    <ProfileWrapper title="Notifications">
      <Notifications />
    </ProfileWrapper>
  );
};

export default NotificationsPage;
