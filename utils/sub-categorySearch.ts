import { Category } from '@commercetools/platform-sdk';

interface AllCategories {
  mainCategory: Category;
  subCategory: Category[];
}

export default function findMainCategoryById(mainCategories: AllCategories[], targetIdWithPrefix: string) {
  const targetId = targetIdWithPrefix && targetIdWithPrefix.replace('category-', '');

  for (const mainCategoryWrapper of mainCategories) {
    const mainCategory = mainCategoryWrapper.mainCategory;
    if (mainCategory.id === targetId) {
      return mainCategory;
    }
  }

  return null;
}
