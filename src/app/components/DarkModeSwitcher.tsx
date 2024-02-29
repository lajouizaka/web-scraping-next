'use client';
import { useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useLocalStorage } from '@uidotdev/usehooks';

function DarkodeSwitcher() {
    const [isDarkMode, setIsDarkMode] = useLocalStorage('dark', true);

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html')?.classList.add('dark');
        } else {
            document.querySelector('html')?.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            className={`relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block size-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    isDarkMode ? 'translate-x-4' : 'translate-x-0'
                }`}
            />
        </Switch>
    );
}

export default DarkodeSwitcher;
