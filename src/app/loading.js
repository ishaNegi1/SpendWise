export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
      <div className="relative w-14 h-14 animate-spin">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #0b1a33, #1e3a8a, #5b21b6, transparent 90%)",
          }}
        ></div>

        <div className="absolute inset-1 bg-[#eef2ff] rounded-full"></div>
      </div>
    </div>
  );
}