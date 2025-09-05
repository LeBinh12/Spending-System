function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-white text-lg font-medium">Đang tải trang...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
