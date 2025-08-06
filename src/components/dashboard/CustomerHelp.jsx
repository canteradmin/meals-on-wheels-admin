import React, { useState, useEffect } from "react";
import { supportAPI, handleAPIError } from "../../services/api";
import "./CustomerHelp.scss";

const CustomerHelp = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSupportQueries();
  }, [filterStatus, filterPriority, currentPage]);

  const fetchSupportQueries = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (filterStatus !== "all") {
        params.status = filterStatus;
      }

      const response = await supportAPI.getSupportQueries(params);
      setTickets(response.data.tickets || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      console.error("Support queries fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      // This would be a separate API call to update ticket status
      // For now, we'll update local state
      setTickets(
        tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
    } catch (err) {
      const errorMessage = handleAPIError(err);
      console.error("Update ticket status error:", err);
      alert(`Failed to update ticket status: ${errorMessage}`);
    }
  };

  const assignTicket = async (ticketId, assignee) => {
    try {
      // This would be a separate API call to assign ticket
      // For now, we'll update local state
      setTickets(
        tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, assignedTo: assignee } : ticket
        )
      );

      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, assignedTo: assignee });
      }
    } catch (err) {
      const errorMessage = handleAPIError(err);
      console.error("Assign ticket error:", err);
      alert(`Failed to assign ticket: ${errorMessage}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "warning";
      case "in_progress":
        return "primary";
      case "resolved":
        return "success";
      case "closed":
        return "gray";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="customer-help">
        <div className="help-header">
          <div className="header-content">
            <h2>Customer Help Desk</h2>
            <p>Manage customer support tickets and queries</p>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading support tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-help">
        <div className="help-header">
          <div className="header-content">
            <h2>Customer Help Desk</h2>
            <p>Manage customer support tickets and queries</p>
          </div>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Support Tickets</h3>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={fetchSupportQueries}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-help">
      <div className="help-header">
        <div className="header-content">
          <h2>Customer Help Desk</h2>
          <p>Manage customer support tickets and queries</p>
        </div>
        <div className="header-actions">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="help-content">
        <div className="tickets-list">
          <div className="tickets-header">
            <h3>Support Tickets</h3>
            <span className="ticket-count">{tickets.length} tickets</span>
          </div>

          <div className="tickets-container">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket-item ${
                  selectedTicket?.id === ticket.id ? "selected" : ""
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="ticket-header">
                  <div className="ticket-id">#{ticket.id}</div>
                  <div className="ticket-meta">
                    <span
                      className={`priority-badge priority-${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`status-badge status-${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <div className="ticket-content">
                  <h4 className="ticket-subject">{ticket.subject}</h4>
                  <p className="ticket-customer">
                    From: {ticket.customerName} ({ticket.customerEmail})
                  </p>
                  <p className="ticket-preview">
                    {ticket.message.substring(0, 100)}...
                  </p>
                </div>
                <div className="ticket-footer">
                  <span className="ticket-date">
                    {formatDate(ticket.createdAt)}
                  </span>
                  {ticket.assignedTo && (
                    <span className="ticket-assignee">
                      Assigned to: {ticket.assignedTo}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn--secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn--secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="ticket-details">
          {selectedTicket ? (
            <div className="ticket-detail-content">
              <div className="detail-header">
                <h3>Ticket #{selectedTicket.id}</h3>
                <div className="detail-meta">
                  <span
                    className={`priority-badge priority-${getPriorityColor(
                      selectedTicket.priority
                    )}`}
                  >
                    {selectedTicket.priority}
                  </span>
                  <span
                    className={`status-badge status-${getStatusColor(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="detail-info">
                <div className="info-row">
                  <span className="info-label">Customer:</span>
                  <span className="info-value">
                    {selectedTicket.customerName}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">
                    {selectedTicket.customerEmail}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">
                    {selectedTicket.customerPhone}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Created:</span>
                  <span className="info-value">
                    {formatDate(selectedTicket.createdAt)}
                  </span>
                </div>
                {selectedTicket.assignedTo && (
                  <div className="info-row">
                    <span className="info-label">Assigned to:</span>
                    <span className="info-value">
                      {selectedTicket.assignedTo}
                    </span>
                  </div>
                )}
              </div>

              <div className="detail-message">
                <h4>Message</h4>
                <p>{selectedTicket.message}</p>
              </div>

              <div className="detail-actions">
                <div className="action-group">
                  <label>Update Status:</label>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) =>
                      updateTicketStatus(selectedTicket.id, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="action-group">
                  <label>Assign to:</label>
                  <select
                    value={selectedTicket.assignedTo || ""}
                    onChange={(e) =>
                      assignTicket(selectedTicket.id, e.target.value)
                    }
                    className="assign-select"
                  >
                    <option value="">Unassigned</option>
                    <option value="admin">Admin</option>
                    <option value="support_team">Support Team</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                <div className="action-buttons">
                  <button className="btn btn--primary">Reply</button>
                  <button className="btn btn--secondary">Add Note</button>
                  <button className="btn btn--danger">Close Ticket</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-ticket-selected">
              <div className="no-ticket-icon">💬</div>
              <h3>Select a Ticket</h3>
              <p>Choose a ticket from the list to view its details</p>
            </div>
          )}
        </div>
      </div>

      {tickets.length === 0 && (
        <div className="no-tickets">
          <div className="no-tickets-icon">💬</div>
          <h3>No tickets found</h3>
          <p>There are no support tickets matching your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerHelp;
