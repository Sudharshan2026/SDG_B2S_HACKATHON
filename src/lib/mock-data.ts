import type { Scheme, Utility, Outage, Alert, NewsPost, Complaint, Official, Department, District } from './types';

export const districts: District[] = [
  { id: 'd1', name: 'Sample District', state: 'Sample State', type: 'urban' },
];

export const departments: Department[] = [
  { id: 'dept1', districtId: 'd1', name: 'Municipal Corporation', code: 'MC' },
  { id: 'dept2', districtId: 'd1', name: 'Electricity Board', code: 'EB' },
  { id: 'dept3', districtId: 'd1', name: 'Water Supply', code: 'WS' },
  { id: 'dept4', districtId: 'd1', name: 'Public Works', code: 'PWD' },
];

export const officials: Official[] = [
  { id: 'o1', departmentId: 'dept1', name: 'Rajesh Kumar', designation: 'Municipal Commissioner', phone: '+91 98765 43210', email: 'commissioner@sample.gov.in', officeHours: '9 AM - 5 PM' },
  { id: 'o2', departmentId: 'dept2', name: 'Priya Sharma', designation: 'AE (Electricity)', phone: '+91 98765 43211', email: 'electricity@sample.gov.in', officeHours: '10 AM - 6 PM' },
  { id: 'o3', departmentId: 'dept3', name: 'Amit Singh', designation: 'JE (Water)', phone: '+91 98765 43212', email: 'water@sample.gov.in', officeHours: '8 AM - 4 PM' },
];

export const schemes: Scheme[] = [
  {
    id: 's1',
    districtId: 'd1',
    title: 'State Merit Scholarship',
    description: 'Financial aid for meritorious students pursuing higher education.',
    category: 'education',
    eligibility: { maxIncome: 500000, minAge: 18 },
    benefits: ['Rs 10,000 per year', 'Renewable for 3 years'],
    documents: ['Aadhaar', 'Income certificate', 'Marksheet'],
    startDate: '2025-04-01',
    endDate: '2025-12-31',
    status: 'active',
  },
  {
    id: 's2',
    districtId: 'd1',
    title: 'PM-KISAN',
    description: 'Income support for farmers.',
    category: 'agriculture',
    eligibility: { landHolder: true },
    benefits: ['Rs 6,000 per year in 3 installments'],
    documents: ['Land records', 'Aadhaar', 'Bank account'],
    startDate: '2024-01-01',
    endDate: '2025-03-31',
    status: 'active',
  },
  {
    id: 's3',
    districtId: 'd1',
    title: 'Ayushman Bharat',
    description: 'Health insurance cover of Rs 5 lakh per family.',
    category: 'health',
    eligibility: { annualIncome: 120000 },
    benefits: ['Rs 5 lakh coverage', 'Cashless treatment'],
    documents: ['Aadhaar', 'Ration card'],
    startDate: '2023-09-01',
    endDate: '2024-12-31',
    status: 'expired',
  },
];

const defaultUtilities: Utility[] = [
  { id: 'u1', districtId: 'd1', type: 'electricity', schedule: '24 hours (with load shedding 2-4 PM)', status: 'normal', updatedAt: new Date().toISOString() },
  { id: 'u2', districtId: 'd1', wardId: 'w1', type: 'water', schedule: '6-8 AM, 5-7 PM', status: 'normal', updatedAt: new Date().toISOString() },
];

export const utilities = defaultUtilities;

export const UTILITIES_STORAGE_KEY = 'hometown-admin-utilities-demo';

export function getUtilities(): Utility[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(UTILITIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return [parsed.electricity || defaultUtilities[0], parsed.water || defaultUtilities[1]].filter(Boolean);
      }
    } catch (error) {
      console.error('Error loading utilities from localStorage:', error);
    }
  }
  return [...defaultUtilities];
}

export const outages: Outage[] = [
  { id: 'out1', utilityId: 'u1', type: 'planned', startTime: '2025-02-20T02:00:00', endTime: '2025-02-20T05:00:00', reason: 'Line maintenance', isPlanned: true },
];

export const alerts: Alert[] = [
  { id: 'a1', districtId: 'd1', type: 'maintenance', title: 'Water supply disruption', message: 'Ward 5 will have reduced water supply on Feb 21 for pipeline repair.', severity: 'warning', startAt: new Date().toISOString(), endAt: '2025-02-21T18:00:00' },
];

