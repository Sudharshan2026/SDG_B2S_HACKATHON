# Hometown Connect - Project Workflow Documentation

## 📋 Project Overview

**Name:** Hometown Connect  
**Type:** Civic-Tech Platform  
**Purpose:** Helps people living outside their native district stay connected to their hometown through hyperlocal information, public service updates, and complaint management.

**Tech Stack:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- Local Storage (Demo Data Persistence)

---

## 🏗️ Architecture Overview

### Three-Panel System (No Login Required)
1. **User Panel** - Citizens accessing services
2. **Admin Panel** - Department officials managing utilities and complaints
3. **Super Admin Panel** - Master data and content moderation

### Key Design Patterns
- **Client-Side State Management** - React Context API (`AppProvider` in store.tsx)
- **Mock Data Layer** - Simulated backend with localStorage persistence
- **Panel-Based Access Control** - UI switches based on selected panel
- **Route Protection** - Components check panel state and redirect accordingly

---

## 📂 Project Structure

```
SDG_B2S_HACKATHON/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing/Welcome page
│   │   ├── home/               # User dashboard
│   │   ├── schemes/            # Government schemes browser
│   │   ├── utilities/          # Utility status viewer
│   │   ├── news/               # Local news feed
│   │   ├── chatbot/            # AI assistant & complaint filing
│   │   ├── directory/          # Officials contact directory
│   │   ├── admin/              # Admin panel routes
│   │   │   ├── page.tsx        # Admin dashboard
│   │   │   ├── utilities/      # Update utility schedules
│   │   │   └── complaints/     # Manage assigned complaints
│   │   ├── super/              # Super admin routes
│   │   │   ├── page.tsx        # Super admin dashboard
│   │   │   ├── master/         # Master data management
│   │   │   ├── complaints/     # View all complaints
│   │   │   └── content/        # Content moderation
│   │   └── api/                # API routes
│   │       └── utilities/      # Utilities CRUD endpoint
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx      # Top navigation bar
│   │   │   ├── BottomNav.tsx   # Mobile bottom navigation
│   │   │   └── PanelSwitcher.tsx # Panel selection tabs
│   │   └── shared/             # Reusable components
│   │       ├── SearchBar.tsx   # Search input component
│   │       └── EmptyState.tsx  # Empty state placeholder
│   └── lib/
│       ├── types.ts            # TypeScript interfaces
│       ├── store.tsx           # Global state (Context API)
│       └── mock-data.ts        # Mock data & localStorage functions
└── Configuration files (next.config.js, tailwind.config.ts, etc.)
```

---

## 🔄 Complete Application Workflow

### Phase 1: Application Entry & Role Selection

#### Step 1: Landing Page (`/` or `/welcome`)
**File:** `src/app/page.tsx` or `src/app/welcome/page.tsx`

**Flow:**
1. User lands on welcome page
2. Sees platform overview and features
3. Three entry options displayed:
   - **Enter User Panel** → `/home`
   - **Enter Admin Panel** → `/admin`
   - **Enter Super Admin Panel** → `/super`
4. User selects their role (no authentication required for demo)

**Key Components:**
- Hero section with platform description
- Feature highlights (schemes, utilities, chatbot, etc.)
- Panel overview cards explaining each role

---

### Phase 2: User Panel Workflow

#### Step 2.1: User Dashboard (`/home`)
**File:** `src/app/home/page.tsx`

**Flow:**
1. User enters User Panel
2. Dashboard loads with:
   - Hero section with quick actions
   - Quick access grid (6 shortcuts):
     - Welfare Programs
     - Utilities
     - Local Updates
     - File Complaint
     - Authorities
     - AI Assistant
   - Active utility alerts
   - Featured schemes preview
3. User navigates to desired section

**State Management:**
- `useApp()` hook retrieves current panel
- Redirects if panel ≠ 'user'
- Mock data fetched from `lib/mock-data.ts`

---

#### Step 2.2: Schemes Section (`/schemes`)
**File:** `src/app/schemes/page.tsx`

**Flow:**
1. User clicks "Welfare Programs"
2. Schemes page displays:
   - Search bar (filters by title/description)
   - Category chips (all, education, health, agriculture, etc.)
   - Scheme cards with:
     - Title, description, category
     - Status badge (active/expired)
     - Bookmark icon
     - View Details button
3. User can:
   - Search schemes by keyword
   - Filter by category
   - Bookmark schemes (stored in localStorage)
4. Click scheme card → navigates to `/schemes/[id]`

