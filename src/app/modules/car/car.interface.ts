
export interface TCar {
    name: string;
    description: string;
    color: string;
    location: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
}