export const newsPosts: NewsPost[] = [
  { id: 'n1', districtId: 'd1', title: 'New vegetable market opens in Ward 3', content: 'A new government-run vegetable market has opened near the bus stand. Open 6 AM - 8 PM daily.', category: 'business', isVerified: true, status: 'published', createdAt: '2025-02-18T10:00:00' },
  { id: 'n2', districtId: 'd1', title: 'Cultural fair this weekend', content: 'Annual cultural fair at Town Hall, Feb 22-23. Free entry.', category: 'event', isVerified: true, status: 'published', createdAt: '2025-02-17T14:00:00' },
  { id: 'n3', districtId: 'd1', title: 'Property tax payment deadline', content: 'Last date for property tax payment: March 15, 2025. Avoid late fees.', category: 'notice', isVerified: true, status: 'published', createdAt: '2025-02-16T09:00:00' },
];

// Use in-memory + localStorage for demo
const STORAGE_KEY = 'hometown-connect-demo';
let complaintsData: Complaint[] = [
  {
    id: 'c1',
    ticketId: 'HC-D1-20250219-0001',
    districtId: 'd1',
    departmentId: 'dept1',
    description: 'Street light not working near Main Market',
    category: 'infrastructure',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'o1',
    createdAt: '2025-02-19T10:30:00',
    timeline: [
      { id: 'cl1', statusFrom: 'pending', statusTo: 'in_progress', note: 'Team dispatched', createdAt: '2025-02-19T14:00:00' },
    ],
  },
];

export function getComplaints(): Complaint[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading complaints from localStorage:', error);
    }
  }
  return [...complaintsData];
}

export function setComplaints(data: Complaint[]) {
  complaintsData = data;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving complaints to localStorage:', error);
    }
  }
}

export function addComplaint(c: Omit<Complaint, 'id' | 'ticketId' | 'timeline'>): Complaint {
  // 1. Validate required fields and types
  if (!c.districtId || typeof c.districtId !== 'string') throw new Error('Invalid districtId');
  if (!c.departmentId || typeof c.departmentId !== 'string') throw new Error('Invalid departmentId');
  if (!c.description || typeof c.description !== 'string') throw new Error('Invalid description');
  if (!c.category || typeof c.category !== 'string') throw new Error('Invalid category');
  if (!c.status || typeof c.status !== 'string') throw new Error('Invalid status');
  if (!c.priority || typeof c.priority !== 'string') throw new Error('Invalid priority');

  // 2. Validate district existence
  const district = districts.find(d => d.id === c.districtId);
  if (!district) throw new Error(`District with ID ${c.districtId} not found`);

  // 3. Validate department existence and relation to district
  const dept = departments.find(d => d.id === c.departmentId);
  if (!dept) throw new Error(`Department with ID ${c.departmentId} not found`);
  if (dept.districtId !== c.districtId) {
    throw new Error(`Department ${c.departmentId} does not belong to district ${c.districtId}`);
  }

  // 4. Sanitize and validate description
  const trimmedDescription = c.description.trim();
  if (trimmedDescription.length < 10) {
    throw new Error('Description must be at least 10 characters long');
  }
  if (trimmedDescription.length > 2000) {
    throw new Error('Description must be at most 2000 characters long');
  }

  // 5. Validate status and priority values
  const validStatuses: Complaint['status'][] = ['pending', 'in_progress', 'resolved', 'closed', 'escalated'];
  if (!validStatuses.includes(c.status)) throw new Error('Invalid complaint status');

  const validPriorities: Complaint['priority'][] = ['low', 'medium', 'high'];
  if (!validPriorities.includes(c.priority)) throw new Error('Invalid complaint priority');

  const list = getComplaints();
  const seq = String(list.length + 1).padStart(4, '0');
  const ticketId = `HC-${c.districtId.toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${seq}`;

  const now = new Date().toISOString();
  const newComplaint: Complaint = {
    ...c,
    description: trimmedDescription,
    id: `c${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    ticketId,
    createdAt: now,
    timeline: [{
      id: `cl${Date.now()}`,
      statusFrom: 'pending',
      statusTo: 'pending',
      createdAt: now
    }],
  };

  list.push(newComplaint);
  setComplaints(list);
  return newComplaint;
}

export function updateComplaintStatus(ticketId: string, newStatus: Complaint['status'], note?: string): Complaint | null {
  const list = getComplaints();
  const idx = list.findIndex((c) => c.ticketId === ticketId);
  if (idx === -1) return null;
  const prev = list[idx];
  list[idx] = {
    ...prev,
    status: newStatus,
    timeline: [
      ...prev.timeline,
      { id: `cl${Date.now()}`, statusFrom: prev.status, statusTo: newStatus, note, createdAt: new Date().toISOString() },
    ],
    resolvedAt: newStatus === 'resolved' || newStatus === 'closed' ? new Date().toISOString() : prev.resolvedAt,
  };
  setComplaints(list);
  return list[idx];
}
