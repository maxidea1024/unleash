export interface IStore<T, K> {
  get(key: K): Promise<T>;
  getAll(query?: Object): Promise<T[]>;
  exists(key: K): Promise<boolean>;
  delete(key: K): Promise<void>;
  deleteAll(): Promise<void>;
  destroy(): void;
}
