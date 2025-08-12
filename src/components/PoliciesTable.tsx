import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { Policy } from '../types/policy';
import PolicyViewModal from './PolicyViewModal';

interface PoliciesTableProps {
  policies: Policy[];
  filteredPolicies: Policy[];
  setFilteredPolicies: (policies: Policy[]) => void;
  hasSearched: boolean;
  setHasSearched: (searched: boolean) => void;
  selectedKPI: string | null;
  setSelectedKPI: (kpi: string | null) => void;
}

const PoliciesTable: React.FC<PoliciesTableProps> = ({
  policies,
  filteredPolicies,
  setFilteredPolicies,
  hasSearched,
  setHasSearched,
  selectedKPI,
  setSelectedKPI,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [issuedDateFilter, setIssuedDateFilter] = useState('');
  const [lobFilter, setLobFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [policyStatusFilter, setPolicyStatusFilter] = useState('all');
  const [policyNumberFilter, setPolicyNumberFilter] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [premiumRangeFilter, setPremiumRangeFilter] = useState<number[]>([0, 0]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  // Calculate premium range
  const premiumValues = policies.map(p => p.premium);
  const minPremium = Math.min(...premiumValues);
  const maxPremium = Math.max(...premiumValues);

  // Initialize premium range filter
  React.useEffect(() => {
    if (premiumRangeFilter[0] === 0 && premiumRangeFilter[1] === 0) {
      setPremiumRangeFilter([minPremium, maxPremium]);
    }
  }, [minPremium, maxPremium, premiumRangeFilter]);

  // Check if any filter is applied
  const hasActiveFilters = useMemo(() => {
    return selectedKPI ||
           searchTerm || 
           sourceFilter !== 'all' ||
           issuedDateFilter ||
           lobFilter !== 'all' ||
           productFilter !== 'all' ||
           programFilter !== 'all' ||
           policyStatusFilter !== 'all' ||
           policyNumberFilter || 
           transactionTypeFilter !== 'all' ||
           premiumRangeFilter[0] !== minPremium ||
           premiumRangeFilter[1] !== maxPremium;
  }, [
    selectedKPI,
    searchTerm, 
    sourceFilter,
    issuedDateFilter,
    lobFilter,
    productFilter,
    programFilter,
    policyStatusFilter,
    policyNumberFilter,
    transactionTypeFilter,
    premiumRangeFilter,
    minPremium,
    maxPremium
  ]);

  const handleViewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setShowPolicyModal(true);
  };

  const handleClosePolicyModal = () => {
    setShowPolicyModal(false);
    setSelectedPolicy(null);
  };

  const handleSearch = () => {
    setHasSearched(true);
    setShowFilters(false);
  };

  // Apply filters
  useMemo(() => {
    let filtered = policies;

    // Apply KPI filter first
    if (selectedKPI) {
      filtered = filtered.filter((policy) => policy.policystatus === selectedKPI);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (policy) =>
          policy.policynumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.transactionid.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.insuredname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter((policy) => policy.source === sourceFilter);
    }

    if (issuedDateFilter) {
      filtered = filtered.filter((policy) => 
        policy.issueddate.includes(issuedDateFilter)
      );
    }

    if (lobFilter !== 'all') {
      filtered = filtered.filter((policy) => policy.lob === lobFilter);
    }

    if (productFilter !== 'all') {
      filtered = filtered.filter((policy) => policy.product === productFilter);
    }

    if (programFilter !== 'all') {
      filtered = filtered.filter((policy) => policy.program === programFilter);
    }

    if (policyStatusFilter !== 'all') {
      filtered = filtered.filter((policy) => policy.policystatus === policyStatusFilter);
    }

    if (policyNumberFilter) {
      filtered = filtered.filter((policy) => 
        policy.policynumber.toLowerCase().includes(policyNumberFilter.toLowerCase())
      );
    }

    if (transactionTypeFilter !== 'all') {
      filtered = filtered.filter((policy) => policy.transactiontype === transactionTypeFilter);
    }

    // Apply premium range filter
    filtered = filtered.filter((policy) => 
      policy.premium >= premiumRangeFilter[0] && policy.premium <= premiumRangeFilter[1]
    );


    setFilteredPolicies(filtered);
  }, [
    selectedKPI,
    sourceFilter,
    issuedDateFilter,
    lobFilter,
    productFilter,
    programFilter,
    policyStatusFilter,
    searchTerm,
    policyNumberFilter,
    transactionTypeFilter,
    premiumRangeFilter,
    policies, 
    setFilteredPolicies
  ]);

  const getPolicyStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'Booked':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Posted':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'InProcess':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Hold':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status: string) => {
    return null; // Remove all status icons
  };

  const getProductBadge = (product: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (product) {
      case 'Auto Insurance':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Home Insurance':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Life Insurance':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Health Insurance':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
            <p className="text-sm text-gray-600">
              {hasSearched ? `${filteredPolicies.length} of ${policies.length} policies found${selectedKPI ? ` (filtered by ${selectedKPI})` : ''}` : 'Use filters or search to find policies'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Where is my policy? (Policy Number, Transaction ID, Name)"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                handleSearch();
                setShowFilters(false);
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Sources</option>
                  <option value="Agent Portal">Agent Portal</option>
                  <option value="Direct">Direct</option>
                  <option value="Broker">Broker</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issued Date
                </label>
                <input
                  type="date"
                  value={issuedDateFilter}
                  onChange={(e) => setIssuedDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LOB
                </label>
                <select
                  value={lobFilter}
                  onChange={(e) => setLobFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All LOBs</option>
                  <option value="Personal Lines">Personal Lines</option>
                  <option value="Property">Property</option>
                  <option value="Life & Health">Life & Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product
                </label>
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Products</option>
                  <option value="Auto Insurance">Auto Insurance</option>
                  <option value="Home Insurance">Home Insurance</option>
                  <option value="Life Insurance">Life Insurance</option>
                  <option value="Health Insurance">Health Insurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program
                </label>
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Programs</option>
                  <option value="Standard Auto">Standard Auto</option>
                  <option value="Premium Auto">Premium Auto</option>
                  <option value="Standard Home">Standard Home</option>
                  <option value="Premium Home">Premium Home</option>
                  <option value="Term Life">Term Life</option>
                  <option value="Whole Life">Whole Life</option>
                  <option value="Individual Health">Individual Health</option>
                  <option value="Family Health">Family Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Status
                </label>
                <select
                  value={policyStatusFilter}
                  onChange={(e) => setPolicyStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Booked">Booked</option>
                  <option value="Posted">Posted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                  <option value="InProcess">In Process</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Number
                </label>
                <input
                  type="text"
                  value={policyNumberFilter}
                  onChange={(e) => setPolicyNumberFilter(e.target.value)}
                  placeholder="Enter policy number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  value={transactionTypeFilter}
                  onChange={(e) => setTransactionTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Transaction Types</option>
                  <option value="New Business">New Business</option>
                  <option value="Renewal">Renewal</option>
                  <option value="Endorsement">Endorsement</option>
                  <option value="Cancellation">Cancellation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Premium Range
                </label>
                <div className="px-3 py-2 space-y-3">
                  {/* Min Range Slider */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Minimum: ${premiumRangeFilter[0].toLocaleString()}</label>
                    <input
                      type="range"
                      min={minPremium}
                      max={maxPremium}
                      value={premiumRangeFilter[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin <= premiumRangeFilter[1]) {
                          setPremiumRangeFilter([newMin, premiumRangeFilter[1]]);
                        }
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer premium-slider"
                    />
                  </div>
                  
                  {/* Max Range Slider */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Maximum: ${premiumRangeFilter[1].toLocaleString()}</label>
                    <input
                      type="range"
                      min={minPremium}
                      max={maxPremium}
                      value={premiumRangeFilter[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax >= premiumRangeFilter[0]) {
                          setPremiumRangeFilter([premiumRangeFilter[0], newMax]);
                        }
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer premium-slider"
                    />
                  </div>
                  
                  {/* Range Display */}
                  <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                    <span className="font-medium">${premiumRangeFilter[0].toLocaleString()}</span>
                    <span className="text-gray-400">to</span>
                    <span className="font-medium">${premiumRangeFilter[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedKPI(null);
                  setSourceFilter('all');
                  setIssuedDateFilter('');
                  setLobFilter('all');
                  setProductFilter('all');
                  setProgramFilter('all');
                  setPolicyStatusFilter('all');
                  setPolicyNumberFilter('');
                  setTransactionTypeFilter('all');
                  setPremiumRangeFilter([minPremium, maxPremium]);
                  setSearchTerm('');
                  setHasSearched(false);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {hasSearched && (
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Policy Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Endorse Effective Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insured Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Premium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Policy Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPolicies.map((policy) => (
              <tr
                key={policy.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewPolicy(policy)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {policy.policynumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{policy.transactiontype}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(policy.endorseeffectivedate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getProductBadge(policy.product)}>
                    {policy.product}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {policy.program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{policy.accountnumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{policy.insuredname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${policy.premium.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getPolicyStatusBadge(policy.policystatus)}>
                    {policy.policystatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPolicy(policy);
                      }}
                      className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {hasSearched && filteredPolicies.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          <p>No policies found matching your criteria.</p>
        </div>
      )}

      {!hasSearched && (
        <div className="p-12 text-center text-gray-500">
          <div className="max-w-md mx-auto">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find Your Policy</h3>
            <p className="text-sm text-gray-600">
              Use the search bar to find your policy by policy number, transaction ID, or insured name.
              Apply filters for more specific searches.
            </p>
          </div>
        </div>
      )}
      {/* Policy View Modal */}
      {showPolicyModal && selectedPolicy && (
        <PolicyViewModal
          policy={selectedPolicy}
          onClose={handleClosePolicyModal}
        />
      )}
    </div>
  );
};

export default PoliciesTable;