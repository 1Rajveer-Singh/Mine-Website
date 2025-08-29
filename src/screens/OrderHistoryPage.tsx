import React from 'react';
import ProfileWrapper from '../components/ProfileWrapper';
import OrderHistory from '../components/profile/OrderHistory';

const OrderHistoryPage: React.FC = () => {
  return (
    <ProfileWrapper title="Order History">
      <OrderHistory />
    </ProfileWrapper>
  );
};

export default OrderHistoryPage;
