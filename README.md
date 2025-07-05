# 360° Quick Scoops - E-commerce Website

A beautiful, modern e-commerce website for an ice cream shop built with Next.js and Tailwind CSS.

## Features

- 🍦 Beautiful product catalog with ice cream flavors
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast loading with Next.js
- 🚀 Easy deployment to Vercel

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Deployment

### Deploy to Vercel (Recommended - Free & Easy)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and create a free account using GitHub, GitLab, or Bitbucket.

2. **Push your code to GitHub**: 
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/yourusername/your-repo-name.git
     git push -u origin main
     ```

3. **Deploy with Vercel**:
   - Go to your Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"
   - Your site will be live in minutes!

### Alternative: Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder to deploy
   - Or connect your GitHub repository for automatic deployments

## Project Structure

```
ecommerce/
├── src/
│   ├── app/
│   │   ├── layout.js          # Main layout with fonts and styling
│   │   ├── page.js            # Home page
│   │   ├── products/
│   │   │   └── page.js        # Products/catalog page
│   │   └── cart/
│   │       └── page.js        # Shopping cart page
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── package.json
└── README.md
```

## Customization

### Adding New Products
Edit the `products` array in `src/app/products/page.js` to add new ice cream flavors.

### Changing Colors
The color scheme uses Tailwind's pink palette. To change colors, replace `pink-` classes with your preferred color throughout the components.

### Adding New Pages
Create new folders in `src/app/` with a `page.js` file for additional pages like:
- About Us
- Contact
- Checkout
- User Account

## Technologies Used

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Poppins font family
- **Material Icons** - Google Material Icons

## License

This project is for educational purposes.

---

Built with ❤️ for SEG 3125 - Analysis and Design of UI
