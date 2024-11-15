import type { IStore } from './store';

export interface IFeatureType {
    id: string;
    name: string;
    description: string;
    lifetimeDays: number | null;
}

export interface IFeatureTypeStore extends IStore<IFeatureType, string> {
    getByName(name: string): Promise<IFeatureType>;
    updateLifetime(
        name: string,
        newLifetimeDays: number | null,
    ): Promise<IFeatureType | undefined>;
}
