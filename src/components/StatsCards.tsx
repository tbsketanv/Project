import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, DollarSign } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    booked: number;
    rejected: number;
    inProcess: number;
    pending: number;
    outstandingPremium: number;
  };
  onCardClick?: (type: string) => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, onCardClick }) => {
  const cards = [
    {
      title: 'Booked',
      value: stats.booked,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      type: 'Booked',
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      type: 'Rejected',
    },
    {
      title: 'In Process',
      value: stats.inProcess,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      type: 'InProcess',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: AlertCircle,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      type: 'Pending',
    },
    {
      title: 'Outstanding Premium',
      value: `$${stats.outstandingPremium.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-teal-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      borderColor: 'border-teal-200',
      type: 'outstanding',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`${card.bgColor} ${card.borderColor} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            onClick={() => onCardClick && onCardClick(card.type)}
          >
            <div className="flex items-center space-x-4">
              <div className={`${card.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className={`text-sm font-bold ${card.textColor} group-hover:scale-105 transition-transform`}>
                  {card.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;