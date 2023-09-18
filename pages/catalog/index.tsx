import { AttributeDefinition, Category } from '@commercetools/platform-sdk';
import CatalogCards, { AllCategories } from '@/components/catalog/catalog';
import getAllCategories from '../api/get-categories';
import getAttributes from '../api/get-attributes';

export async function getStaticProps() {
  const categories = await getAllCategories();
  const attributes = await getAttributes();

  const allCategoriesList: AllCategories[] = [];

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

  return { props: { allCategoriesList, attributes } };
}

const CatalogPage = ({
  allCategoriesList,
  attributes,
}: {
  allCategoriesList: AllCategories[];
  attributes: AttributeDefinition[];
}) => {
  return (
    <>
      <CatalogCards allCategories={allCategoriesList} attributes={attributes} />
    </>
  );
};

export default CatalogPage;
