export interface IUnsubscribeEntry {
  userId: number;
  subscription: string;
  createdAt?: Date;
};

export interface IUserUnsubscribeStore {
  insert(item: IUnsubscribeEntry): Promise<void>;
  delete(item: IUnsubscribeEntry): Promise<void>;
}
