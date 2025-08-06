# Meels on Wheels Admin Panel

A modern, responsive admin panel for restaurant management built with React JS and SCSS.

## Features

- **🔐 Secure Login System** - Beautiful login interface with authentication
- **📊 Dashboard Overview** - Real-time statistics and activity monitoring
- **📋 Order Management** - Track and manage customer orders with status updates
- **🍽️ Menu Management** - Manage restaurant items with availability toggles
- **💬 Customer Support** - Handle customer inquiries and support tickets
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI/UX** - Clean, intuitive interface with smooth animations

## Demo Credentials

- **Email:** admin@meels.com
- **Password:** admin123

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd meels-on-wheels-admin-panel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Login.jsx                 # Login component
│   ├── Login.scss                # Login styles
│   ├── Dashboard.jsx             # Main dashboard layout
│   ├── Dashboard.scss            # Dashboard styles
│   ├── Sidebar.jsx               # Navigation sidebar
│   ├── Sidebar.scss              # Sidebar styles
│   └── dashboard/
│       ├── Overview.jsx          # Dashboard overview
│       ├── Overview.scss         # Overview styles
│       ├── RecentOrders.jsx      # Order management
│       ├── RecentOrders.scss     # Order styles
│       ├── RestaurantItems.jsx   # Menu management
│       ├── RestaurantItems.scss  # Menu styles
│       ├── CustomerHelp.jsx      # Support tickets
│       └── CustomerHelp.scss     # Support styles
├── styles/
│   ├── theme.scss                # Color variables and theme
│   └── global.scss               # Global styles and utilities
├── App.jsx                       # Main app component
└── index.js                      # App entry point
```

## Key Features

### 1. Login System

- Secure authentication with demo credentials
- Beautiful gradient background
- Form validation and error handling
- Loading states and animations

### 2. Dashboard Overview

- Real-time statistics cards
- Recent activity feed
- Quick action buttons
- Responsive grid layout

### 3. Order Management

- View all customer orders
- Filter by status (pending, preparing, delivered, cancelled)
- Update order status with one click
- Export orders functionality
- Customer details and order items display

### 4. Restaurant Items Management

- Grid layout for menu items
- Search and filter functionality
- Toggle switches for item availability
- Edit and delete actions
- Category-based organization

### 5. Customer Support

- Support ticket management
- Priority and status filtering
- Ticket assignment system
- Detailed ticket view with actions
- Reply and resolution tracking

## Design System

### Colors

- **Primary:** #fc8019 (Orange)
- **Secondary:** #282c3f (Dark Blue)
- **Success:** #60b246 (Green)
- **Warning:** #ff6b6b (Red-Orange)
- **Error:** #dc3545 (Red)

### Components

- Modern card-based layouts
- Consistent spacing and typography
- Smooth hover animations
- Responsive grid systems
- Custom toggle switches

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Navigation and routing
- **SCSS** - Advanced CSS preprocessing
- **Create React App** - Build tool and development environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
