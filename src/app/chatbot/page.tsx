'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { addComplaint, getComplaints } from '@/lib/mock-data';
import { departments } from '@/lib/mock-data';
import { Send, Ticket, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const { panel } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your Hometown Connect assistant. Ask about schemes, utilities, officials, or file a complaint.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'chat' | 'complaint' | 'track'>('chat');

  useEffect(() => {
    if (searchParams.get('action') === 'complaint') setMode('complaint');
    if (searchParams.get('track') === '1') setMode('track');
  }, [searchParams]);
  const [trackTicketId, setTrackTicketId] = useState('');
  const [trackResult, setTrackResult] = useState<ReturnType<typeof getComplaints>[0] | null>(null);
  const [complaintForm, setComplaintForm] = useState({
    description: '',
    category: 'infrastructure',
    departmentId: 'dept1',
  });
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: trimmed, 
      timestamp: new Date() 
    };
    
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the LangChain API with xAI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();

      if (data.success && data.message) {
        const botMsg: Message = { 
          id: `b-${Date.now()}`, 
          role: 'assistant', 
          content: data.message, 
          timestamp: new Date() 
        };
        setMessages((m) => [...m, botMsg]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = { 
        id: `e-${Date.now()}`, 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please ensure the XAI_API_KEY is configured correctly.', 
        timestamp: new Date() 
      };
      setMessages((m) => [...m, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrack = () => {
    const id = trackTicketId.trim();
    if (!id) return;
    const list = getComplaints();
    const found = list.find((c) => c.ticketId.toUpperCase() === id.toUpperCase());
    setTrackResult(found || null);
  };

  const handleSubmitComplaint = () => {
    if (!complaintForm.description.trim()) return;
    try {
      const complaint = addComplaint({
        districtId: 'd1',
        departmentId: complaintForm.departmentId,
        description: complaintForm.description.trim(),
        category: complaintForm.category,
        status: 'pending',
        priority: 'medium',
        createdAt: new Date().toISOString(),
      });
      setSubmittedTicket(complaint.ticketId);
    } catch (error) {
      console.error('Failed to submit complaint:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit complaint');
    }
  };

  if (panel !== 'user') {
    return (
      <div className="py-6 text-slate-600">
        Switch to User panel to use the chatbot and submit complaints.
      </div>
    );
  }

  // Track mode
  if (mode === 'track') {
    return (
      <div className="space-y-4 pb-6">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('chat'); setTrackResult(null); setTrackTicketId(''); }}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            ← Back to Chat
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter Ticket ID</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={trackTicketId}
              onChange={(e) => setTrackTicketId(e.target.value)}
              placeholder="e.g. HC-D1-20250219-0001"
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
            />
            <button
              onClick={handleTrack}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium"
            >
              Track
            </button>
          </div>
        </div>
        {trackResult && (
          <div className="p-4 rounded-lg bg-white border border-slate-200">
            <p className="font-mono text-sm text-slate-600">{trackResult.ticketId}</p>
            <p className="font-medium text-slate-900 mt-2">{trackResult.description}</p>
            <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
              trackResult.status === 'resolved' || trackResult.status === 'closed' ? 'bg-green-100 text-green-700' :
              trackResult.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {trackResult.status.replace('_', ' ')}
            </span>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-slate-600">Timeline</p>
              {trackResult.timeline.map((t) => (
                <div key={t.id} className="text-sm text-slate-500">
                  {new Date(t.createdAt).toLocaleString()} — {t.statusTo.replace('_', ' ')}
                  {t.note && <span className="block text-slate-600">{t.note}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* {trackResult === null && trackTicketId && (
          <p className="text-amber-600 flex items-center gap-2">
            <AlertCircle size={18} />
            No complaint found with this ticket ID.
          </p>
        )} */}
      </div>
    );
  }

  // Complaint form mode
  if (mode === 'complaint' || submittedTicket) {
    if (submittedTicket) {
      return (
        <div className="p-6 rounded-lg bg-green-50 border border-green-200 text-center">
          <Ticket size={48} className="mx-auto text-green-600 mb-4" />
          <h2 className="font-semibold text-slate-900">Complaint Registered</h2>
          <p className="font-mono text-slate-700 font-mono mt-2">{submittedTicket}</p>
          <p className="text-sm text-slate-600 mt-2">Use this ID to track your complaint status.</p>
          <button
            onClick={() => { setMode('chat'); setSubmittedTicket(null); setComplaintForm({ description: '', category: 'infrastructure', departmentId: 'dept1' }); }}
            className="mt-4 px-4 py-2 rounded-lg bg-slate-700 text-white font-medium"
          >
            Back to Chat
          </button>
          <button
            onClick={() => { setMode('track'); setTrackTicketId(submittedTicket); setSubmittedTicket(null); }}
            className="mt-4 ml-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200"
          >
            Track Status
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4 pb-6">
        <button onClick={() => setMode('chat')} className="text-sm text-slate-600 hover:text-slate-800">← Back to Chat</button>
        <h2 className="font-semibold text-slate-900">Submit Complaint</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
          <textarea
            value={complaintForm.description}
            onChange={(e) => setComplaintForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Describe the issue in detail..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={complaintForm.category}
            onChange={(e) => setComplaintForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
          >
            <option value="infrastructure">Infrastructure</option>
            <option value="utilities">Utilities</option>
            <option value="sanitation">Sanitation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
          <select
            value={complaintForm.departmentId}
            onChange={(e) => setComplaintForm((f) => ({ ...f, departmentId: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmitComplaint}
          disabled={!complaintForm.description.trim()}
          className="w-full py-3 rounded-lg bg-slate-700 text-white font-medium disabled:opacity-50"
        >
          Submit Complaint
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] pb-6">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setMode('track')}
          className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600"
        >
          Track Ticket
        </button>
        <button
          onClick={() => setMode('complaint')}
          className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700"
        >
          File Complaint
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                m.role === 'user'
                  ? 'bg-slate-700 text-white rounded-br-md'
                  : 'bg-slate-100 text-slate-900 rounded-bl-md'
              }`}
            >
              <p className="text-sm">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-4 py-2 rounded-2xl bg-slate-100 text-slate-900 rounded-bl-md">
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2 pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="Ask about schemes, utilities, officials..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-lg bg-slate-700 text-white disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
