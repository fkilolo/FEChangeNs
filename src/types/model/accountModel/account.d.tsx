export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        userName: string;
        role: {
            _id: string;
            name: string;
        },
        teams: [
            {
                _id: string;
                name: string;
            }
        ],
        permissions: {
            _id: string;
            name: string;
            apiPath: string;
            method: string;
            module: string;
        }[]
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }