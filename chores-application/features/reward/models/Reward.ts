export interface Reward {
  rewardID: string;
  name: string;
  pointPrice: number;
  addedBy: string;
  // availableFor: string[]; // List of user IDs who can redeem this reward
}

export interface RewardInputFromFrom {
  name: string;
  pointPrice: number;
}
