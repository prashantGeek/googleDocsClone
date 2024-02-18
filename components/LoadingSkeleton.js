const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton bg-gray-200 p-4 rounded-lg shadow-md">
      {/* Header skeleton */}
      <div className="header-skeleton h-12 bg-gray-300 mb-4 rounded-md"></div>

      {/* Modal skeleton */}
      <div className="modal-skeleton h-40 bg-gray-300 mb-4 rounded-md"></div>

      {/* Main content skeleton */}
      <div className="main-content-skeleton h-64 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default LoadingSkeleton;
