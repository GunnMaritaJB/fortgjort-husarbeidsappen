export const collections = {
  rewardsByHousehold: (householdID: string) =>
    `households/${householdID}/rewards`,

  rewardDocPath: (householdId: string, rewardID: string) =>
    `households/${householdId}/rewards/${rewardID}`,
};
