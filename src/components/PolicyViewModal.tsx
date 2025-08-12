import React from 'react';
import { X, Calendar, DollarSign, User, FileText, Shield, CreditCard, Building, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { Policy } from '../types/policy';

interface PolicyViewModalProps {
  policy: Policy;
  onClose: () => void;
}

interface TrackingStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
  date?: string;
  time?: string;
}

const PolicyViewModal: React.FC<PolicyViewModalProps> = ({ policy, onClose }) => {
  const getProductIcon = (product: string) => {
    switch (product) {
      case 'Auto Insurance':
        return '🚗';
      case 'Home Insurance':
        return '🏠';
      case 'Life Insurance':
        return '❤️';
      case 'Health Insurance':
        return '🏥';
      default:
        return '📋';
    }
  };

  // Mock tracking data - in real app this would come from the policy data
  const trackingSteps: TrackingStep[] = [
    {
      id: 'issued',
      label: 'Issued',
      status: 'completed',
      date: '2024-01-15',
      time: '09:30 AM'
    },
    {
      id: 'staging',
      label: 'Staging',
      status: 'completed',
      date: '2024-01-15',
      time: '10:15 AM'
    },
    {
      id: 'policyods',
      label: 'PolicyODS',
      status: 'completed',
      date: '2024-01-15',
      time: '11:00 AM'
    },
    {
      id: 'validation',
      label: 'Validation',
      status: policy.policystatus === 'Rejected' ? 'failed' : 'completed',
      date: policy.policystatus === 'Rejected' ? '2024-01-15' : '2024-01-15',
      time: policy.policystatus === 'Rejected' ? '11:45 AM' : '11:45 AM'
    },
    {
      id: 'processed',
      label: 'Processed',
      status: policy.policystatus === 'Rejected' ? 'pending' : 
              policy.policystatus === 'Pending' ? 'current' : 'completed',
      date: policy.policystatus === 'Rejected' || policy.policystatus === 'Pending' ? undefined : '2024-01-15',
      time: policy.policystatus === 'Rejected' || policy.policystatus === 'Pending' ? undefined : '12:30 PM'
    }
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-100" />;
    }
  };

  const getStepColors = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-blue-500 bg-blue-50';
      case 'failed':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getTextColors = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700';
      case 'current':
        return 'text-blue-700';
      case 'failed':
        return 'text-red-700';
      default:
        return 'text-gray-400';
    }
  };

  const getConnectorColor = (currentStatus: string) => {
    if (currentStatus === 'completed') return 'bg-green-400';
    if (currentStatus === 'failed') return 'bg-red-400';
    if (currentStatus === 'current') return 'bg-blue-400';
    return 'bg-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{policy.policynumber}</h2>
              <p className="text-blue-100 mt-1">Policy Details & Information</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Tracking Flow */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Processing Status</h3>
            
            <div className="relative">
              {/* Background Progress Line */}
              <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full"></div>
              
              {/* Animated Progress Line */}
              <div 
                className="absolute top-8 left-8 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${Math.max(0, (trackingSteps.findIndex(step => step.status === 'current' || step.status === 'failed') + 1) / trackingSteps.length * 100 - 12)}%`
                }}
              >
                {/* Animated pulse effect */}
                <div className="absolute right-0 top-0 w-2 h-1 bg-white rounded-full animate-pulse"></div>
              </div>
              
              {/* Steps Container */}
              <div className="flex justify-between items-start relative z-10">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative group" style={{ width: '20%' }}>
                    {/* Step Circle */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full border-4 ${getStepColors(step.status)} transition-all duration-500 shadow-lg transform group-hover:scale-110 relative overflow-hidden`}>
                      {/* Animated background for current step */}
                      {step.status === 'current' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse opacity-20"></div>
                      )}
                      
                      {/* Success animation */}
                      {step.status === 'completed' && (
                        <div className="absolute inset-0 bg-green-400 rounded-full opacity-10 animate-ping"></div>
                      )}
                      
                      {/* Failed animation */}
                      {step.status === 'failed' && (
                        <div className="absolute inset-0 bg-red-400 rounded-full opacity-10 animate-bounce"></div>
                      )}
                      
                      {getStepIcon(step.status)}
                    </div>
                    
                    {/* Step Content */}
                    <div className="mt-6 text-center transform transition-all duration-300 group-hover:translate-y-1">
                      <p className={`text-sm font-semibold ${getTextColors(step.status)} mb-2`}>
                        {step.label}
                      </p>
                      
                      {/* Date and Time */}
                      <div className="text-xs text-gray-600 space-y-1 mt-2">
                        {step.date && step.time ? (
                          <>
                            <div className="flex items-center justify-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(step.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center justify-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{step.time}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-400 italic">
                            Pending
                          </div>
                        )}
                      </div>
                      
                      {/* Status Badges */}
                      {step.status === 'current' && (
                        <div className="mt-2">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 font-medium animate-pulse">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse"></div>
                            In Progress
                          </div>
                        </div>
                      )}
                      
                      {step.status === 'failed' && (
                        <div className="mt-2">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 font-medium">
                            <AlertCircle className="h-3 w-3 mr-1 animate-bounce" />
                            Failed
                          </div>
                        </div>
                      )}
                      
                      {step.status === 'pending' && (
                        <div className="mt-2">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-500 font-medium">
                            <Clock className="h-3 w-3 mr-1 animate-spin" />
                            Pending
                          </div>
                        </div>
                      )}
                      
                      {step.status === 'completed' && (
                        <div className="mt-2">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                            <CheckCircle className="h-3 w-3 mr-1 animate-pulse" />
                            Completed
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Policy Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Policy Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Policy Information</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Policy Number</label>
                  <p className="text-lg font-mono text-blue-600 bg-white px-3 py-2 rounded-lg border">{policy.policynumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Endorse Effective Date</label>
                  <p className="text-lg font-semibold text-gray-900 bg-white px-3 py-2 rounded-lg border">
                    {new Date(policy.endorseeffectivedate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Transaction Type</label>
                  <p className="text-lg font-semibold text-gray-900 bg-white px-3 py-2 rounded-lg border">{policy.transactiontype}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Issued Date</label>
                  <p className="text-lg font-semibold text-gray-900 bg-white px-3 py-2 rounded-lg border">
                    {new Date(policy.issueddate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Details */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Premium Details</h4>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">Premium Amount</label>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <p className="text-3xl font-bold text-orange-600">${policy.premium.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Download Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyViewModal;