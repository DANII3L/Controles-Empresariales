import React from 'react';

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="border rounded-md px-4 py-3 bg-gray-50">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
};

export default InfoItem;
