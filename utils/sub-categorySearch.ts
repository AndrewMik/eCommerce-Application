export default function findSubCategoryObject(mainCategories, targetIdWithPrefix) {
  // Remove the 'category-' prefix from the target ID
  const targetId = targetIdWithPrefix.replace('category-', '');

  // Iterate through the main categories
  for (const mainCategory of mainCategories) {
    const subCategories = mainCategory.subCategory;

    // Iterate through the subcategories
    for (const subCategory of subCategories) {
      const ancestors = subCategory.ancestors;

      // Iterate through the ancestors of the subcategory
      for (const ancestor of ancestors) {
        if (ancestor.id === targetId) {
          return subCategory; // Return the whole subcategory object
        }
      }
    }
  }

  return null; // Return null if no match is found
}