**Detailed View** (`/schemes/[id]`)
**File:** `src/app/schemes/[id]/page.tsx`

**Displays:**
- Full scheme details
- Eligibility criteria
- Benefits list
- Required documents
- Application timeline
- Bookmark toggle

**Data Source:** `schemes` array from `lib/mock-data.ts`

---

#### Step 2.3: Utilities Section (`/utilities`)
**File:** `src/app/utilities/page.tsx`

**Flow:**
1. User clicks "Utilities"
2. Page fetches data from `/api/utilities`
3. Displays:
   - **Emergency Alerts** (if any)
     - Water supply disruptions
     - Maintenance notices
   - **Current Status Cards**
     - Electricity status (24hrs/load-shedding)
     - Water supply schedule (morning/evening)
     - Status indicator (Normal/Reduced/Outage)
     - Last updated timestamp
   - **Planned Outages**
     - Upcoming maintenance schedules
     - Reason and duration

**API Route:** `src/app/api/utilities/route.ts`
- GET: Fetches utilities from localStorage or defaults
- PUT: Updates utility data (Admin only)

**Data Flow:**
```
localStorage ← → API Route ← → React Component
```

---

#### Step 2.4: Local News (`/news`)
**File:** `src/app/news/page.tsx`

**Flow:**
1. User clicks "Local Updates"
2. Displays categorized news posts:
   - Events (cultural fairs, meetings)
   - Business (new shops, markets)
   - Notices (tax deadlines, holidays)
   - Offers (discounts, schemes)
3. Each post shows:
   - Title, content
   - Category badge
   - Verified badge (for official posts)
   - Timestamp

**Data Source:** `newsPosts` from `lib/mock-data.ts`

---

#### Step 2.5: Authorities Directory (`/directory`)
**File:** `src/app/directory/page.tsx`

**Flow:**
1. User clicks "Authorities"
2. Displays officials grouped by department:
   - Municipal Corporation
   - Electricity Board
   - Water Supply
   - Public Works
3. Each official card shows:
   - Name, designation
   - Phone number (clickable for call)
   - Email (clickable for mail)
   - Office hours

**Data Source:** `departments` and `officials` from `lib/mock-data.ts`

---

#### Step 2.6: AI Chatbot & Complaints (`/chatbot`)
**File:** `src/app/chatbot/page.tsx`

**Three Modes:**

##### A. Chat Mode (Default)
**Flow:**
1. User opens chatbot
2. Welcome message appears
3. User types queries about:
   - Government schemes
   - Electricity/water schedules
   - How to file complaints
   - Official contacts
4. Bot provides contextual responses
5. Suggests filing complaint if issue mentioned

**Bot Logic:**
- Pattern matching on keywords (scheme, electricity, water, complaint)
- Returns predefined responses
- Guides user to relevant sections

##### B. Complaint Filing Mode
**Flow:**
1. User clicks "File Complaint" or bot suggests it
2. Form displays:
   - **Description** (textarea)
   - **Category** (dropdown: infrastructure, utilities, sanitation, etc.)
   - **Department** (dropdown: auto-populated from master data)
3. User submits complaint
4. System generates ticket ID:
   - Format: `HC-D1-YYYYMMDD-XXXX`
   - Example: `HC-D1-20250219-0001`
5. Success screen shows:
   - Confirmation message
   - Ticket ID (copy-able)
   - Options: "Back to Chat" or "Track Status"

**Data Persistence:**
- New complaint added to localStorage
- Auto-assigned status: "pending"
- Timeline created with initial entry

##### C. Complaint Tracking Mode
**Flow:**
1. User enters ticket ID
2. System searches complaints in localStorage
3. If found, displays:
   - Ticket ID
   - Description
   - Current status badge
   - Complete timeline with:
     - Status changes
     - Admin notes
     - Timestamps
4. If not found, shows error message

**Complaint Statuses:**
- Pending (initial)
- In Progress (admin working)
- Resolved (fixed)
- Closed (completed)
- Escalated (moved to higher authority)

---

### Phase 3: Admin Panel Workflow

#### Step 3.1: Admin Dashboard (`/admin`)
**File:** `src/app/admin/page.tsx`

**Flow:**
1. Admin switches to Admin Panel via PanelSwitcher
2. Dashboard shows two main sections:
   - **Update Utilities** → `/admin/utilities`
   - **Manage Complaints** → `/admin/complaints`

**Panel Check:** Redirects if panel ≠ 'admin'

---

