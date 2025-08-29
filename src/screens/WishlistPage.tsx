import React from 'react';
import ProfileWrapper from '../components/ProfileWrapper';
import Wishlist from '../components/profile/Wishlist';

const WishlistPage: React.FC = () => {
  return (
    <ProfileWrapper title="Wishlist">
      <Wishlist />
    </ProfileWrapper>
  );
};

export default WishlistPage;
