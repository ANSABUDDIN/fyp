import {
  UploadResponse,
  UploadResultMulti,
  UploadResultSingle,
} from "@/interfaces";
import axios from "axios";

export class CloudUploadService {
  private cloudName: string;
  private uploadPreset: string;

  constructor(cloudName: string, uploadPreset: string) {
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
  }

  private async uploadFile(file: any): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file.originFileObj);
    formData.append("upload_preset", this.uploadPreset);

    return (
      await axios.post(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
    ).data;
  }

  async uploadSingleFile(file: any): Promise<UploadResultSingle> {
    try {
      const url = await this.uploadFile(file);
      return { url: url?.toString(), status: true };
    } catch (error) {
      console.error(error);
      return { status: false };
    }
  }

  async uploadMultipleFiles(selectedFiles: any[]): Promise<UploadResultMulti> {
    try {
      const uploads = await Promise.all(
        selectedFiles?.map((file) => this.uploadFile(file))
      );
      return { urls: uploads?.map((upload) => upload.url), status: true };
    } catch (error) {
      console.error(error);
      return { urls: [], status: false };
    }
  }
}

const cloudUploadService = new CloudUploadService("dq1vume1b", "almpos");

export default cloudUploadService;
