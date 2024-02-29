'use client';
import { useState } from 'react';
import SearchForm from './SearchForm';

export type SearchResult = {
    id: number;
    created_at: string;
};

export type Product = {
    id?: number;
    image_url: string;
    image_path: string | undefined;
    title: string;
    url: string;
    avg_rating: number;
    ratings: number;
    price: number;
    search_result_id?: number;
};

export default function List() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    return (
        <>
            <SearchForm setProducts={setProducts} setIsLoading={setIsLoading} />

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <span className="animate-spin size-10 rounded-full border-b-2 border-l-2 border-yellow-600 inline-block mt-8"></span>
                </div>
            ) : null}

            <div className="-mx-px mt-5 border-l border-slate-800 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {!isLoading
                    ? products.map(
                          ({
                              title,
                              url,
                              price,
                              avg_rating,
                              ratings,
                              image_url,
                          }) => (
                              <div
                                  key={url}
                                  className="group relative p-4 border-r border-b border-slate-800 sm:p-6"
                              >
                                  <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                                      <img
                                          src={image_url}
                                          alt={title}
                                          className="w-full h-40 object-center object-cover"
                                      />
                                  </div>
                                  <div className="pt-10 pb-4 text-center">
                                      <h3 className="text-sm font-medium text-slate-900 dark:text-gray-100">
                                          <a href={url}>
                                              <span
                                                  aria-hidden="true"
                                                  className="absolute inset-0"
                                              />
                                              {title
                                                  .split(' ')
                                                  .slice(0, 4)
                                                  .join(' ')}
                                          </a>
                                      </h3>
                                      <div className="mt-3 flex flex-col items-center">
                                          <p className="sr-only">
                                              {avg_rating} out of 5 stars
                                          </p>
                                          <div className="flex items-center">
                                              {/* {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                    ))} */}
                                          </div>
                                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                              {ratings} reviews
                                          </p>
                                      </div>
                                      <p className="mt-4 text-base font-medium text-yellow-600">
                                          {price} $
                                      </p>
                                  </div>
                              </div>
                          )
                      )
                    : null}
            </div>
        </>
    );
}
