export class BaseRespModel {
    statusCode: number;
    message: string | string[];
    error?: string;
}
