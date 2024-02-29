import { Product } from '@/app/products/List';
import { extractDataFromCard } from './extract-data';
import { loadPage } from './load-html';
import { ProductStore } from '@/app/db/product-store';
import { ResultStore } from '@/app/db/result-store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const searchKeyword = searchParams.get('search')?.replaceAll(' ', '+');

    if (searchKeyword === '') {
        return Response.json({ error: 'Invalid Search' }, { status: 422 });
    }

    const url = `s?k=${searchKeyword}`;

    const $ = await loadPage(url);

    // HTML product card
    const productsCards = $(
        '.s-result-list.s-search-results [data-component-type="s-search-result"]'
    );

    const carousels = $(
        '.s-result-list.s-search-results > [data-index] ol.a-carousel'
    );

    let htmlCards = [...productsCards.toArray()];

    carousels.each(function () {
        // Add ol elements to cards
        htmlCards = [...htmlCards, ...$(this).children().toArray()];
    });

    const products: Product[] = htmlCards.map(el => extractDataFromCard($(el)));

    const resultStore = new ResultStore();

    const search_result_id = await resultStore.store();

    if (search_result_id) {
        const productStore = new ProductStore();

        await productStore.storeMany(
            products.map(product => ({ ...product, search_result_id }))
        );
    }

    return Response.json({ products: products });
}
