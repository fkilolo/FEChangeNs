import { SupplierType } from "@/config/data/supplier";
import { IBasic, IName } from "../base/base.d";
import { IBrand } from "../brandModel/brand.d";
import { IDynadot } from "../dynadotModel/dynadot.d";
import { ITeam } from "../teamModel/team.d";

export interface IDomain extends IBasic {
  _id?: string;
  name?: string;
  brand?: IBrand | IName;
  team?: ITeam | IName;
  balance?: number;
  status?: string;
  nameServer1?: string;
  nameServer2?: string;
  mainKeyword?: string;
  plan?: string;
  note?: string;
  userManager?: [
    {
      _id: string;
      userName: string;
    }
  ];
  dynadot?: IDynadot | IName;
  supplier?: SupplierType;
  epik?: IName;
  enom?: IName;
  gname?: IName;
  nameSupplier?: IName;
  expireDate?: string;
}
