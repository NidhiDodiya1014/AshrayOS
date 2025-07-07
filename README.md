# AshrayOS - Hostel Management System

AshrayOS is a robust, full-stack hostel management system built to simplify and automate day-to-day hostel operations for administrators, wardens, and students. Featuring secure authentication and role-based portals, AshrayOS enables seamless management of room allocations, complaints, guest requests, and laundry services in a user-friendly interface.
- **Deployed App**: [AshrayOS](http://aashrayos.duckdns.org/)

---

## 🚀 Key Features

### 🔐 Secure Authentication System

The system provides secure login functionality for all user types with role-based access control. Users can authenticate as Students, Wardens, or Administrators, each with tailored access permissions and interface customizations.
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
  <img src="Assets/Screenshot%202025-06-26%20183325.png" alt="AshrayOS Main Dashboard" width="280"/>
</div>

**Authentication Features:**
- Role-based login (Student/Warden/Admin)
- Secure session management
- Password encryption
- Automatic logout for security

---

### 👑 Admin Portal
To login as an Admin you may take the UserID=`202303009` and Password=`mypassword`
#### 🛡️ Warden Management

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
  <img src="Assets/Screenshot%202025-06-26%20183341.png" alt="Login Interface" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183400.png" alt="Student Dashboard" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183457.png" alt="Student Profile View" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183513.png" alt="Room Change Request System" width="280"/>
</div>

Comprehensive warden administration:

- Add new wardens to the system
- View complete warden directory
- Remove wardens when necessary
- Assign warden responsibilities and permissions
  
#### 📈 Student Records Management

Advanced student data management:

- Access complete student database
- Export student records for reporting
- Monitor system-wide student activity
- Generate comprehensive analytics

---

### 🛡️ Warden Portal

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
  <img src="Assets/Screenshot%202025-06-26%20183615.png" alt="Leave Request Interface" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183632.png" alt="Complaint Filing System" width="280"/>
</div>

The warden portal offers comprehensive oversight tools for managing student requests and hostel operations efficiently

#### 📊 Request Management Dashboard

Centralized request handling system:

- **Room Change Requests**: Review and approve/reject room changes
- **Leave Applications**: Process student leave requests
- **Complaint Resolution**: Address and resolve student complaints
- **Guest Entry Approval**: Manage visitor access requests

#### 👨‍🎓 Student Directory

Complete student information access:

- View detailed student profiles
- Access room allocation information
- Monitor student activity and requests
- Generate student reports

---

### 🎓 Student Portal

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
  <img src="Assets/Screenshot%202025-06-26%20183724.png" alt="Guest Entry Request" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183749.png" alt="Laundry Booking Interface" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183830.png" alt="Warden Dashboard" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20183928.png" alt="Warden Request Management" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20184050.png" alt="Student Directory" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20184105.png" alt="Admin Dashboard" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20184139.png" alt="Warden Management Interface" width="280"/>
  <img src="Assets/Screenshot%202025-06-26%20184148.png" alt="Student Records System" width="280"/>
</div>

The student portal provides a comprehensive dashboard with intuitive navigation and quick access to all essential hostel services.

#### 📋 Personal Information Management

- **View Profile**: Access complete personal and room information
- **Room Details**: Current room assignment and roommate information
- **Contact Information**: Update personal contact details
- **Academic Information**: View enrolled course and semester details

#### 🏠 Room Change Requests

Students can easily request room changes through an intuitive interface:

- Submit new room change requests with reasons
- Track application status in real-time
- View request history and outcomes
- Receive status updates

#### 🎫 Leave Request Management

Streamlined leave application process:

- Submit leave requests with dates and reasons
- Monitor approval status
- View leave history and remaining quota

#### 📝 Complaint Management System

Comprehensive complaint handling with categorized issue reporting:

- File complaints by category (Maintenance, Food, Cleanliness, etc.)
- Track complaint resolution progress

#### 👥 Guest Visit Management

Efficient guest entry request system:

- Register guest visits in advance
- Provide visitor details and purpose
- Track approval status
- Generate visitor passes upon approval

#### 🧺 Smart Laundry Booking System

Advanced laundry management with real-time availability:

- **Real-time Slot Availability**: View available washing machine slots
- **Time-bound Bookings**: Auto-expiring sessions prevent slot hogging
- **Live Countdown**: Track remaining time for current bookings
- **Flexible Unbooking**: Cancel bookings when plans change
- **Usage History**: Track personal laundry usage patterns

---

## 🧑‍💻 Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Vite, React Router DOM
- **Database**: MySQL
- **Styling**: CSS with responsive and accessible UI design

---

## 📁 Project Structure

```
AshrayOS/
├── Server/           # Node.js backend with API and database connection
│   ├── Routes/       # Organized API routes by feature
│   │   ├── auth.js   # Authentication routes
│   │   ├── student.js # Student-specific routes
│   │   ├── warden.js  # Warden-specific routes
│   │   └── admin.js   # Admin-specific routes
│   ├── db.js         # MySQL configuration and connection logic
│   └── index.js      # Entry point for the Express server
│
└── client/           # React frontend
    ├── src/
    │   ├── Components/  # Reusable components grouped by user role
    │   │   ├── Student/ # Student portal components
    │   │   ├── Warden/  # Warden portal components
    │   │   └── Admin/   # Admin portal components
    │   ├── Pages/       # Page components (Login, Dashboard, etc.)
    │   ├── App.jsx      # Main routing logic
    │   └── main.jsx     # React app entry point
    ├── public/          # Static assets
    └── .env           # Environment configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (v18.x or later)
- **npm** (v8.x or later)
- **MySQL Server** (v8.0 or later)

### 🔧 Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nidhidodiya1014/AshrayOS.git
   cd AshrayOS/Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the Server directory:
   ```env
   HOST=localhost
   USER=your_mysql_user
   PASSWORD=your_mysql_password
   NAME=ashrayos_db
   PORT=3306
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup:**
   - Create MySQL database: `CREATE DATABASE ashrayos_db;`
   - Import the provided SQL schema file
   - Ensure all tables are created successfully

5. **Start the server:**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### 🖥️ Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd ../client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create `.env` file in client directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Application opens at `http://localhost:5173`

---

## 🎯 Key System Benefits

### For Students
- **24/7 Access**: Submit requests anytime, anywhere
- **Real-time Tracking**: Monitor request status instantly
- **Digital Records**: Maintain complete history of all activities
- **Efficient Communication**: Direct communication with wardens

### For Wardens
- **Centralized Management**: Handle all requests from one dashboard
- **Quick Processing**: Streamlined approval workflows
- **Student Oversight**: Complete visibility into student activities
- **Report Generation**: Generate detailed reports for administration

### For Administrators
- **System Overview**: Bird's-eye view of entire hostel operations
- **User Management**: Complete control over system users
- **Analytics**: Comprehensive reporting and analytics
- **Scalability**: Easy to scale across multiple hostels

---

## 🔒 Security & Privacy

- **Role-based Access**: Strict permission controls for different user types
---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Submit a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for complete details.

---

## ✨ Acknowledgments

**Developed with ❤️ by [Nidhi Dodiya](https://github.com/nidhidodiya1014)**

---

## 🔗 Links & Resources

- **GitHub Repository**: [AshrayOS](https://github.com/nidhidodiya1014/AshrayOS)
---

*Last Updated: June 26, 2025*

**⭐ If you find AshrayOS helpful, please consider giving it a star on GitHub!**
```

