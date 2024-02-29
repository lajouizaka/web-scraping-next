import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://www.amazon.com',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
        'Accept-Language': 'en-US, en;q=0.5',
    },
});
