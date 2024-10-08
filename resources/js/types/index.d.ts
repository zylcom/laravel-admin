import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type Product = {
    id: string | number;
    name: string;
    description: string;
    stock: number;
    sold: number;
    price: number;
};

export interface Stats {
    icon: Function;
    name: string;
    data: string | number;
}
