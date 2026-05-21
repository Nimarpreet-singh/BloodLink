# 🩸 BloodLink

A full-stack blood donation platform connecting donors directly with patients in need.

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose
- **Auth**: bcryptjs + JWT

## Setup (4 steps)

### 1. Clone / Download the project

### 2. Install all dependencies
```bash
# From root folder
npm run install-all
```

Or manually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment
```bash
cd backend
cp .env.example .env
```
Edit `.env` and add your MongoDB Atlas connection string:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bloodlink
JWT_SECRET=any_random_secret_string
PORT=5000
```

### 4. Run the project
```bash
# From root folder — starts both backend and frontend
npm run dev
```

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000

Sample data (10 donors, 5 requests) is seeded automatically on first run.

## Demo Credentials

**Donor:** arjun@example.com / password123  
**Recipient:** rajesh@example.com / password123

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register-donor | Register donor |
| POST | /api/auth/login-donor | Donor login |
| POST | /api/auth/register-recipient | Register recipient |
| POST | /api/auth/login-recipient | Recipient login |
| GET | /api/donors | All donors |
| GET | /api/donors/:id | Single donor |
| PUT | /api/donors/:id | Update donor (auth) |
| GET | /api/donors/search | Search with filters |
| POST | /api/requests | Create request (auth) |
| GET | /api/requests | All requests |
| GET | /api/requests/:id | Single request |

## Folder Structure

```
bloodlink/
├── backend/
│   ├── config/seed.js
│   ├── middleware/auth.js
│   ├── models/Donor.js
│   ├── models/Recipient.js
│   ├── models/BloodRequest.js
│   ├── routes/auth.js
│   ├── routes/donors.js
│   ├── routes/requests.js
│   ├── server.js
│   └── .env.example
└── frontend/
    └── src/
        ├── components/Navbar.js
        ├── components/Footer.js
        ├── components/ProtectedRoute.js
        ├── context/AuthContext.js
        ├── services/api.js
        ├── styles/main.css
        └── pages/
            ├── Home.js
            ├── About.js
            ├── Contact.js
            ├── DonorRegister.js
            ├── DonorLogin.js
            ├── DonorDashboard.js
            ├── EditDonorProfile.js
            ├── RecipientRegister.js
            ├── RecipientLogin.js
            ├── RecipientDashboard.js
            ├── SearchDonors.js
            ├── CreateRequest.js
            └── ViewRequests.js
```
