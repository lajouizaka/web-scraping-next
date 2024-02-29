import { Product } from '@/app/products/List';
import { AnyNode, Cheerio } from 'cheerio';

export function extractDataFromCard(el: Cheerio<AnyNode>): Product {
    const imageSrc = el.find('.s-image').attr('src');

    const ratingsText = el
        .find('span.a-size-base.s-underline-text')
        .text()
        .replaceAll(',', '.');

    const avgRatingsText = el.find('span.a-icon-alt').text();

    const avgRatings =
        avgRatingsText !== ''
            ? parseFloat(avgRatingsText.slice(0, avgRatingsText.indexOf(' ')))
            : 0;

    return {
        title: el.find('h2 > a > span').text(),

        url: `https://amazon.com${el.find('h2 > a').attr('href')}`,

        image_url: el.find('.s-image').attr('src') ?? '',

        image_path: imageSrc ? new URL(imageSrc).pathname.split('/').pop() : '',

        ratings: ratingsText !== '' ? parseFloat(ratingsText) : 0,

        avg_rating: avgRatings,

        price: parseFloat(
            el.find('.a-price-whole').text() +
                el.find('.a-price-fraction').text()
        ),
    };
}
