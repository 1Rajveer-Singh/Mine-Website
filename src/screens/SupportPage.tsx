import React from 'react';
import ProfileWrapper from '../components/ProfileWrapper';
import Support from '../components/profile/Support';

const SupportPage: React.FC = () => {
  return (
    <ProfileWrapper title="Help & Support">
      <Support />
    </ProfileWrapper>
  );
};

export default SupportPage;
