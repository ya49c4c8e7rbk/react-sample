import { BaseRespModel } from 'src/models/base.resp.model';

export class ProfileRespModel extends BaseRespModel {
  data: {
    id: number;
    name: string;
    email: string;
    iat: number;
    exp: number;
  };
}
