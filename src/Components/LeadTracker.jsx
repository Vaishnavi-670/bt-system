import React, { useEffect, useState } from "react";
import "./LeadTracker.css";

const STORAGE_KEY = "leadTrackerData";

const STATUS_OPTIONS = [
  "New Lead",
  "Contacted",
  "Interested",
  "Proposal Sent",
  "Negotiation",
  "Follow-up Required",
  "On Hold",
  "Converted / Won",
  "Lost",
  "Inactive / No Response",
];

const FOLLOWUP_METHODS = ["Call", "Email", "Meeting", "WhatsApp", "Other"];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const emptyLead = () => ({
  id: null,
  customerName: "",
  contactPerson: "",
  contactInfo: "",
  leadSource: "",
  industry: "",
  leadDate: todayISO(),
  assignedTo: "",
  status: "New Lead",
  followUpDate: "",
  followUpMethod: "",
  lastContactDate: "",
  notes: "",
  comments: [],
  potentialValue: "",
  probability: "",
  expectedCloseDate: "",
  finalOutcome: "",
  remarks: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

function createSample() {
  return [
    {
      id: uid(),
      customerName: "ABC Technologies Pvt. Ltd.",
      contactPerson: "John Smith",
      contactInfo: "john.smith@abctech.com / +1 555-1234",
      leadSource: "Website",
      industry: "IT Services",
      leadDate: todayISO(),
      assignedTo: "Anita",
      status: "Contacted",
      followUpDate: "",
      followUpMethod: "Email",
      lastContactDate: todayISO(),
      notes: "Initial enquiry about X product.",
      comments: [{ id: uid(), date: new Date().toISOString(), text: "Sent product brochure", method: "Email" }],
      potentialValue: "12000",
      probability: "40",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "Green Manufacturing",
      contactPerson: "Sarah Johnson",
      contactInfo: "sarah@greenmfg.com / +1 555-9876",
      leadSource: "Referral",
      industry: "Manufacturing",
      leadDate: todayISO(),
      assignedTo: "Ravi",
      status: "Interested",
      followUpDate: "",
      followUpMethod: "Call",
      lastContactDate: todayISO(),
      notes: "Asked for pricing and delivery details",
      comments: [{ id: uid(), date: new Date().toISOString(), text: "Booked a demo for next week", method: "Meeting" }],
      potentialValue: "45000",
      probability: "60",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "Seaside Retailers",
      contactPerson: "Meera Patel",
      contactInfo: "meera@seasideretail.com / +44 20 7946 0000",
      leadSource: "Trade Show",
      industry: "Retail",
      leadDate: todayISO(),
      assignedTo: "Arjun",
      status: "Proposal Sent",
      followUpDate: "",
      followUpMethod: "Email",
      lastContactDate: todayISO(),
      notes: "Requested customized pricing and SKU mapping",
      comments: [],
      potentialValue: "30000",
      probability: "50",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "High priority",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "BlueFin Logistics",
      contactPerson: "Tom Harris",
      contactInfo: "tom.h@bluefinlog.com / +1 415-555-0199",
      leadSource: "Cold Call",
      industry: "Logistics",
      leadDate: todayISO(),
      assignedTo: "Sneha",
      status: "Negotiation",
      followUpDate: "",
      followUpMethod: "Call",
      lastContactDate: todayISO(),
      notes: "Negotiating SLA and support terms",
      comments: [{ id: uid(), date: new Date().toISOString(), text: "Clarified support hours", method: "Call" }],
      potentialValue: "85000",
      probability: "70",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "Legal review pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "NorthStar Energy",
      contactPerson: "Liu Wei",
      contactInfo: "liu.wei@northstar.energy / +86 10 5555 1212",
      leadSource: "Partner",
      industry: "Energy",
      leadDate: todayISO(),
      assignedTo: "Dev",
      status: "Follow-up Required",
      followUpDate: todayISO(),
      followUpMethod: "WhatsApp",
      lastContactDate: todayISO(),
      notes: "Requested technical architecture overview",
      comments: [],
      potentialValue: "200000",
      probability: "30",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "Requires engineering input",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "Vivid Media House",
      contactPerson: "Alex Morgan",
      contactInfo: "alex@vividmedia.co / +61 2 5550 0000",
      leadSource: "Email Campaign",
      industry: "Media",
      leadDate: todayISO(),
      assignedTo: "Lisa",
      status: "New Lead",
      followUpDate: "",
      followUpMethod: "Email",
      lastContactDate: "",
      notes: "Downloaded whitepaper; to qualify",
      comments: [],
      potentialValue: "6000",
      probability: "20",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "Potential for cross-sell",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "Summit Healthcare",
      contactPerson: "Dr. Priya Singh",
      contactInfo: "priya.s@summithealth.org / +91 98765 43210",
      leadSource: "Referral",
      industry: "Healthcare",
      leadDate: todayISO(),
      assignedTo: "Anita",
      status: "Converted / Won",
      followUpDate: "",
      followUpMethod: "Meeting",
      lastContactDate: todayISO(),
      notes: "Signed a pilot contract",
      comments: [{ id: uid(), date: new Date().toISOString(), text: "Contract signed - onboarding scheduled", method: "Email" }],
      potentialValue: "150000",
      probability: "100",
      expectedCloseDate: todayISO(),
      finalOutcome: "Won",
      remarks: "Onboarding in progress",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "Evergreen Farms",
      contactPerson: "Carlos Diaz",
      contactInfo: "carlos@evergreen.ag / +52 55 1234 5678",
      leadSource: "Website",
      industry: "Agriculture",
      leadDate: todayISO(),
      assignedTo: "Ravi",
      status: "Lost",
      followUpDate: "",
      followUpMethod: "Call",
      lastContactDate: todayISO(),
      notes: "Chose competitor due to pricing",
      comments: [],
      potentialValue: "22000",
      probability: "0",
      expectedCloseDate: "",
      finalOutcome: "Lost",
      remarks: "Keep for future nurture",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      customerName: "MetroBank Financials",
      contactPerson: "Karen Blake",
      contactInfo: "karen.blake@metrobank.com / +1 212-555-0100",
      leadSource: "Conference",
      industry: "Finance",
      leadDate: todayISO(),
      assignedTo: "Tom",
      status: "On Hold",
      followUpDate: "",
      followUpMethod: "Email",
      lastContactDate: "",
      notes: "Procurement freeze until Q3",
      comments: [],
      potentialValue: "500000",
      probability: "10",
      expectedCloseDate: "",
      finalOutcome: "",
      remarks: "Revisit next quarter",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export default function LeadTracker() {
  const [leads, setLeads] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const [form, setForm] = useState(emptyLead());

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse leads from storage", e);
      }
    }
    setLeads(createSample());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to save leads", e);
    }
  }, [leads]);

  function openNew() {
    setForm(emptyLead());
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(lead) {
    setForm({ ...lead });
    setEditing(lead.id);
    setShowForm(true);
  }

  function saveForm(e) {
    e && e.preventDefault();
    if (!form.customerName) return alert("Customer Name is required");
    if (editing) {
      setLeads((s) => s.map((l) => (l.id === editing ? { ...form, updatedAt: new Date().toISOString() } : l)));
    } else {
      const newLead = { ...form, id: uid(), createdAt: new Date().toISOString() };
      setLeads((s) => [newLead, ...s]);
    }
    setShowForm(false);
  }

  function addComment(leadId, commentText, method = "Other", newStatus, newProbability) {
    if (!commentText) return;
    setLeads((s) =>
      s.map((l) =>
        l.id === leadId
          ? {
              ...l,
              comments: [
                {
                  id: uid(),
                  date: new Date().toISOString(),
                  text: commentText,
                  method,
                  status: newStatus || undefined,
                  probability: newProbability || undefined,
                },
                ...(l.comments || []),
              ],
              lastContactDate: new Date().toISOString().slice(0, 10),
              updatedAt: new Date().toISOString(),
              ...(newStatus ? { status: newStatus } : {}),
              ...(newProbability ? { probability: newProbability } : {}),
              ...(method ? { followUpMethod: method } : {}),
            }
          : l
      )
    );
  }

  function quickUpdate(leadId, patch) {
    setLeads((s) => s.map((l) => (l.id === leadId ? { ...l, ...patch, updatedAt: new Date().toISOString() } : l)));
  }

  function clearAll() {
    if (!confirm("Clear all leads from localStorage?")) return;
    setLeads([]);
  }

  return (
    <div className="lead-panel">
      <div className="lead-header">
        <h2>Lead Tracker</h2>
        <div className="lead-actions">
          <button className="btn" onClick={openNew}>
            Add Lead
          </button>
          <button className="btn btn-danger" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>

      <div className="lead-table-wrap">
        <table className="lead-table">
          <thead>
            <tr>
              <th>Customer / Company</th>
              <th>Contact Person</th>
              <th>Contact Info</th>
              <th>Lead Source</th>
              <th>Industry</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Follow-up Date</th>
              <th>Follow-up Method</th>
              <th>Last Contact</th>
              <th>Potential Value</th>
              <th>Prob. (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={13} className="lead-empty">
                  No leads yet — add one or load sample data.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className={l.status && l.status.includes("Converted") ? "lead-row-converted" : ""}>
                <td>
                  <div className="lead-customer">{l.customerName}</div>
                  <div className="lead-remarks">{l.remarks}</div>
                </td>
                <td>{l.contactPerson}</td>
                <td className="mono">{l.contactInfo}</td>
                <td>{l.leadSource}</td>
                <td>{l.industry}</td>
                <td>{l.assignedTo}</td>
                <td>{l.status}</td>
                <td>{l.followUpDate || "-"}</td>
                <td>
                  {(() => {
                    const methods = (l.comments || []).map((c) => c.method).filter(Boolean);
                    const uniq = [];
                    for (const m of methods) if (!uniq.includes(m)) uniq.push(m);
                    const prev = uniq.filter((m) => m !== l.followUpMethod);
                    const title = (l.comments || []).map((c) => `${new Date(c.date).toLocaleString()}: ${c.method || "-"}`).join("\n");
                    return (
                      <div className="follow-method" title={title}>
                        <div className="primary-method">{l.followUpMethod || "-"}</div>
                        {prev && prev.length > 0 ? <div className="prev-methods">{prev.slice(0, 3).join(", ")}</div> : null}
                      </div>
                    );
                  })()}
                </td>
                <td>{l.lastContactDate || "-"}</td>
                <td className="mono">{l.potentialValue ? "$" + l.potentialValue : "-"}</td>
                <td>{l.probability || "-"}</td>
                <td className="actions-col">
                  <button className="btn small icon-btn" onClick={() => openEdit(l)} title="Edit" aria-label={`Edit ${l.customerName}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
                      <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="currentColor" />
                    </svg>
                  </button>

                  <button className="btn small icon-btn" onClick={() => setShowCommentsFor(l.id)} title="Comments" aria-label={`Comments for ${l.customerName}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M21 6h-2v9H7v2c0 .55.45 1 1 1h9l4 4V7c0-.55-.45-1-1-1z" fill="currentColor" />
                      <path d="M17 2H3c-.55 0-1 .45-1 1v14l4-4h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z" fill="currentColor" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="lt-modal-overlay">
          <div className="lt-modal">
            <h3>{editing ? "Edit Lead" : "New Lead"}</h3>
            <form onSubmit={saveForm} className="lt-form">
              <label className="full">
                Customer / Company Name
                <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
              </label>

              <label>
                Contact Person
                <input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} />
              </label>

              <label>
                Contact Info
                <input value={form.contactInfo} onChange={(e) => setForm({ ...form, contactInfo: e.target.value })} />
              </label>

              <label>
                Lead Source
                <input value={form.leadSource} onChange={(e) => setForm({ ...form, leadSource: e.target.value })} />
              </label>

              <label>
                Industry
                <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
              </label>

              <label>
                Assigned To
                <input value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
              </label>

              <label>
                Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Follow-up Date
                <input type="date" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
              </label>

              <label>
                Follow-up Method
                <select value={form.followUpMethod} onChange={(e) => setForm({ ...form, followUpMethod: e.target.value })}>
                  <option value="">—</option>
                  {FOLLOWUP_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>

              <label className="full">
                Notes / Follow-up Summary
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </label>

              <label>
                Potential Value
                <input value={form.potentialValue} onChange={(e) => setForm({ ...form, potentialValue: e.target.value })} />
              </label>

              <label>
                Probability (%)
                <input type="number" min="0" max="100" value={form.probability} onChange={(e) => setForm({ ...form, probability: e.target.value })} />
              </label>

              <label>
                Expected Close Date
                <input type="date" value={form.expectedCloseDate} onChange={(e) => setForm({ ...form, expectedCloseDate: e.target.value })} />
              </label>

              <label className="full">
                Final Outcome / Remarks
                <input value={form.finalOutcome} onChange={(e) => setForm({ ...form, finalOutcome: e.target.value })} />
              </label>

              <div className="form-actions full">
                <button className="btn" type="submit">
                  Save
                </button>
                <button className="btn" type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCommentsFor && (
        <CommentsModal
          lead={leads.find((x) => x.id === showCommentsFor)}
          onClose={() => setShowCommentsFor(null)}
          onAdd={(text, method, status, probability) => addComment(showCommentsFor, text, method, status, probability)}
          onFieldChange={(patch) => quickUpdate(showCommentsFor, patch)}
        />
      )}
    </div>
  );
}

function CommentsModal({ lead, onClose, onAdd, onFieldChange }) {
  const [text, setText] = useState("");
  const [method, setMethod] = useState(lead?.followUpMethod || FOLLOWUP_METHODS[0]);
  const [status, setStatus] = useState(lead?.status || STATUS_OPTIONS[0]);
  const [probability, setProbability] = useState(lead?.probability || "");

  if (!lead) return null;

  return (
    <div className="lt-modal-overlay">
      <div className="lt-modal small">
        <h3>Comments for {lead.customerName}</h3>
        <div className="comments-list">
          {lead.comments && lead.comments.length > 0 ? (
            lead.comments.map((c) => (
              <div key={c.id} className="comment-row">
                <div className="comment-meta">{new Date(c.date).toLocaleString()} • {c.method}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          ) : (
            <div className="lead-empty">No comments yet.</div>
          )}
        </div>

        <div className="comment-form">
          <label className="inline">
            Status
            <select
              value={status}
              onChange={(e) => {
                const v = e.target.value;
                setStatus(v);
                onFieldChange && onFieldChange({ status: v });
              }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="inline">
            Method
            <select
              value={method}
              onChange={(e) => {
                const v = e.target.value;
                setMethod(v);
                onFieldChange && onFieldChange({ followUpMethod: v });
              }}
            >
              {FOLLOWUP_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="inline">
            Prob. (%)
            <input
              type="number"
              min="0"
              max="100"
              value={probability}
              onChange={(e) => {
                const v = e.target.value;
                setProbability(v);
                onFieldChange && onFieldChange({ probability: v });
              }}
            />
          </label>

          <textarea placeholder="Add a short note about this interaction" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="form-actions">
            <button
              className="btn"
              onClick={() => {
                onAdd(text, method, status, probability);
                setText("");
              }}
            >
              Add Comment
            </button>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
