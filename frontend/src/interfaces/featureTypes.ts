/** Feature types: release, experiments, killswitch, permissions */
export interface IFeatureType {
  id: string;
  name: string;
  description: string;
  lifetimeDays: number;
}
