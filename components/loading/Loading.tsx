const Loading = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="h-9 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Recent Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 mb-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-blue-100 rounded-full animate-pulse"
                  style={{ width: `${Math.random() * 60 + 30}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Expenses Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="h-5 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
