'use client';

import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from '@/store/store'; // adjust path to your Redux store

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Toaster position="top-right" closeButton richColors />
            {children}
        </Provider>
    );
}