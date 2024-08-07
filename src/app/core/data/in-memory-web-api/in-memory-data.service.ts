import { BRANDS } from "@core/mocks/brands.mock";
import { CATEGORIES } from "@core/mocks/categories.mock";
import { LOOKS } from "@core/mocks/looks.mock";
import { PRODUCTS } from "@core/mocks/products.mock";
import { SUB_CATEGORIES } from "@core/mocks/subcategories.mock";
import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{

    createDb() {

        const products = PRODUCTS;
        const brands = BRANDS;
        const categories = CATEGORIES;
        const subcategories = SUB_CATEGORIES;
        const looks = LOOKS;

        return { products, brands, categories, subcategories, looks };

    }

}