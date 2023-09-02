export default function findMainCategoryById(mainCategories, targetIdWithPrefix) {
  // Remove the 'category-' prefix from the target ID
  const targetId = targetIdWithPrefix.replace('category-', '');

  // Iterate through the main categories
  for (const mainCategoryWrapper of mainCategories) {
    const mainCategory = mainCategoryWrapper.mainCategory;
    if (mainCategory.id === targetId) {
      return mainCategory; // Return the mainCategory object if ID matches
    }
  }

  return null; // Return null if no matching mainCategory is found
}
