# 🌐 IEEE Student Branch Website

This is a responsive and dynamic website built for the IEEE Student Branch. The site showcases branch activities, team members, events, gallery, contact information, and more. It's designed to engage students, promote IEEE's mission, and provide updates on tech-driven events.

---

## 🧩 Features

- 🏠 **Home Page** with Hero Banner and Call to Action
- 👨‍👩‍👧‍👦 **About Us** section with mission and vision
- 🗓 **Events Page** to showcase past and upcoming activities
- 🖼 **Gallery** to feature images of branch activities
- 📬 **Contact Page** with embedded form or social links
- 📱 **Fully Responsive** design for mobile, tablet, and desktop

---

## 🛠 Tech Stack

- **Frontend**: Next.js
- **Framework**: Bootstrap / Tailwind CSS
- **Backend**: Mongo DB
- **Deployment**: GitHub Pages / Vercel

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DigarSingh/ieee-website.git
cd ieee-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## 🚢 Deployment on Vercel

This project is configured for seamless deployment on Vercel.

### Prerequisites

1. Set up the following environment variables in your Vercel project:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build:vercel` (this command should be detected automatically)
   - Output Directory: `frontend/.next` (this should be detected automatically)
   - Install Command: `npm install && npm install --prefix frontend`
3. Add the required environment variables directly in the Vercel dashboard
4. Deploy!

### Build Process

The build process uses a specialized workflow to handle authentication-required pages:

- Creates mock data for static generation
- Creates build-safe versions of authentication code
- Temporarily replaces auth-required pages with placeholder components
- Uses path aliases for better imports
- Optimizes MongoDB connections during build
- Restores original files after build is complete

#### Fixing Build Errors

If you encounter build errors with paths like `/admin/dashboard`, `/student/events`, or `/dashboard`, it's likely due to authentication requirements during static generation. Use our enhanced build script:

```bash
cd frontend
npm run build:vercel
```

This script will skip authentication checks during build time while ensuring the final deployed site has proper authentication.

#### Vercel-specific Setup

When deploying to Vercel, make sure to:

1. Use the root directory of your repository (where the vercel.json file is located)
2. Configure these environment variables in the Vercel dashboard under "Settings" > "Environment Variables":
   - `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
   - `JWT_SECRET`: Your authentication secret key (e.g., `your-strong-secret-key-here`)

> **Important**:  
>
> - Add environment variables directly in the Vercel project settings, not as referenced secrets with @ prefix
> - If the build fails with "No such file or directory: frontend", make sure your repository structure includes the frontend folder at the root level

## ✍️ License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📬 Contact

Made with 💙 by Digar Singh  
📧 Email: [digarsingh2004@gmail.com](mailto:digarsingh2004@gmail.com)  
🌐 Visit: [geuieee.com](https://geuieee.com)
