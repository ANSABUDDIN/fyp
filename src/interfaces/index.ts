export interface CategoryData {
  key: React.Key;
  code: string;
  _id: string;
  name: string;
  description: string;
  categoryType: string;
  createdAt: string; // Assuming createdAt is a string representing a date
  address: string; // Assuming address is a string
  // Add any other fields as necessary
}

export interface CategoryQueryParams {
  page: number;
  pageSize: number;
  search: string;
  type: string;
  isPaginated: number;
}

export interface CategoryProps {
  data: CategoryData[];
  isPending: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface CreateCategoryProps {
  refetch: () => void; // Function type for refetch
  setOpen: (open: boolean) => void; // Function type for setOpen
  initialData: any; // Function type for setOpen
  isEdit: boolean;
  open: boolean;
}


export interface UploadResponse {
  url: string;
}

export interface UploadResultMulti {
  urls?: string[];
  status: boolean;
}

export interface UploadResultSingle {
  url?: string;
  status: boolean;
}