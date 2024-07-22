const TableSkeleton = () => {
  return (
    <>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-slate-700 w-48 mb-4"></div>
        <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-700 mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default TableSkeleton;