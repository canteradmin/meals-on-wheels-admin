import React, { useState, useEffect } from "react";
import "./CustomerHelp.scss";

const CustomerHelp = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const mockTickets = [
        {
          id: "T001",
          customerName: "Alice Johnson",
          customerEmail: "alice@example.com",
          customerPhone: "+91 9876543213",
          subject: "Order not delivered on time",
          message:
            "I placed an order 2 hours ago and it still hasn't been delivered. The estimated delivery time was 45 minutes.",
          status: "open",
          priority: "high",
          createdAt: "2024-01-15T08:30:00Z",
          assignedTo: "support_team",
        },
        {
          id: "T002",
          customerName: "Bob Smith",
          customerEmail: "bob@example.com",
          customerPhone: "+91 9876543214",
          subject: "Wrong item received",
          message:
            "I ordered Chicken Biryani but received Butter Chicken instead. Please help me resolve this issue.",
          status: "in_progress",
          priority: "medium",
          createdAt: "2024-01-15T06:45:00Z",
          assignedTo: "admin",
        },
        {
          id: "T003",
          customerName: "Carol Davis",
          customerEmail: "carol@example.com",
          customerPhone: "+91 9876543215",
          subject: "Payment refund request",
          message:
            "I would like to request a refund for my last order as the food was cold when it arrived.",
          status: "resolved",
          priority: "low",
          createdAt: "2024-01-14T15:20:00Z",
          assignedTo: "support_team",
        },
      ];

      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      open: "#ff6b6b",
      in_progress: "#45b7d1",
      resolved: "#60b246",
      closed: "#686b78",
    };
    return statusColors[status] || "#686b78";
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      high: "#ff6b6b",
      medium: "#ffa726",
      low: "#60b246",
    };
    return priorityColors[priority] || "#686b78";
  };

  const getStatusDisplayName = (status) => {
    const statusNames = {
      open: "Open",
      in_progress: "In Progress",
      resolved: "Resolved",
      closed: "Closed",
    };
    return statusNames[status] || status;
  };

  const getPriorityDisplayName = (priority) => {
    const priorityNames = {
      high: "High",
      medium: "Medium",
      low: "Low",
    };
    return priorityNames[priority] || priority;
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const assignTicket = (ticketId, assignee) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, assignedTo: assignee } : ticket
      )
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesSearch =
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="customer-help">
        <div className="help-header">
          <h2>Customer Support</h2>
          <p>Manage customer inquiries and support tickets</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading support tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-help">
      <div className="help-header">
        <h2>Customer Support</h2>
        <p>Manage customer inquiries and support tickets</p>
      </div>

      <div className="help-controls">
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="actions">
          <button className="btn btn--primary">New Ticket</button>
        </div>
      </div>

      <div className="help-content">
        <div className="tickets-list">
          <div className="tickets-header">
            <h3>Support Tickets ({filteredTickets.length})</h3>
          </div>

          <div className="tickets-grid">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket-card ${
                  selectedTicket?.id === ticket.id ? "selected" : ""
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="ticket-header">
                  <div className="ticket-id">{ticket.id}</div>
                  <div className="ticket-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(ticket.status) }}
                    >
                      {getStatusDisplayName(ticket.status)}
                    </span>
                  </div>
                </div>

                <div className="ticket-content">
                  <h4 className="ticket-subject">{ticket.subject}</h4>
                  <p className="ticket-customer">{ticket.customerName}</p>
                  <p className="ticket-message">
                    {ticket.message.substring(0, 100)}...
                  </p>
                </div>

                <div className="ticket-footer">
                  <div className="ticket-priority">
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: getPriorityColor(ticket.priority),
                      }}
                    >
                      {getPriorityDisplayName(ticket.priority)}
                    </span>
                  </div>
                  <div className="ticket-date">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="no-tickets">
              <p>No support tickets found matching your criteria.</p>
            </div>
          )}
        </div>

        {selectedTicket && (
          <div className="ticket-detail">
            <div className="detail-header">
              <h3>Ticket #{selectedTicket.id}</h3>
              <button
                className="btn btn--small btn--secondary"
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h4>Customer Information</h4>
                <div className="customer-info">
                  <p>
                    <strong>Name:</strong> {selectedTicket.customerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedTicket.customerEmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedTicket.customerPhone}
                  </p>
                </div>
              </div>

              <div className="detail-section">
                <h4>Ticket Details</h4>
                <div className="ticket-info">
                  <p>
                    <strong>Subject:</strong> {selectedTicket.subject}
                  </p>
                  <p>
                    <strong>Message:</strong>
                  </p>
                  <div className="message-content">
                    {selectedTicket.message}
                  </div>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="detail-section">
                <h4>Status & Priority</h4>
                <div className="status-priority">
                  <div className="status-control">
                    <label>Status:</label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) =>
                        updateTicketStatus(selectedTicket.id, e.target.value)
                      }
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div className="priority-display">
                    <label>Priority:</label>
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: getPriorityColor(
                          selectedTicket.priority
                        ),
                      }}
                    >
                      {getPriorityDisplayName(selectedTicket.priority)}
                    </span>
                  </div>

                  <div className="assign-control">
                    <label>Assigned To:</label>
                    <select
                      value={selectedTicket.assignedTo}
                      onChange={(e) =>
                        assignTicket(selectedTicket.id, e.target.value)
                      }
                    >
                      <option value="support_team">Support Team</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Actions</h4>
                <div className="ticket-actions">
                  <button className="btn btn--primary">
                    Reply to Customer
                  </button>
                  <button className="btn btn--secondary">
                    Mark as Resolved
                  </button>
                  <button className="btn btn--danger">Close Ticket</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerHelp;
