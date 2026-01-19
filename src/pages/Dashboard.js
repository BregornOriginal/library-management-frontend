import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';
import LibrarianDashboard from '../components/LibrarianDashboard';
import MemberDashboard from '../components/MemberDashboard';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isLibrarian, isMember } = useAuth();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (isLibrarian()) {
        response = await dashboardAPI.librarian();
      } else if (isMember()) {
        response = await dashboardAPI.member();
      }

      setData(response.data);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="error-message">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>
          {isLibrarian() ? '🧙‍♂️ Librarian Dashboard' : '🏹 Member Dashboard'}
        </h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      {isLibrarian() && data && (
        <LibrarianDashboard data={data} onRefresh={fetchDashboardData} />
      )}

      {isMember() && data && (
        <MemberDashboard data={data} onRefresh={fetchDashboardData} />
      )}
    </div>
  );
};

export default Dashboard;
