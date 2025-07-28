import { IBrand } from "@core/base-models/base/brands.model";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { LookStatus } from "@store/enums/look-status.enum";
import { ProductStatusEnum } from "@store/enums/products-status.enum";
import { ILook } from "@store/models/looks.model";
import { FilenameImage, IProduct, IProductColor, IProductSize } from "@store/models/product.model";

export class Transformer{

    static products(incoming: any[]): IProduct[]{
        return incoming.flatMap((product) => {

            const created_at = this.date((product.dateTime).split('T')[0], '-', '/');
            const featureImages: FilenameImage[] = product.featureimages.flatMap((image: any) => {
                return {
                    id: image.id,
                    image: image.image,
                    filename: image.filename
                }
            });
            let productColors: IProductColor[] = [];
            if(product.product_ColorId){
                 productColors = product.product_ColorId.flatMap((color: any) => {
                    return {
                        id: color.color_id,
                        color: color.colorname,
                        hexCode: color.hexacode,
                        imageColor: color.image_color,
                        filenameImage: color.filename_image
                    }
                });
            }

            // const productSizes: IProductSize[] = (product.product_Size);
            
            return {
                id: product.id,
                ID: product.id_product_reference ?? '',
                imagePath: product.image_path,
                featureImages: featureImages,
                coverImage: product.coverimage,
                coverImageFilename: product.coverimage_filename,
                name: product.name,
                description: product.description,
                brand: product.product_Brand.flatMap((brand: any) => {
                        return {
                            id: brand.id,
                            name: brand.name,
                            slug: brand.slug,
                            logo: brand.logo,
                            bgImage: brand.bgImage
                        }
                })[0],
                categories: (product.categories ?? []).flatMap((category: any) => {
                    return {
                        id: category.id,
                        name: category.name,
                        slug: category.slug
                    }
                }),
                subcategory: {
                    id: (product.subcategories && product.subcategories[0]) ? product.subcategories[0].id : '',
                    name: (product.subcategories && product.subcategories[0]) ? product.subcategories[0].name : 'Não categorizado',
                    slug: (product.subcategories && product.subcategories[0]) ? product.subcategories[0].slug : 'nao-categorizado',
                    parent_id: (product.subcategories && product.subcategories[0]) ? product.subcategories[0].category_id : ''
                },
                status: product.status,
                quantity: (product.status && product.status[0]) ? product.status[0].quantity : 0,
                // status: (product.status && product.status[0] && product.status[0].status) ? ProductStatusEnum.AVAILABLE : ProductStatusEnum.UNAVAILABLE,
                favoritesCount: product.favourite_count,
                created_at: created_at,
                price: product.price,
                promotion_price: (product.discount_status ?? []).flatMap((discounted_item: any) => discounted_item.discount_price),
                money_raised: product.money_raised,
                colors: productColors,
                sizes: (product.product_Size ?? []).flatMap((item: any) => ({
                    id: item.size_id,
                    size: item.size,
                }))
            }
        });
    }

    static draftLooks(incoming: any[]): any{
        return incoming.flatMap((draft: any) => {

            let images: string[] = [];

            if(draft.main_image){
                images = [ ...images, draft.main_image];
            }
            if(draft.feature_image_1){
                images = [ ...images, draft.feature_image_1];
            }
            if(draft.feature_image_2){
                images = [ ...images, draft.feature_image_2];
            }
            if(draft.feature_image_3){
                images = [ ...images, draft.feature_image_3];
            }

            return {
                id: draft.id ?? '',
                name: draft.title ?? '',
                slug: draft.slug ?? '',
                description: draft.description ?? '',
                images: images,
                status: draft.status,
                products: draft.product_id
            }
        })
    }

    static looks(incoming: any[]): ILook[]{
        return incoming.flatMap((look: any) => {
            return {
                id: look.looks.id,
                name: look.looks.title,
                slug: look.looks.slug,
                description: look.looks.description,
                status: LookStatus.PUBLISHED,
                images: [
                    look.looks.imagePath,
                    look.looks.feature_image_1,
                    look.looks.feature_image_2,
                    look.looks.feature_image_3,
                ],
                filenames: [
                    look.looks.filename_main_img,
                    look.looks.filename_feature_image_1,
                    look.looks.filename_feature_image_2,
                    look.looks.filename_feature_image_3,
                ],
                products: Transformer.products(look.productList)
            }
        })
    }
    
    static brands(incoming: any[]): IBrand[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                name: i.name,
                slug: i.slug,
                logoPath: i.logo,
                bgPath: i.bgImage
            }
        });
    }

    static categories(incoming: any[]): IProductCategory[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                name: i.name,
                slug: i.slug,
                subcategories: i.subcategories.flatMap((s: any) => {
                    return {
                        id: s.id,
                        name: s.name,
                        slug: s.slug,
                        // parent_id: s.category_id
                        parent_id: i.id
                    }
                })
            }
        });
    }

    static sizes(incoming: any[]): IProductSize[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                size: i.size,
                subcategory_id: i.subcategory_id
            }
        });
    }

    static colors(incoming: any[]): ColorOption[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                hexCode: i.color,
                colorName: i.description,
                selected: false
            }
        })
    }

    static date(date: string, currentSeparator: string, replacementSeparator: string): string{
        const year = date.split(currentSeparator)[0];
        const month = date.split(currentSeparator)[1];
        const day = date.split(currentSeparator)[2];

        return `${ day + replacementSeparator + month + replacementSeparator + year }`;
    }

}