export interface ISearchDomain {
    domainName?: string;
    supplier?: string;
    error?: string;
    status?: string;
    available?: string;
    priceUSD?: string;
    renewalUSD?: string;
    messageErrorPromise?: string;
    dynadot?: {
        _id?: string;
        name?: string;
        dynadotKey?: string;
        exchangeRate?: number;
    },
    gname?: {
        _id?: string;
        name?: string;
        appId?: string;
        appKey?: string;
        exchangeRate?: number;
    };
    epik?: {
        _id?: string;
        name?: string;
        userApiSignature?: string;
        exchangeRate?: number;
    };
    enom?: {
        _id?: string;
        name?: string;
        uid?: string;
        pw?: string;
        exchangeRate?: number;
    };
    name?: {
        _id?: string;
        name?: number;
        nameUser?: string;
        nameKey?: number;
        exchangeRate?: number;
    };
    godaddy?: {
        _id?: string;
        name?: string;
        key?: string;
        secret?: string;
        shopperId?: string;
        address1?: string;
        city?: string;
        country?: string;
        postalCode?: string;
        state?: string;
        email?: string;
        nameFirst?: string;
        nameLast?: string;
        phone?: string;
        exchangeRate?: number;
    };
    namecheap?: {
        _id?: string;
        name?: string;
        apiUser?: string;
        userName?: string;
        apiKey?: string;
        clientIp?: string;
        firstName?: string;
        lastName?: string;
        address1?: string;
        stateProvince?: string;
        zip?: string;
        country?: string;
        phone?: string;
        emailAddress?: string;
        city?: string;
        exchangeRate?: number;
    };
}