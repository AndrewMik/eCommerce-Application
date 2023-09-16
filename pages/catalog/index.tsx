import { Category } from '@commercetools/platform-sdk';
import CatalogCards, { AllCategories } from '@/components/catalog/catalog';
import getAllCategories from '../api/get-categories';

export async function getStaticProps() {
  const categories = await getAllCategories();
  const allCategoriesList: AllCategories[] = [];

  if (typeof categories.response !== 'number' && categories.response) {
    const subCategoriesList: Category[] = [];
    const mainCategoriesList: Category[] = [];

    categories.response.forEach((categoryValue) => {
      if (categoryValue.ancestors.length !== 0) {
        subCategoriesList.push(categoryValue);
      } else {
        mainCategoriesList.push(categoryValue);
      }
    });

    mainCategoriesList.forEach((mainCategory) => {
      const matchingSubCategories = subCategoriesList.filter((subCategory) =>
        subCategory.ancestors.some((ancestor) => ancestor.id === mainCategory.id && ancestor.typeId === 'category'),
      );

      if (matchingSubCategories.length > 0) {
        allCategoriesList.push({
          mainCategory,
          subCategory: matchingSubCategories,
        });
      }
    });
  }
  return { props: { allCategoriesList } };
}

const CatalogPage = ({ allCategoriesList }: { allCategoriesList: AllCategories[] }) => {
  return (
    <>
      <CatalogCards allCategories={allCategoriesList} />
    </>
  );
};

export default CatalogPage;
