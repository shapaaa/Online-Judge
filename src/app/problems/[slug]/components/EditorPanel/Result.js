import LoadingSpinner from "@/app/components/LoadingSpinner";

const Result = ({ output, verdict, loading }) => {
  return (
    <div className="flex h-[80px] w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ">
      {loading ? (
        <LoadingSpinner />
      ) : !!output ? (
        output
      ) : !!verdict ? (
        verdict
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;
