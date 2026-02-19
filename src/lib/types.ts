export type Panel = 'user' | 'admin' | 'super';

export interface District {
  id: string;
  name: string;
  state: string;
  type: 'urban' | 'rural';
}

export interface Department {
  id: string;
  districtId: string;
  name: string;
  code: string;
}

export interface Official {
  id: string;
  departmentId: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  officeHours: string;
}

export interface Scheme {
  id: string;
  districtId: string;
  title: string;
  description: string;
  category: string;
  eligibility: Record<string, unknown>;
  benefits: string[];
  documents: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
}

export interface Utility {
  id: string;
  districtId: string;
  wardId?: string;
  type: 'electricity' | 'water';
  schedule: string;
  status: 'normal' | 'reduced' | 'outage';
  updatedAt: string;
}

export interface Outage {
  id: string;
  utilityId: string;
  type: string;
  startTime: string;
  endTime: string;
  reason: string;
  isPlanned: boolean;
}

export interface Alert {
  id: string;
  districtId: string;
  type: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  startAt: string;
  endAt?: string;
}

export interface NewsPost {
  id: string;
  districtId: string;
  title: string;
  content: string;
  category: 'event' | 'business' | 'notice' | 'offer' | 'general';
  mediaUrls?: string[];
  isVerified: boolean;
  status: 'published' | 'pending';
  createdAt: string;
}

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'closed' | 'escalated';

export interface Complaint {
  id: string;
  ticketId: string;
  districtId: string;
  departmentId: string;
  description: string;
  category: string;
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  createdBy?: string;
  createdAt: string;
  resolvedAt?: string;
  timeline: ComplaintLog[];
}

export interface ComplaintLog {
  id: string;
  statusFrom: ComplaintStatus;
  statusTo: ComplaintStatus;
  note?: string;
  createdAt: string;
}
