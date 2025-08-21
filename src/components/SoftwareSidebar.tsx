import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { name: 'Blast Information Management System', path: '/software' },
  { name: 'Pattern Analyser', path: '/software/pattern-analyser' },
  { name: 'Flyrock Predictor', path: '/software/flyrock-prediction' },
  { name: 'Blast Information Management System for Underground', path: '/software/blast-information-underground' },
  { name: 'Blast Designer for Surface Operations', path: '/software/blast-designer-surface' },
  { name: 'Blast Designer(BLADEST) for Tunnels', path: '/software/blast-designer-tunnel' },
  { name: 'Fragmentation Predictor Software', path: '/software/fragmentation-predictor' },
];

export default function SoftwareSidebar() {
  const location = useLocation();
  return (
    <aside className="w-full md:w-72 bg-white border-r border-gray-200 p-6 flex-shrink-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Blasting Solutions</h2>
      <ul className="space-y-4">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`text-lg font-medium ${location.pathname === item.path ? 'text-blue-800' : 'text-gray-700'} hover:text-blue-600`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
} 