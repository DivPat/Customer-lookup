export interface Customer {
    CustomerAddressList: {CustomerAddress: CustomerAddress};
    CustomerID: string;
    FirstName: string;
    LastName: string;
    EmailID: string;
    Phonenumber: string;
    FullName?: string;
    CustomerAddressLine?: string;
}

export interface CustomerAddress {
        AddressID: string;
        AddressLine1: string;
        AddressLine2?: string;
        City: string;
        Country: string;
        State: string;
        ZipCode: string;
}

export interface CustomerList {
        TotalNumberOfRecords: number;
        Customer: Customer[];
}

export interface CustomerResponse {
    CustomerList: CustomerList;
}

export interface InterestedProductsResponse {
    CustomerInterestedItemsList: CustomerInterestedItemsList;
}


export interface CustomerInterestedItemsList {
    Item: ItemDetails[]
}

export interface ItemDetails {
    PrimaryInformation : PrimaryInformation;
    ComputedPrice: ComputedPrice;
    ItemID: string;
    CustomerID: string;
}

export interface PrimaryInformation {
    DisplayDescription: string;
    ImageURL: string;
}

export interface ComputedPrice {
    UnitPrice: string;
    Currency:string;
}