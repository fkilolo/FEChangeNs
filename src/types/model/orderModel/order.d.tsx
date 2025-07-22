import { IBasic, IName } from "../base/base.d";
import { IBrand } from "../brandModel/brand.d";
import { ICart } from "../cart/cart.d";
import { ITeam } from "../teamModel/team.d";

export interface IOrder extends IBasic {
    _id?: string;
    name?: string;
    code?: string;
    status?: { 
        _id: string;
        name: string;
        code: string;
    };
    brand?: IBrand | IName;
    team?: ITeam | IName;
    cart?: ICart;
    totalPriceUSD?: number;
    totalPriceVND?: number;
    totalBuyPriceUSD?: number;
    totalBuyPriceVND?: number;
}