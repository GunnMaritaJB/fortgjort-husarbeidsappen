export interface Reward {
  rewardID: string;
  name: string;
  pointPrice: number;
  addedBy: string;
}

export interface RewardInputFromFrom {
  name: string;
  pointPrice: number;
}