#### Step 3.2: Update Utilities (`/admin/utilities`)
**File:** `src/app/admin/utilities/page.tsx`

**Flow:**
1. Admin clicks "Update Utilities"
2. Page displays current utility data:
   - Electricity schedule & status
   - Water supply schedule & status
3. Each utility has edit form:
   - **Schedule** (text input)
   - **Status** (dropdown: Normal/Reduced/Outage)
4. Admin updates and saves
5. API call to `/api/utilities` (PUT method)
6. Success message displayed
7. Updated data reflected in User Panel immediately

**API Integration:**
```typescript
PUT /api/utilities
Body: { electricity: {...}, water: {...} }
Response: Updated utilities array
```

---

#### Step 3.3: Manage Complaints (`/admin/complaints`)
**File:** `src/app/admin/complaints/page.tsx`

**Flow:**
1. Admin clicks "Manage Complaints"
2. Displays complaints assigned to them:
   - Filterable by status
   - Sortable by priority/date
3. Each complaint card shows:
   - Ticket ID
   - Description
   - Priority badge
   - Current status
   - Created date
4. Admin clicks complaint → Detail view opens:
   - Full description
   - Timeline history
   - Status update dropdown
   - Add note (textarea)
   - Save button
5. Admin updates status/adds note
6. Timeline automatically updated
7. User can see update via complaint tracking

**Update Flow:**
```
Admin submits → localStorage updated → Timeline entry added → User sees in /chatbot?track=1
```

---

### Phase 4: Super Admin Panel Workflow

#### Step 4.1: Super Admin Dashboard (`/super`)
**File:** `src/app/super/page.tsx`

**Flow:**
1. Super Admin switches to Super Panel
2. Dashboard shows three sections:
   - **Master Data** → `/super/master`
   - **All Complaints** → `/super/complaints`
   - **Content Moderation** → `/super/content`

---

#### Step 4.2: Master Data Management (`/super/master`)
**File:** `src/app/super/master/page.tsx`

**Flow:**
1. Super Admin clicks "Master Data"
2. Three tabs displayed:
   - **Districts** - Add/edit/delete districts
   - **Departments** - Manage departments per district
   - **Officials** - Add government officials with contact info
3. CRUD operations for each:
   - Create new entries
   - Edit existing data
   - Delete (with confirmation)
4. Data stored in localStorage
5. Immediately available for Users and Admins

**Data Models:**
- District: id, name, state, type
- Department: id, districtId, name, code
- Official: id, departmentId, name, designation, contact

---

#### Step 4.3: All Complaints View (`/super/complaints`)
**File:** `src/app/super/complaints/page.tsx`

**Flow:**
1. Super Admin clicks "All Complaints"
2. Displays ALL complaints system-wide:
   - Filter by department
   - Filter by status
   - Search by ticket ID/description
3. For each complaint:
   - View full details
   - Escalate to higher department
   - Reassign to different admin
   - Close manually
4. System-wide analytics:
   - Total complaints
   - Resolution rate
   - Average resolution time

---

#### Step 4.4: Content Moderation (`/super/content`)
**File:** `src/app/super/content/page.tsx`

**Flow:**
1. Super Admin clicks "Content Moderation"
2. Reviews pending news posts:
   - Unverified community posts
   - User-submitted news
3. For each post:
   - Read content
   - Verify authenticity
   - Approve → Mark as verified & publish
   - Reject → Delete or return for revision
4. Manage alerts and announcements:
   - Create new alerts
   - Set severity (info/warning/critical)
   - Schedule start/end dates

---

## 🎨 UI Components & Navigation

### Global Components

#### Header (`components/layout/Header.tsx`)
**Always Visible:**
- App logo/title
- Current location/district
- Notification icon (future feature)

#### PanelSwitcher (`components/layout/PanelSwitcher.tsx`)
**Functionality:**
- Three tabs: User / Admin / Super
- Changes global panel state via `setPanel()`
- Active panel highlighted
- No page reload, instant state change

**Implementation:**
```tsx
const { panel, setPanel } = useApp();
<button onClick={() => setPanel('user')}>User</button>
```

#### BottomNav (`components/layout/BottomNav.tsx`)
**Appears in User Panel:**
- Home
- Schemes
- Utilities
- News
- Chatbot
- Active route highlighted

---

## 💾 Data Management

### State Management (React Context)
**File:** `src/lib/store.tsx`

**Global State:**
```typescript
interface AppState {
  panel: Panel;              // Current panel: 'user' | 'admin' | 'super'
  setPanel: (p: Panel) => void;
  bookmarks: string[];       // Bookmarked scheme IDs
  toggleBookmark: (id: string) => void;
}
```

**Usage:**
```tsx
const { panel, bookmarks, toggleBookmark } = useApp();
```

### Local Storage Keys
- `hometown-bookmarks` - User's bookmarked schemes
- `hometown-connect-demo` - All complaints data
- `hometown-admin-utilities-demo` - Utility schedules

### Mock Data Layer (`lib/mock-data.ts`)
**Functions:**
- `getComplaints()` - Fetch all complaints
- `setComplaints(data)` - Update complaints
- `addComplaint(c)` - Create new complaint with ticket ID
- `getUtilities()` - Fetch utility schedules
- Export arrays: schemes, alerts, newsPosts, officials, departments

---

## 🔍 Key Features Implementation

### 1. Complaint Ticket Generation
**Logic:**
```typescript
const date = new Date();
const dateStr = date.getFullYear() + 
                String(date.getMonth() + 1).padStart(2, '0') + 
                String(date.getDate()).padStart(2, '0');
const count = existingComplaints.length + 1;
const ticketId = `HC-D1-${dateStr}-${String(count).padStart(4, '0')}`;
// Result: HC-D1-20250219-0001
```

### 2. Scheme Bookmarking
**Flow:**
```typescript
// Toggle bookmark
toggleBookmark(schemeId);

// In store.tsx
const newBookmarks = bookmarks.includes(id) 
  ? bookmarks.filter(b => b !== id) 
  : [...bookmarks, id];
localStorage.setItem('hometown-bookmarks', JSON.stringify(newBookmarks));
```

### 3. Utility Status Updates
**Flow:**
```
Admin edits → Form submission → PUT /api/utilities → localStorage update → User sees change
```

### 4. Panel-Based Access Control
**Implementation:**
```tsx
if (panel !== 'user') {
  return <div>Switch to User panel to view this page.</div>;
}
```

---

## 🚀 Running the Application

### Installation
```bash
cd SDG_B2S_HACKATHON
npm install
```

### Development
```bash
npm run dev
```
Opens at: `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

---

## 📊 Data Flow Diagrams

### User Files Complaint Flow
```
User → Chatbot (/chatbot?action=complaint)
  ↓
Fills Form (description, category, department)
  ↓
Submit → addComplaint() in mock-data.ts
  ↓
Generate Ticket ID (HC-D1-YYYYMMDD-XXXX)
  ↓
Save to localStorage ('hometown-connect-demo')
  ↓
Add initial timeline entry (status: pending)
  ↓
Show success screen with ticket ID
  ↓
User can track via /chatbot?track=1
```

### Admin Updates Complaint Flow
```
Admin → /admin/complaints
  ↓
Select complaint from assigned list
  ↓
Update status dropdown (pending → in_progress)
  ↓
Add note (e.g., "Team dispatched")
  ↓
Submit → Creates timeline entry
  ↓
Update localStorage
  ↓
User sees update in complaint tracking (real-time)
```

### Utility Update Flow
```
Admin → /admin/utilities
  ↓
Edit electricity/water schedule
  ↓
Change status (normal/reduced/outage)
  ↓
Submit → PUT /api/utilities
  ↓
API updates localStorage
  ↓
