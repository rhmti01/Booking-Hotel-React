import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch (url,query=" "){
    
    const  [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                setIsLoading(true);
                const { data } = await axios.get(
                    query ? `${url}?${query}` : url,
                    { signal: controller.signal }
                );
                setData(data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setData([]);
                    toast.error(error?.response?.data?.error || "Something went wrong.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();
    }, [url, query]);


    return{data,isLoading}
}