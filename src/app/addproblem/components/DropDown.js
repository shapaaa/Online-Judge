const DropDown = ({ id, label, options, value, handleChange }) => {
  return (
    <div className="w-3/12 self-start">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
