const TabButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-3 text-sm font-medium
      border-b-2 transition
      ${active
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-blue-600'}
    `}
  >
    {label}
  </button>
);
export default TabButton;