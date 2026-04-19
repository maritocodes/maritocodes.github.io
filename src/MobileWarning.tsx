// MobileWarning.tsx
const MobileWarning = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00122e] text-white p-8 text-center px-6">
      <div className="max-w-md border border-[#2F4D78] bg-[#10151D] p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-[#FF9000]">
          Desktop Only
        </h1>
        <p className="text-gray-300 leading-relaxed mb-6">
          This page includes 3D elements and is not optimized for small mobile devices.
        </p>
        <p className="text-sm text-gray-400">
          Please, visit this page from a computer to see it fully.
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;