
export interface TCar {
    name: string;
    description: string;
    color: string;
    location: string;
    fuelType: string;
    photo: string;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
}
