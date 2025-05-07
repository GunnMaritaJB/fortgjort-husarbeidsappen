export interface Reward {
  id: string;
  name: string;
  pointPrice: number;
  addedBy: string;
  availableFor: string[]; // List of user IDs who can redeem this reward
}
