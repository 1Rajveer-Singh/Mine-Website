import React from 'react';
import ProfileWrapper from '../components/ProfileWrapper';
import PaymentMethods from '../components/profile/PaymentMethods';

const PaymentProfilePage: React.FC = () => {
  return (
    <ProfileWrapper title="Payment Methods">
      <PaymentMethods />
    </ProfileWrapper>
  );
};

export default PaymentProfilePage;
