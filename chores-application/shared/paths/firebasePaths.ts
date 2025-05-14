export const collections = {
  rewardsByHousehold: (householdID: string) =>
    `households/${householdID}/rewards`,

  rewardDocPath: (householdId: string, rewardID: string) =>
    `households/${householdId}/rewards/${rewardID}`,

  childrenByHousehold: (householdID: string) =>
      `households/${householdID}/children`,

  childDocPath: (householdId: string, childID: string) =>
      `households/${householdId}/children/${childID}`,

  tasksByHousehold: (householdId: string) => `households/${householdId}/tasks`,

  allChildren: () => 'children',
  childFromGlobalCollection: (childId: string) => `children/${childId}`,

  taskDocPath: (householdId: string, taskId: string) => `households/${householdId}/tasks/${taskId}`,


};

