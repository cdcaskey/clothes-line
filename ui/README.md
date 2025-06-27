# Arjun's Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Vite. Features a Progressive Web App (PWA) with offline capabilities, GitHub integration, and a beautiful UI powered by shadcn/ui components.

## 🌟 Features

### 📱 Progressive Web App (PWA)

- **Offline Support**: Works without internet connection using cached content
- **Installable**: Can be installed on mobile and desktop devices
- **App-like Experience**: Full-screen standalone mode with native app feel
- **Automatic Updates**: Seamless updates with user notification
- **Smart Caching**: Intelligent caching strategy for optimal performance
- **Installation Prompt**: Encourages users to install the app
- **Offline Fallback**: Graceful offline experience with helpful messaging

### 🚀 GitHub Integration

- **Dynamic Experience Calculation**: Automatically calculates experience from September 2023 to present
- **Real-time Repository Data**: Fetches all public repositories with stats (stars, forks, languages)
- **Live Project Count**: Shows actual number of completed projects from GitHub
- **GitHub Stats Dashboard**: Displays total stars, forks, and languages used
- **Featured Projects**: Automatically showcases top repositories based on engagement
- **Search & Filter**: Full repository browsing with search and language filtering

### 📄 Resume Download

- **Multiple Access Points**: Download buttons in Hero, About, and Contact sections
- **Easy Access**: Resume served from `/public/Arjun_resume.pdf`
- **New Tab Opening**: Opens in a new tab for easy viewing and downloading

### 🛠️ Technical Features

- **React Query**: Efficient data fetching with caching and error handling
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Data refreshes automatically every 5 minutes
- **SEO Optimized**: Meta tags, structured data, and sitemap generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arjun-computer-geek/arjun-computer-geek.github.io.git
   cd arjun-computer-geek.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build:pwa
   ```

5. **Preview production build**
   ```bash
   npm run preview:pwa
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run build:pwa` - Build for production with PWA features
- `npm run preview` - Preview production build
- `npm run preview:pwa` - Preview PWA production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── forms/          # Form components
│   └── ...             # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── data/               # Static data files
├── config/             # Configuration files
└── schemas/            # Zod validation schemas
```

## 🎨 Technologies Used

### Core Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### Data Management

- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### PWA Features

- **Vite PWA Plugin** - PWA generation
- **Workbox** - Service worker management
- **Web App Manifest** - App configuration

### Additional Libraries

- **React Helmet Async** - Document head management
- **Sonner** - Toast notifications
- **Recharts** - Data visualization
- **Date-fns** - Date utilities

## 📱 PWA Implementation

### Service Worker Strategy

- **Cache First**: Static assets (images, fonts, CSS, JS)
- **Network First**: API calls with fallback to cache
- **Stale While Revalidate**: Dynamic content with background updates

### Caching Strategy

- **Static Assets**: Cached for 1 year (fonts, images, icons)
- **API Data**: Cached for 1 day with network-first approach
- **App Shell**: Cached for instant loading
- **Runtime Caching**: Intelligent caching based on content type

### Offline Features

- **Offline Fallback Page**: Helpful message when content unavailable
- **Cached Content Access**: All cached content available offline
- **Connectivity Detection**: Real-time online/offline status
- **Graceful Degradation**: App works with limited connectivity

## 🔗 GitHub Integration

### API Endpoints Used

- `GET /users/arjun-computer-geek/repos` - Fetch all repositories
- `GET /repos/{owner}/{repo}/topics` - Fetch repository topics

### Experience Calculation

Experience is automatically calculated from September 1, 2023 to the current date, providing accurate year/month breakdown.

### Data Caching

- Repository data: 5 minutes stale time, 30 minutes cache
- Experience calculation: 1 hour stale time, 24 hours cache
- Automatic retry with exponential backoff

## 🚀 Deployment

This project is deployed on GitHub Pages and can be accessed at: [https://arjun-computer-geek.github.io](https://arjun-computer-geek.github.io)

### Build Process

1. Run `npm run build:pwa` to create production build
2. The build includes all PWA features and optimizations
3. Deploy the `dist` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Arjun - [@arjun-computer-geek](https://github.com/arjun-computer-geek)

Project Link: [https://github.com/arjun-computer-geek/arjun-computer-geek.github.io](https://github.com/arjun-computer-geek/arjun-computer-geek.github.io)

---

⭐ Star this repository if you found it helpful!
