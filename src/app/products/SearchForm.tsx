import axios from 'axios';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Product } from './List';

type Props = {
    setProducts: Dispatch<SetStateAction<Product[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const fetchProducts = async (search: string) => {
    const { data } = await axios.get(
        `/api/products?search=${search.replaceAll(' ', '+')}`
    );

    return data.products;
};

export default function SearchForm({ setProducts, setIsLoading }: Props) {
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('Gaming Mouse');

    const submitHandler = async (ev: FormEvent) => {
        ev.preventDefault();

        if (search === '') {
            return setError('Please provide a search keyword ');
        }

        setIsLoading(true);

        const data = await fetchProducts(search);

        setIsLoading(false);
        setProducts(data);
    };

    return (
        <div className="mx-auto w-[90%] max-w-md mt-4">
            <form onSubmit={submitHandler} className="text-center">
                <h3 className="text-2xl font-bold">Search Products</h3>

                <div className="mt-4">
                    <input
                        type="text"
                        className={`rounded block w-full pr-10 sm:text-sm dark:bg-slate-900 dark:text-white dark:caret-slate-300 ${
                            false
                                ? 'border-red-500 placeholder-red-500 focus:outline-none focus:ring-red-500 focus:border-red-500'
                                : false
                                ? 'border-green-600 placeholder-green-600 focus:outline-none focus:ring-green-600 focus:border-green-600'
                                : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-slate-900 dark:border-slate-700'
                        }`}
                        placeholder="ex: Gaming Mouse"
                        value={search}
                        onChange={ev => setSearch(ev.target.value)}
                    />
                </div>

                <p className="mt-2 text-red-500 text-left">{error}</p>

                <button
                    type="submit"
                    className="mt-2 w-full px-4 py-2 min-w-20 text-sm inline-flex items-center justify-center border border-transparent font-medium rounded-md shadow-sm text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
