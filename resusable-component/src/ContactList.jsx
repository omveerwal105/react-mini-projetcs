import React, { useState } from "react";
import { useEffect } from "react";

const ContactList = () => {
 const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  // Load contacts from localStorage on mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Phone validation
    if (!/^\d{10}$/.test(form.phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    // ✅ Email validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Enter a valid email address");
      return;
    }

    // ✅ Prevent duplicate email if adding new
    if (contacts.some(c => c.email === form.email && editIndex === null)) {
      alert("This contact already exists");
      return;
    }

    if (editIndex !== null) {
      // Edit existing contact
      const updated = [...contacts];
      updated[editIndex] = form;
      setContacts(updated);
      setEditIndex(null);
    } else {
      // Add new contact
      setContacts([...contacts, form]);
    }

    // Reset form
    setForm({ name: "", email: "", phone: "" });
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setForm(contacts[index]);
    setEditIndex(index);
  };

  const filteredContacts = contacts.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>📒 Contact List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 15px",
            background: editIndex !== null ? "orange" : "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      {/* Contact List */}
      <div style={{ marginTop: "20px" }}>
        {filteredContacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          filteredContacts.map((contact, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <strong>{contact.name}</strong> <br />
              📧 {contact.email} <br />
              📞 {contact.phone}
              <div style={{ marginTop: "5px" }}>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    padding: "5px 10px",
                    marginRight: "5px",
                    background: "orange",
                    color: "white",
                    border: "none",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;
