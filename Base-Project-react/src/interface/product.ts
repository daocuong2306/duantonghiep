export interface IProduct {
    status: number;
    product: {
        id?: number | string;
        name: string;
        price: number;
        description: string;
        status: number;
        code: string;
        image: string | null;
        quantity: number;
        id_category: number;
    }
}