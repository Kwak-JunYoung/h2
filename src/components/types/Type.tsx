type GeoType = {
    lat: string,
    lng: string
}

type AddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
}

type CompanyType = {
    name: string,
    catchPhrase: string,
    bs: string
}

type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    company: CompanyType
}

type StateType = {
    userid: string,
    username: string,
    isLogon: boolean,
}

type ItemType = {
    userId: number;
    id: number;
    title: string;
}

type LogonAction =
    { type: "RESET", value: StateType } |
    { type: "LOGON", value: StateType } |
    { type: "LOGOUT", value: StateType };

export type { UserType, StateType, LogonAction, ItemType};