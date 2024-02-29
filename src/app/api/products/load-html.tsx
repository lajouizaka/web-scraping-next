import { httpClient } from '@/app/http-client';
import { CheerioAPI, load } from 'cheerio';

export const loadPage = async (url: string): Promise<CheerioAPI> => {
    try {
        const { data } = await httpClient.get(url); //.catch(err => console.log(err));
        return load(data);
    } catch (error) {
        throw Error('Error: ' + error);
    }
};
