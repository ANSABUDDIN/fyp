const env = import.meta.env;

export const tabelDateFormate = "DD-MMM-YYYY";
export const primaryColor = "#2563eb";
export const tabelPageSize = 330;
export const recordsPerPage = 10;
export const baseApiUrl = env.VITE_API_URL;
console.log("baseApiUrl", baseApiUrl);
// export const baseApiUrl = 'https://pos-backend-phi.vercel.app/api/v1/';
