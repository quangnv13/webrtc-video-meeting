export interface IDataResponse<T> {
    meta: {
      code?: string;
      errors?: [
        {
          description?: string;
          field?: string;
        }
      ];
      message?: string;
      page?: number;
      size?: number;
      total?: number;
    };
    data?: T;
}
