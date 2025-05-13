export const collections = {
  rewardsByHousehold: (householdID: string) =>
    `households/${householdID}/rewards`,

  rewardDocPath: (householdId: string, rewardID: string) =>
    `households/${householdId}/rewards/${rewardID}`,

  childrenByHousehold: (householdID: string) =>
      `households/${householdID}/children`,

  childDocPath: (householdId: string, childID: string) =>
      `households/${householdId}/children/${childID}`,

};

