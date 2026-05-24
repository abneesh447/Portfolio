import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const MessagesViewer = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/messages', {
        headers: { Authorization: token }
      });
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 500 }}>Are you sure you want to delete this message?</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button 
            className="btn-primary" 
            style={{ padding: '0.5rem 1rem', background: '#ef4444', fontSize: '0.9rem' }}
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`/api/messages/${id}`, {
                  headers: { Authorization: token }
                });
                fetchMessages();
                toast.success('Message deleted!');
              } catch (err) {
                console.error('Error deleting message:', err);
                toast.error('Failed to delete message.');
              }
            }}
          >
            Delete
          </button>
          <button 
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { 
      duration: Infinity, 
      style: { background: 'var(--bg-color-lighter)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' } 
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>Contact Messages</h2>
      {messages.length === 0 ? <p>No messages yet.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(m => (
            <div key={m._id} className="glass-card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4>{m.name} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>({m.email})</span></h4>
                <button 
                  onClick={() => handleDelete(m._id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                  title="Delete Message"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <p style={{ marginTop: '0.5rem', paddingRight: '2rem' }}>{m.message}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: '1rem' }}>
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MessagesViewer;
