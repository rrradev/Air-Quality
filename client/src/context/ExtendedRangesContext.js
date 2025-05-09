import React, { createContext, useContext, useState, useEffect } from 'react';

const ExtendedRangesContext = createContext();

export const ExtendedRangesProvider = ({ children }) => {
    const [availableExtendedRanges, setAvailableExtendedRanges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExtendedRanges() {
            try {
                const response = await fetch('/api/available-extended-ranges');
                const data = await response.json();
                setAvailableExtendedRanges(data.ranges || []);
            } catch (error) {
                setAvailableExtendedRanges([]);
            } finally {
                setLoading(false);
            }
        }

        fetchExtendedRanges();
    }, []);

    return (
        <ExtendedRangesContext.Provider value={{ availableExtendedRanges, loading }}>
            {children}
        </ExtendedRangesContext.Provider>
    );
};

export const useExtendedRanges = () => useContext(ExtendedRangesContext);
