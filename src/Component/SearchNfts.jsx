import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchNFT = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [search, setSearch] = useState('');

    const debounce = (func, delay) => {
        let inDebounce;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const handleSearch = async () => {
        if (!search) {
            setApiResponse(null);
            return;
        }
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${search}`);
           // console.log(response.data.nfts);
            setApiResponse(response.data.nfts);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const debouncedSearch = debounce(handleSearch, 500);

    useEffect(() => {
        debouncedSearch();
    }, [search]);

    return (
        <div className="p-4">
            <input
                type="text"
                value={search}
                placeholder="Search for a nft"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 my-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {apiResponse && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {apiResponse.map((nft, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4">
                            <Link to={`/nft/${nft.id}`} className="text-blue-500 hover:text-blue-700">{nft.name}</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchNFT;