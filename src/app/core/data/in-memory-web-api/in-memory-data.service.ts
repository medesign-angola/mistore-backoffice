import { BRANDS } from "@store/mocks/brands.mock";
import { CATEGORIES } from "@store/mocks/categories.mock";
import { LOOKS } from "@store/mocks/looks.mock";
import { PRODUCTS } from "@store/mocks/products.mock";
import { SUB_CATEGORIES } from "@store/mocks/subcategories.mock";
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