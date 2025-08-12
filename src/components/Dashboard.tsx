import React, { useState } from 'react';
import Header from './Header';
import StatsCards from './StatsCards';
import CategoryChart from './CategoryChart';
import PoliciesTable from './PoliciesTable';
import NotificationPanel from './NotificationPanel';
import { Policy } from '../types/policy';

// Mock data for demonstration
const mockPolicies: Policy[] = [
  {
    id: 1,
    policynumber: 'POL-2024-001',
    transactionid: 'TXN-001-2024',
    transactiontype: 'New Business',
    endorseeffectivedate: '2024-01-15',
    product: 'Auto Insurance',
    program: 'Standard Auto',
    accountnumber: 'ACC-001',
    insuredname: 'John Smith',
    premium: 1250.00,
    policystatus: 'Pending',
    source: 'Agent Portal',
    issueddate: '2024-01-10',
    lob: 'Personal Lines',
  },
  {
    id: 2,
    policynumber: 'POL-2024-002',
    transactionid: 'TXN-002-2024',
    transactiontype: 'Renewal',
    endorseeffectivedate: '2024-01-20',
    product: 'Home Insurance',
    program: 'Premium Home',
    accountnumber: 'ACC-002',
    insuredname: 'Sarah Johnson',
    premium: 2100.00,
    policystatus: 'Booked',
    source: 'Direct',
    issueddate: '2024-01-15',
    lob: 'Property',
  },
  {
    id: 3,
    policynumber: 'POL-2024-003',
    transactionid: 'TXN-003-2024',
    transactiontype: 'Endorsement',
    endorseeffectivedate: '2024-01-18',
    product: 'Life Insurance',
    program: 'Term Life',
    accountnumber: 'ACC-003',
    insuredname: 'Michael Brown',
    premium: 850.00,
    policystatus: 'Rejected',
    source: 'Broker',
    issueddate: '2024-01-12',
    lob: 'Life & Health',
  },
  {
    id: 4,
    policynumber: 'POL-2024-004',
    transactionid: 'TXN-004-2024',
    transactiontype: 'New Business',
    endorseeffectivedate: '2024-01-22',
    product: 'Health Insurance',
    program: 'Family Health',
    accountnumber: 'ACC-004',
    insuredname: 'Emily Davis',
    premium: 1800.00,
    policystatus: 'Posted',
    source: 'Online',
    issueddate: '2024-01-18',
    lob: 'Life & Health',
  },
  {
    id: 5,
    policynumber: 'POL-2024-005',
    transactionid: 'TXN-005-2024',
    transactiontype: 'Renewal',
    endorseeffectivedate: '2024-01-25',
    product: 'Auto Insurance',
    program: 'Premium Auto',
    accountnumber: 'ACC-005',
    insuredname: 'David Wilson',
    premium: 1350.00,
    policystatus: 'InProcess',
    source: 'Agent Portal',
    issueddate: '2024-01-20',
    lob: 'Personal Lines',
  },
  {
    id: 6,
    policynumber: 'POL-2024-006',
    transactionid: 'TXN-006-2024',
    transactiontype: 'Endorsement',
    endorseeffectivedate: '2024-01-28',
    product: 'Home Insurance',
    program: 'Standard Home',
    accountnumber: 'ACC-006',
    insuredname: 'Lisa Martinez',
    premium: 2250.00,
    policystatus: 'Hold',
    source: 'Direct',
    issueddate: '2024-01-22',
    lob: 'Property',
  },
  {
    id: 7,
    policynumber: 'POL-2024-007',
    transactionid: 'TXN-007-2024',
    transactiontype: 'Cancellation',
    endorseeffectivedate: '2024-02-01',
    product: 'Health Insurance',
    program: 'Individual Health',
    accountnumber: 'ACC-007',
    insuredname: 'Robert Taylor',
    premium: 1650.00,
    policystatus: 'Rejected',
    source: 'Broker',
    issueddate: '2024-01-25',
    lob: 'Life & Health',
  },
  {
    id: 8,
    policynumber: 'POL-2024-008',
    transactionid: 'TXN-008-2024',
    transactiontype: 'New Business',
    endorseeffectivedate: '2024-02-03',
    product: 'Life Insurance',
    program: 'Whole Life',
    accountnumber: 'ACC-008',
    insuredname: 'Jennifer Anderson',
    premium: 950.00,
    policystatus: 'Booked',
    source: 'Online',
    issueddate: '2024-01-28',
    lob: 'Life & Health',
  }
];

const Dashboard: React.FC = () => {
  const [policies] = useState<Policy[]>(mockPolicies);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>(mockPolicies);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const stats = {
    booked: policies.filter(p => p.policystatus === 'Booked').length,
    rejected: policies.filter(p => p.policystatus === 'Rejected').length,
    inProcess: policies.filter(p => p.policystatus === 'InProcess').length,
    pending: policies.filter(p => p.policystatus === 'Pending').length,
    outstandingPremium: policies
      .filter(p => p.policystatus !== 'Booked' && p.policystatus !== 'Posted')
      .reduce((sum, p) => sum + p.premium, 0),
  };

  const handleKPIClick = (type: string) => {
    if (type === 'outstanding') return; // Don't filter for outstanding premium
    
    setSelectedKPI(type);
    setHasSearched(true);
    
    const filtered = policies.filter(policy => policy.policystatus === type);
    setFilteredPolicies(filtered);
  };
  const categoryData = {
    auto: policies.filter(p => p.product === 'Auto Insurance').length,
    home: policies.filter(p => p.product === 'Home Insurance').length,
    life: policies.filter(p => p.product === 'Life Insurance').length,
    health: policies.filter(p => p.product === 'Health Insurance').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={stats} onCardClick={handleKPIClick} />
        </div>

        {/* Policies Table */}
        <div className="mb-8">
          <PoliciesTable 
            policies={policies}
            filteredPolicies={filteredPolicies}
            setFilteredPolicies={setFilteredPolicies}
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            selectedKPI={selectedKPI}
            setSelectedKPI={setSelectedKPI}
          />
        </div>

        {/* Category Chart - Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Notifications Panel */}
            <NotificationPanel />
          </div>
          
          {/* Category Chart - Smaller Size */}
          <div className="lg:col-span-1">
            <CategoryChart data={categoryData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;