import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, DollarSign, Activity, UserPlus, 
  LayoutDashboard, Settings, Bell, LogOut 
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getIcon = (label) => {
    switch(label) {
      case 'Usuarios Totales': return <Users size={20} />;
      case 'Ventas Mensuales': return <DollarSign size={20} />;
      case 'Sesiones Activas': return <Activity size={20} />;
      case 'Nuevos Clientes': return <UserPlus size={20} />;
      default: return <Activity size={20} />;
    }
  };

  if (loading || !data) {
    return (
      <div className="dashboard-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
        <div className="brand">
          <div className="brand-icon">
            <LayoutDashboard size={20} color="white" />
          </div>
          <span>Nexus</span>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" className="nav-link active" onClick={(e) => e.preventDefault()}>
              <LayoutDashboard size={18} />
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <Users size={18} />
              Customers
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <Activity size={18} />
              Analytics
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <Settings size={18} />
              Settings
            </a>
          </li>
        </ul>

        <div className="user-profile">
          <div className="avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Admin</p>
          </div>
          <button className="logout-btn" onClick={logout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="greeting">
            <h2>Welcome back, {user?.name?.split(' ')[0] || 'User'}</h2>
            <p>Here's what's happening today.</p>
          </div>
          <div className="actions">
            <button className="glass-panel" style={{ padding: '10px', borderRadius: '50%', cursor: 'pointer', border: 'none', color: 'white', display: 'flex' }}>
              <Bell size={20} />
            </button>
          </div>
        </header>

        <div className="stats-grid">
          {data.stats.map((stat, index) => (
            <div key={index} className="glass-panel stat-card">
              <div className="stat-header">
                {stat.label}
                <span style={{ color: 'var(--text-secondary)' }}>
                  {getIcon(stat.label)}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.change.startsWith('+') ? 'change-positive' : 'change-negative'}`}>
                {stat.change} this month
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-sections">
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="section-title">Recent Activity</h3>
            <div className="activities-list">
              {data.recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon"></div>
                  <div className="activity-details">
                    <p>{activity.action}</p>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="section-title">System Status</h3>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                99.9%
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center' }}>All systems operational and running smoothly.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
