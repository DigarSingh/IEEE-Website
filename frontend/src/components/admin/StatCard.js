import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const StatCard = ({ title, value, icon, detail, bgColor, link }) => {
  return (
    <div className={`${bgColor || 'bg-white'} p-6 rounded-lg shadow-md transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className="p-2 rounded-full bg-white shadow-sm">
          {icon}
        </div>
      </div>
      <div className="mb-2">
        <p className="text-3xl font-bold">{value}</p>
        {detail && <p className="text-sm text-gray-600">{detail}</p>}
      </div>
      {link && (
        <Link href={link}>
          <span className="flex items-center mt-4 text-sm text-blue-600 cursor-pointer hover:text-blue-800">
            View Details <FaArrowRight className="ml-1" />
          </span>
        </Link>
      )}
    </div>
  );
};

export default StatCard;
