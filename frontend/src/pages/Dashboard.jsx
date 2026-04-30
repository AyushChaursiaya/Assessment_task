import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useItems from '../hooks/useItems';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
    const { items, loading, getAllItems, deleteItem } = useItems();
    const { logout } = useAuth();


    useEffect(() => {
        getAllItems();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft':
                return 'bg-green-100 text-green-800';
            case 'published':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold">Items List</h1>
                    <div className="flex gap-4">
                        <Link to="/add-item" className="bg-[#155dfc] text-white px-4 py-2 rounded hover:bg-blue-600">
                            Add New Item
                        </Link>
                        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : items.length === 0 ? (
                    <p className="text-center text-gray-500">No items found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items?.data?.map((item) => (
                            <div key={item._id} className="bg-white border-[#645f5f80] border rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{item.description || 'No description'}</p>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/edit-item/${item._id}`}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteItem(item._id)}
                                        className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;