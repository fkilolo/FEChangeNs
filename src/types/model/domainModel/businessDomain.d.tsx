import { IBasic, IName } from "../base/base.d";
import { IBrand } from "../brandModel/brand.d";
import { ITeam } from "../teamModel/team.d";

export interface IBusinessDomain extends IBasic {
  _id?: string;
  domainBusinessId?: string;
  name?: string;
  status?: string;
  balance?: string;
  brand?: IBrand | IName;
  team?: ITeam | IName;
  user?: {
    _id?: string;
    username?: string;
  };
  brandReferer?: string;
}
