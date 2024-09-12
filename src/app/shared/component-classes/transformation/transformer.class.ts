import { ProductStatusEnum } from "@store/enums/products-status.enum";
import { ILook } from "@store/models/looks.model";
import { IProduct, IProductColor, IProductSize } from "@store/models/product.model";

export class Transformer{

    static products(incoming: any[]): IProduct[]{
        
        return incoming.flatMap((product) => {

            const created_at = (product.dateTime).split('T')[0];
            const featureImages: string[] = product.featureimages.flatMap((image: any) => {
                return image.image
            });
            const productColors: IProductColor[] = product.product_ColorId.flatMap((color: any) => {
                return {
                    id: color.color_id,
                    color: color.color_name,
                    hexCode: color.hexacode
                }
            });

            // const productSizes: IProductSize[] = (product.product_Size);
            
            return {
                id: product.id,
                ID: product.id_product_reference ?? '',
                imagePath: product.image_path,
                featureImages: featureImages,
                coverImage: product.coverimage,
                name: product.name,
                description: product.description,
                subcategory: {
                    id: (product.subcategories[0]) ? product.subcategories[0].id : '',
                    name: (product.subcategories[0]) ? product.subcategories[0].name : 'Não categorizado',
                    slug: (product.subcategories[0]) ? product.subcategories[0].slug : 'nao-categorizado',
                    parent_id: (product.subcategories[0]) ? product.subcategories[0].category_id : ''
                },
                quantity: (product.status[0]) ? product.status[0].quantity : 0,
                status: (product.status[0] && product.status[0].status) ? ProductStatusEnum.AVAILABLE : ProductStatusEnum.UNAVAILABLE,
                favoritesCount: product.favourite_count,
                created_at: created_at,
                price: product.price,
                promotion_price: 0,
                money_raised: product.money_raised,
                colors: productColors,
                sizes: []
            }
        });
    }

    static looks(incoming: any[]): ILook[]{
        return [];
    }

}