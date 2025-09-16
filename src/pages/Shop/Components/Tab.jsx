import React from 'react'; // Assuming React is imported elsewhere

function Tab(props) {
  const selected = props.selectedCategory === props.category._id;

  return (
    <button
      className={`
        border px-2 py-1 rounded-md
        ${selected ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-200 text-gray-500'}
        ${selected && 'font-bold'}
      `}
      onClick={() => props.onClick(props.category._id)}
    >
      {props.category.name}
    </button>
  );
}

export default Tab;