User → /utilities sees updated info (on next page load)
```

---

## 🎯 User Journeys

### Journey 1: Citizen Checking Schemes
1. Land on welcome page (`/`)
2. Click "Enter User Panel"
3. Navigate to "Welfare Programs"
4. Search "scholarship"
5. Filter by "education" category
6. Click scheme card → View full details
7. Bookmark scheme for later
8. Scheme ID saved to localStorage

### Journey 2: Citizen Filing Complaint
1. User Panel → Click "File Complaint"
2. AI Chatbot opens (`/chatbot?action=complaint`)
3. Fill description: "Street light broken at Main Market"
4. Select category: "Infrastructure"
5. Select department: "Municipal Corporation"
6. Submit
7. Receive ticket ID: `HC-D1-20250219-0001`
8. Copy ticket ID for tracking

### Journey 3: Citizen Tracking Complaint
1. User Panel → Chatbot
2. Click "Track Complaint"
3. Enter ticket ID: `HC-D1-20250219-0001`
4. View status: "In Progress"
5. See timeline:
   - Complaint filed (Feb 19, 10:30 AM)
   - Admin assigned (Feb 19, 2:00 PM)
   - Team dispatched (Feb 19, 3:00 PM)

### Journey 4: Admin Managing Complaint
1. Switch to Admin Panel
2. Navigate to "Manage Complaints"
3. See assigned complaints list
4. Click complaint `HC-D1-20250219-0001`
5. Review details
6. Update status: "Pending" → "In Progress"
7. Add note: "Electrician team assigned"
8. Save
9. User can now see update when tracking

### Journey 5: Admin Updating Utilities
1. Switch to Admin Panel
2. Navigate to "Update Utilities"
3. Edit electricity schedule
4. Change status to "Reduced" (load shedding)
5. Update schedule: "Available except 2-4 PM"
6. Save
7. All users see updated schedule in `/utilities`

### Journey 6: Super Admin Managing Master Data
1. Switch to Super Admin Panel
2. Navigate to "Master Data"
3. Go to "Officials" tab
4. Click "Add New Official"
5. Enter details:
   - Name: "Dr. Anita Desai"
   - Designation: "Health Officer"
   - Department: "Municipal Corporation"
   - Phone: "+91 98765 43213"
   - Email: "health@sample.gov.in"
6. Save
7. New official appears in User Panel's "Authorities" directory

---

## 🔐 Security & Future Enhancements

### Current Demo Limitations
- No real authentication (panel switching instead)
- Data stored in browser localStorage (not persistent across devices)
- No backend server (all operations client-side)

### Future Production Features
1. **Authentication**
   - Firebase Auth / Auth0
   - Role-based access control
   - JWT tokens

2. **Backend Integration**
   - Express.js / Nest.js API
   - PostgreSQL / MongoDB database
   - File uploads for complaint photos

3. **Real-time Updates**
   - WebSocket for live notifications
   - Push notifications via FCM
   - Email/SMS alerts

4. **Advanced Features**
   - Multi-language support (i18n)
   - GIS integration for location-based services
   - Analytics dashboard for Super Admins
   - Mobile app (React Native)

---

## 🐛 Troubleshooting

### Common Issues

**Issue 1: Bookmarks not persisting**
- **Cause:** localStorage disabled in browser
- **Solution:** Check browser privacy settings, enable localStorage

**Issue 2: Complaints not showing in Admin panel**
- **Cause:** Panel state not updated
- **Solution:** Refresh page or toggle panel switcher

**Issue 3: Utilities not updating immediately**
- **Cause:** Client-side cache
- **Solution:** Reload `/utilities` page after admin updates

---

## 📝 Development Notes

### Adding New Features

#### Add a New Page
1. Create file: `src/app/new-page/page.tsx`
2. Add route to BottomNav or navigation links
3. Implement panel check if needed
4. Add to this workflow document

#### Add New Data Type
1. Define interface in `src/lib/types.ts`
2. Add mock data to `src/lib/mock-data.ts`
3. Create CRUD functions with localStorage
4. Build UI pages for User/Admin/Super panels

#### Add API Route
1. Create `src/app/api/resource/route.ts`
2. Export GET, POST, PUT, DELETE handlers
3. Integrate with frontend fetch calls

---

## 📞 Project Contacts & Resources

### Documentation Links
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

### Key Files for Reference
- **Types:** `src/lib/types.ts`
- **State:** `src/lib/store.tsx`
- **Data:** `src/lib/mock-data.ts`
- **Config:** `next.config.js`, `tailwind.config.ts`

---

## 🎓 Learning Outcomes

This project demonstrates:
1. ✅ Next.js 14 App Router architecture
2. ✅ Client-side state management with Context API
3. ✅ TypeScript interfaces and type safety
4. ✅ localStorage for data persistence
5. ✅ API Routes in Next.js
6. ✅ Responsive design with Tailwind CSS
7. ✅ Component composition and reusability
8. ✅ Panel-based access control pattern
9. ✅ Mock data layer simulating backend
10. ✅ User journey mapping and UI/UX flows

---

## 📅 Version History

- **v1.0.0** (February 2025) - Initial demo release
  - Three-panel system
  - Schemes, utilities, news, chatbot
  - Complaint management
  - Master data CRUD

---

## ✅ Conclusion

**Hometown Connect** is a complete civic engagement platform showcasing modern web development practices. The three-panel architecture allows seamless role switching, making it perfect for demos and POCs. The workflow is designed to be intuitive for citizens while providing powerful tools for administrators.

For questions or contributions, refer to the codebase structure outlined in this document.

---

**End of Workflow Documentation**
