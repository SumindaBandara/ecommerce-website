function Tab(props) {
  if (props.selectedCategory === props.category._id) {
    return (
      <button
        className="border px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-[#edeef1] text-sm sm:text-base font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 hover:bg-[#d9dae0] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => props.onClick(props.category._id)}
      >
        {props.category.name}
      </button>
    );
  }

  return (
    <button
      className="border border-[#edeef1] px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 hover:bg-[#f5f6f8] hover:border-[#d9dae0] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={() => props.onClick(props.category._id)}
    >
      {props.category.name}
    </button>
  );
}

export default Tab;