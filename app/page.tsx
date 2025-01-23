import DashboardMetrics from "./components/dashboard/DashboardMetrics";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Download Report
        </button>
      </div>

      <DashboardMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
          {/* Add your chart component here */}
          <div className="h-full bg-gray-50 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add your activity list here */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 py-3 border-b"
              >
                <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Activity {i + 1}</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
