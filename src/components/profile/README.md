# Profile Section Components

This folder contains comprehensive profile management components for the React application. Each component is fully functional with modern UI/UX design using Tailwind CSS and React Icons.

## Components Overview

### 1. ProfileSettings.tsx
**Purpose**: Complete user profile management with personal information and security settings.

**Features**:
- Personal information editing (name, email, phone, bio)
- Avatar upload with preview
- Password change functionality
- Security settings (2FA toggle)
- Tab-based navigation between Personal Info and Security
- Form validation and loading states

**Key Sections**:
- Personal Info Tab: Profile details, avatar management
- Security Tab: Password change, two-factor authentication

### 2. OrderHistory.tsx
**Purpose**: Order tracking and management interface for user purchases.

**Features**:
- Complete order listing with status indicators
- Advanced filtering by status and date range
- Search functionality by order ID or product name
- Detailed order view modal with:
  - Order timeline and tracking information
  - Product details and quantities
  - Billing and shipping addresses
  - Invoice download functionality
- Responsive design for mobile and desktop

**Order Statuses**: Pending, Processing, Shipped, Delivered, Cancelled

### 3. Wishlist.tsx
**Purpose**: Wishlist management with advanced filtering and sorting capabilities.

**Features**:
- Grid and list view toggle
- Advanced filtering by:
  - Category (Software, Hardware, Training, Consulting)
  - Price range with dual slider
  - Availability status
- Sorting options (Name, Price, Date Added)
- Search functionality
- Item management (remove from wishlist, add to cart)
- Responsive design with different layouts

### 4. Support.tsx
**Purpose**: Comprehensive help and support center with multiple contact options.

**Features**:
- Three main tabs: Help Center, Contact Us, My Tickets
- Help Center:
  - Quick help options (Documentation, Videos, Downloads, Community)
  - FAQ section with search and categories
  - Expandable FAQ items
- Contact Us:
  - Contact information display
  - Contact form with validation
  - Category and priority selection
- My Tickets:
  - Support ticket listing
  - Status and priority indicators
  - Ticket details access

### 5. Notifications.tsx
**Purpose**: Notification management center with filtering and settings.

**Features**:
- Notification display with different types:
  - Order updates
  - System notifications
  - Download notifications
  - Account notifications
  - Promotional content
- Advanced filtering and search
- Mark as read/unread functionality
- Bulk actions (mark all read, clear read)
- Notification settings panel:
  - Delivery preferences
  - Notification type controls
- Real-time timestamp display
- Priority indicators

## Usage Examples

### Basic Import and Usage

```tsx
// Import individual components
import { ProfileSettings, OrderHistory, Wishlist, Support, Notifications } from './components/profile';

// Or import specific component
import ProfileSettings from './components/profile/ProfileSettings';

// Usage in a parent component
function ProfilePage() {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div>
      {activeTab === 'settings' && <ProfileSettings />}
      {activeTab === 'orders' && <OrderHistory />}
      {activeTab === 'wishlist' && <Wishlist />}
      {activeTab === 'support' && <Support />}
      {activeTab === 'notifications' && <Notifications />}
    </div>
  );
}
```

### Integration with Header Component

To integrate these components with your header dropdown menu:

```tsx
// In Header.tsx, add navigation handlers
const handleProfileNavigation = (section: string) => {
  // Navigate to profile section
  // You can use React Router or your preferred routing solution
  navigate(`/profile/${section}`);
};

// Update the profile dropdown items
<button 
  onClick={() => handleProfileNavigation('settings')}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  <FaUser className="inline mr-2" size={14} />
  Profile Settings
</button>
<button 
  onClick={() => handleProfileNavigation('orders')}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  <FaShoppingBag className="inline mr-2" size={14} />
  Order History
</button>
// ... additional menu items
```

## Design Features

### Consistent Styling
- All components use consistent Tailwind CSS classes
- White background theme with proper contrast
- Hover effects and smooth transitions
- Responsive design for all screen sizes

### Icon Usage
- FontAwesome icons via react-icons/fa
- Consistent icon sizing and colors
- Semantic icon usage for better UX

### Interactive Elements
- Loading states for form submissions
- Hover effects on clickable elements
- Modal dialogs for detailed views
- Tab navigation with active states

### Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content
- Focus management in modals

## Technical Notes

### Dependencies
- React 18+ with TypeScript
- Tailwind CSS for styling
- React Icons (FontAwesome)
- No external libraries required

### State Management
- Each component manages its own local state
- Can be easily integrated with global state management (Redux, Zustand, etc.)
- Props can be added for external data fetching

### Performance
- Optimized re-rendering with proper React hooks usage
- Lazy loading ready (components can be code-split)
- Minimal bundle size impact

## Customization

### Styling
All components use Tailwind classes and can be easily customized by:
- Modifying color schemes in component files
- Updating spacing and sizing values
- Adding custom CSS classes for specific needs

### Functionality
Components are designed to be extensible:
- Add new tabs or sections easily
- Integrate with backend APIs
- Customize form validation rules
- Add new notification types

## File Structure
```
src/components/profile/
├── index.ts              # Export barrel file
├── ProfileSettings.tsx   # Profile management
├── OrderHistory.tsx      # Order tracking
├── Wishlist.tsx         # Wishlist management
├── Support.tsx          # Help and support
├── Notifications.tsx    # Notification center
└── README.md           # This documentation
```

## Integration Notes

These components are ready to be integrated into your existing application. They work seamlessly with the updated Header.tsx component and maintain the white theme consistency throughout the application.

Each component is self-contained and can be used independently or as part of a larger profile management system.
