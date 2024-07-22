import { ColumnType } from 'antd/es/table';

export const rowSk = [
  "Test 1",
  "Test 2",
  "Test 3",
  "Test 4",
  "Test 5",
  "Test 6",
  "Test 7",
  "Test 8",
  "Test 9",
  "Test 10",
];

export const generateSkeletonColumns = (numRenderColumns: number): ColumnType<any>[] => {
  const columns: ColumnType<any>[] = [];

  for (let i = 0; i < numRenderColumns; i++) {
    columns.push({
      title: (
        <div className="h-3 bg-white rounded-full dark:bg-slate-400 w-full my-2"></div>
      ) as any, // Casting to any to bypass the type check
      dataIndex: `render${i}`,
      key: `render${i}`,
      align: "center",
      render: () => (
        <div className="h-3 bg-slate-200 rounded-full dark:bg-slate-700 w-full my-2"></div>
      ),
    });
  }

  return columns;
};
