import { useEffect, useState } from "react";

export function useFetch(asyncFunction, deps) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);

        async function fetchData() {
            try {
                const result = await asyncFunction();

                if (cancelled) {
                    return;
                }

                setData(result);
                setLoading(false);
            } catch (requestError) {
                if (cancelled) {
                    return;
                }

                setError(requestError);
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            cancelled = true;
        };
    }, deps);

    return { data, loading, error };
}