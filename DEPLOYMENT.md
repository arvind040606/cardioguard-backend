# CardioGuard AI – Production Deployment Guide

This document outlines the step-by-step process for deploying the CardioGuard AI **Hybrid Backend (Node.js + Python)** to Render.com.

## Architecture Overview
- **Frontend**: React (Vite) hosted on Vercel.
- **Backend**: Express (Node.js) hosting the API endpoints.
- **Machine Learning**: Scikit-Learn/XGBoost (Python) spawned as child processes by the Node.js backend.
- **Containerization**: Docker is used to bundle both the Node.js and Python runtimes into a single production-ready container.

---

## 1. Prerequisites

1. Your code must be pushed to a GitHub repository.
2. You must have an account on [Render.com](https://render.com/).

---

## 2. Environment Variables

The backend is configured to run out-of-the-box with zero required environment variables (since Database and Auth are handled entirely by Supabase on the frontend). However, you can configure the following optional variables in Render:

| Variable | Purpose | Mandatory? | Default Value |
| :--- | :--- | :--- | :--- |
| `PORT` | The port the Express server listens on. Render provides this automatically. | No | `5000` |
| `FRONTEND_URL` | Configures CORS to only allow requests from your Vercel URL. | No | `*` (Allows all origins) |
| `PYTHON_BIN` | Explicit path to the Python executable. | No | `python3` (Auto-detected in Docker) |

**Recommendation for Production:** 
Set `FRONTEND_URL` in Render to your exact Vercel deployment URL (e.g., `https://cardioguard20.vercel.app`) to strictly enforce CORS security.

---

## 3. Deployment Steps (Render.com)

1. **Log in to Render**
   Navigate to your [Render Dashboard](https://dashboard.render.com/).

2. **Create a New Web Service**
   - Click the **"New +"** button in the top right corner.
   - Select **Web Service**.
   - Under the "Connect a repository" section, locate and select your `cardioguard-backend` repository.

3. **Configure the Service**
   Fill out the configuration fields exactly as follows:
   - **Name**: `cardioguard-api` (or your preferred name)
   - **Region**: Choose the region closest to your users (e.g., US East, Frankfurt).
   - **Branch**: `main`
   - **Runtime**: **Docker** (Render will automatically detect your `Dockerfile`).
   - **Build Command**: *(Leave empty/default - Docker handles this)*
   - **Start Command**: *(Leave empty/default - Docker handles this)*
   - **Instance Type**: Select **Free** (or a paid tier if you expect high traffic).

4. **Set Environment Variables (Optional but Recommended)**
   Scroll down to the **Environment Variables** section and click "Add Environment Variable":
   - Key: `FRONTEND_URL`
   - Value: `https://cardioguard20.vercel.app` *(Replace with your actual Vercel URL)*

5. **Deploy!**
   - Click **Create Web Service** at the bottom of the page.
   - Render will begin building your Docker container. This process involves installing Ubuntu dependencies, downloading Python, installing all heavy Machine Learning libraries (`scikit-learn`, `xgboost`, `pandas`), installing Node.js, and running `npm install`. 
   - **Note:** The first build usually takes 5-10 minutes.

6. **Verify the Deployment**
   - Once the build is complete and the status turns to a green **Live**, copy the URL provided by Render at the top left of the screen (e.g., `https://cardioguard-api-xyz.onrender.com`).
   - Open a new browser tab and navigate to `https://cardioguard-api-xyz.onrender.com/health`.
   - You should see a JSON response confirming the API is healthy:
     ```json
     {
       "status": "ok",
       "service": "CardioGuard AI API",
       "database": "JSON File Fallback",
       "environment": "production"
     }
     ```

---

## 4. Finalizing the Frontend Connection

Once your backend is Live on Render, you must instruct your Vercel frontend to route predictions to it.

1. Go to your **Vercel Dashboard**.
2. Select your `cardioguard` project.
3. Click **Settings** > **Environment Variables**.
4. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render URL (e.g., `https://cardioguard-api-xyz.onrender.com` - *do not include a trailing slash*).
5. Click **Save**.
6. Go to the **Deployments** tab, click the three dots (`...`) next to your most recent deployment, and click **Redeploy**.

### 🎉 Congratulations! 
Your enterprise-grade, hybrid-runtime AI healthcare platform is now fully deployed in the cloud.
