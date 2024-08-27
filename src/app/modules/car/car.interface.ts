
export interface TCar {
    name: string;
    description: string;
    color: string;
    location: string;
    FuelType: string;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
}
