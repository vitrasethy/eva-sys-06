export default function combine(json1, json2) {
  if (json1.category && json2.committees) {
    for (let category of json1.category) {
      // Iterate over the criteria array in each category
      for (let criteria of category.criteria) {
        // Iterate over the committees array in committees
        for (let committee of json2.committees) {
          // Iterate over the projects array in each committee
          for (let project of committee.projects) {
            // Iterate over the categories array in each project
            for (let projectCategory of project.categories) {
              // Find the matching criteria in projectCategory and add the user_score property
              const projectCriteria = projectCategory.criterias.find(
                (c) => c.id === criteria.id,
              );
              if (projectCriteria) {
                criteria.user_score = projectCriteria.score;
              }
            }
          }
        }
      }
    }
  }
  return json1;
}