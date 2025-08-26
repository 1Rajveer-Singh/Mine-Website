# Earth Resource Technology - Professional Mining Website

A modern, professional React.js website for Earth Resource Technology, featuring advanced UI/UX design with a focus on mining technology services and software solutions.

## 🌟 Features

### Professional Navbar Design
- **Rectangular Card Navigation**: Navigation items contained in elegant rounded cards
- **Glassmorphism Effects**: Modern backdrop blur and transparency effects
- **Advanced Animations**: Smooth hover effects, scale animations, and gradient transitions
- **Professional Spacing**: Perfect alignment and spacing for a premium look
- **Service-Based Layout**: Optimized for professional service companies

### Technical Features
- ⚡ **React 19.1.0** with modern hooks and performance optimizations
- 🎨 **Tailwind CSS 4.1.11** for utility-first styling
- 🧭 **React Router 6.30.1** for seamless navigation
- 🎯 **TypeScript** for type safety and better development experience
- 📱 **Fully Responsive** design for all device sizes
- 🚀 **Vite 7.0.0** for lightning-fast development and builds

### Design Highlights
- **Professional Color Scheme**: Blue/purple primary colors with orange/red accents
- **Contact Information Bar**: Phone, email, location, and business hours
- **Interactive Elements**: Search, wishlist, cart, and profile functionality
- **Smooth Animations**: CSS animations with proper timing and easing
- **Modern Typography**: Gradient text effects and professional font hierarchy

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 6.30.1
- **Icons**: React Icons (Font Awesome)
- **Build Tool**: Vite 7.0.0
- **Development**: ESLint, PostCSS

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1Rajveer-Singh/Mine-Website.git
   cd Mine-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` to see the website

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── Header.tsx       # Professional navbar with card design
│   ├── Footer.tsx       # Website footer
│   └── SoftwareSidebar.tsx
├── screens/             # Page components
│   ├── HomeScreen.tsx
│   ├── AboutScreen.tsx
│   ├── ServicesScreen.tsx
│   └── ... (other screens)
├── App.tsx              # Main app component
├── main.tsx             # Application entry point
└── index.css            # Global styles and animations
```

## 🎨 Design Features

### Navbar Design
- **Card-Based Navigation**: All menu items in a beautiful rounded rectangular container
- **Professional Spacing**: Balanced layout with proper margins and padding
- **Gradient Backgrounds**: Subtle gradients for depth and visual appeal
- **Hover Effects**: Interactive animations on all clickable elements
- **Responsive Design**: Adapts perfectly to mobile and desktop screens

### Color Palette
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradients
- **Secondary**: Orange (#F97316) to Red (#EF4444) gradients
- **Neutral**: Gray shades for text and backgrounds
- **Accent**: White with transparency for glassmorphism effects

### Animations
- Scale transformations on hover
- Smooth color transitions
- Backdrop blur effects
- Gradient animation overlays
- Pulse effects for notifications

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full navigation with all features visible
- **Tablet**: Adapted layout with touch-friendly interfaces
- **Mobile**: Collapsible menu with optimized mobile experience

## 🔧 Customization

### Modifying Colors
Edit the `tailwind.config.js` file to customize the color palette:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      }
    }
  }
}
```

### Adding New Pages
1. Create a new screen component in `src/screens/`
2. Add the route to `navItems` array in `Header.tsx`
3. Configure routing in `App.tsx`

## 🌐 Live Demo

Visit the live website: [Earth Resource Technology](https://github.com/1Rajveer-Singh/Mine-Website)

## 📧 Contact

- **Website**: [Earth Resource Technology](https://github.com/1Rajveer-Singh/Mine-Website)
- **Email**: info@earthresource.com
- **Phone**: +91 9876543210
- **Location**: Raipur, Chhattisgarh, India

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Support

If you like this project, please give it a star ⭐ on GitHub!

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
