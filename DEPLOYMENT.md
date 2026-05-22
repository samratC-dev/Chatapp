# Chat App Deployment Guide (Free Hosting)

## 1) Prepare secrets first

- Rotate the values currently in `Backend/.env` before going live.
- Use strong new values for:
  - `MONGODB_URI`
  - `JWT_TOKEN`

## 2) Deploy backend for free (Render)

1. Push this repo to GitHub.
2. Create a Render account and click **New +** -> **Web Service**.
3. Connect your GitHub repo.
4. Configure:
   - Root Directory: `Backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables:
   - `MONGODB_URI=...`
   - `JWT_TOKEN=...`
   - `CLIENT_URL=https://<your-frontend-domain>`
   - `NODE_ENV=production`
6. Deploy and copy your backend URL, for example:
   - `https://your-backend.onrender.com`

## 3) Deploy frontend for free (Vercel)

1. Create a Vercel account and click **Add New...** -> **Project**.
2. Import the same GitHub repo.
3. Configure:
   - Root Directory: `Frontend`
   - Framework Preset: `Vite`
4. Add environment variable:
   - `VITE_API_URL=https://<your-backend.onrender.com>`
5. Deploy.

## 4) Connect frontend and backend

- Copy your Vercel domain.
- Update Render backend env:
  - `CLIENT_URL=https://<your-frontend-domain.vercel.app>`
- Redeploy backend.

## 5) Verify after deploy

- Signup/Login works.
- Cookies are set and auth persists.
- Sending and receiving messages works.
- Realtime online users and messages work (Socket.IO).
- Browser console has no CORS errors.

## Optional free alternatives

- Frontend: Netlify instead of Vercel.
- Backend: Railway instead of Render (credit-based free usage).

For this codebase, Render (backend) + Vercel (frontend) is usually the simplest free setup.
