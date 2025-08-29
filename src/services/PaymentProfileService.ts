// PaymentProfileService - Manages payment profile state and validation
interface PaymentProfile {
  // Personal Information
  isPersonalInfoComplete: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Primary Address
  isPrimaryAddressComplete: boolean;
  primaryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Payment Methods
  hasPaymentMethod: boolean;
  defaultPaymentMethod: {
    id: string;
    type: 'credit' | 'debit' | 'paypal' | 'upi' | 'bank';
    isVerified: boolean;
    lastFour?: string;
    email?: string;
    upiId?: string;
  } | null;
  
  // Billing Address (can be same as primary)
  isBillingAddressComplete: boolean;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    sameAsPrimary: boolean;
  };
  
  // Profile completion status
  isProfileComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
}

export class PaymentProfileService {
  private static STORAGE_KEY = 'payment_profile';
  
  // Get current payment profile
  static getPaymentProfile(): PaymentProfile {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const defaultProfile: PaymentProfile = {
      isPersonalInfoComplete: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isPrimaryAddressComplete: false,
      primaryAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      },
      hasPaymentMethod: false,
      defaultPaymentMethod: null,
      isBillingAddressComplete: false,
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        sameAsPrimary: true
      },
      isProfileComplete: false,
      completionPercentage: 0,
      missingFields: []
    };
    
    if (stored) {
      return { ...defaultProfile, ...JSON.parse(stored) };
    }
    
    return defaultProfile;
  }
  
  // Save payment profile
  static savePaymentProfile(profile: Partial<PaymentProfile>): void {
    const currentProfile = this.getPaymentProfile();
    const updatedProfile = { ...currentProfile, ...profile };
    
    // Update completion status
    this.updateCompletionStatus(updatedProfile);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProfile));
    
    // Dispatch event for components to listen
    window.dispatchEvent(new CustomEvent('paymentProfileUpdated', { 
      detail: updatedProfile 
    }));
  }
  
  // Update completion status
  private static updateCompletionStatus(profile: PaymentProfile): void {
    const missingFields: string[] = [];
    let completedSections = 0;
    const totalSections = 4; // Personal, Address, Payment, Billing
    
    // Check personal information
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.phone) {
      if (!profile.firstName) missingFields.push('First Name');
      if (!profile.lastName) missingFields.push('Last Name');
      if (!profile.email) missingFields.push('Email');
      if (!profile.phone) missingFields.push('Phone');
      profile.isPersonalInfoComplete = false;
    } else {
      profile.isPersonalInfoComplete = true;
      completedSections++;
    }
    
    // Check primary address
    const addr = profile.primaryAddress;
    if (!addr.street || !addr.city || !addr.state || !addr.zipCode) {
      if (!addr.street) missingFields.push('Street Address');
      if (!addr.city) missingFields.push('City');
      if (!addr.state) missingFields.push('State');
      if (!addr.zipCode) missingFields.push('ZIP Code');
      profile.isPrimaryAddressComplete = false;
    } else {
      profile.isPrimaryAddressComplete = true;
      completedSections++;
    }
    
    // Check payment method
    if (!profile.defaultPaymentMethod || !profile.defaultPaymentMethod.isVerified) {
      missingFields.push('Verified Payment Method');
      profile.hasPaymentMethod = false;
    } else {
      profile.hasPaymentMethod = true;
      completedSections++;
    }
    
    // Check billing address
    const billing = profile.billingAddress;
    if (billing.sameAsPrimary) {
      profile.isBillingAddressComplete = profile.isPrimaryAddressComplete;
      if (profile.isPrimaryAddressComplete) completedSections++;
    } else {
      if (!billing.street || !billing.city || !billing.state || !billing.zipCode) {
        if (!billing.street) missingFields.push('Billing Street Address');
        if (!billing.city) missingFields.push('Billing City');
        if (!billing.state) missingFields.push('Billing State');
        if (!billing.zipCode) missingFields.push('Billing ZIP Code');
        profile.isBillingAddressComplete = false;
      } else {
        profile.isBillingAddressComplete = true;
        completedSections++;
      }
    }
    
    profile.completionPercentage = Math.round((completedSections / totalSections) * 100);
    profile.isProfileComplete = completedSections === totalSections;
    profile.missingFields = missingFields;
  }
  
  // Check if profile is ready for checkout
  static isReadyForCheckout(): boolean {
    const profile = this.getPaymentProfile();
    return profile.isProfileComplete;
  }
  
  // Get missing requirements for checkout
  static getCheckoutRequirements(): {
    isReady: boolean;
    missingFields: string[];
    completionPercentage: number;
  } {
    const profile = this.getPaymentProfile();
    return {
      isReady: profile.isProfileComplete,
      missingFields: profile.missingFields,
      completionPercentage: profile.completionPercentage
    };
  }
  
  // Import from existing user profile (if available)
  static importFromUserProfile(): void {
    try {
      // Try to get existing profile data
      const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
      
      if (userProfile.firstName || userProfile.email) {
        const profile = this.getPaymentProfile();
        
        this.savePaymentProfile({
          firstName: userProfile.firstName || profile.firstName,
          lastName: userProfile.lastName || profile.lastName,
          email: userProfile.email || profile.email,
          phone: userProfile.phone || profile.phone,
          primaryAddress: {
            ...profile.primaryAddress,
            street: userProfile.address || profile.primaryAddress.street,
            city: userProfile.city || profile.primaryAddress.city,
            country: userProfile.country || profile.primaryAddress.country,
            state: profile.primaryAddress.state,
            zipCode: profile.primaryAddress.zipCode
          }
        });
      }
    } catch (error) {
      console.log('No existing user profile found to import');
    }
  }
  
  // Clear payment profile
  static clearPaymentProfile(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('paymentProfileUpdated', { 
      detail: this.getPaymentProfile() 
    }));
  }
}

export default PaymentProfileService;
