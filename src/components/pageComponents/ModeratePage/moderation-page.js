import React, { useEffect, useState } from 'react';
import { preloadModerationProductData } from '../../preLoadMenuData/preloadModerationProducts';
import { updateModerationStatus } from '../../apiComponents/api-products';

const ModerateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await preloadModerationProductData();
      setProducts(data || []);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleModeration = async (productId, status) => {
    const updatedProduct = await updateModerationStatus(productId, status);
    if (updatedProduct) {
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== productId)
      );
    } else {
      alert(`Failed to update product moderation status to ${status}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading products waiting for moderation...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">No products to be moderated at this point.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Products Awaiting Moderation</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <img
                  src={product.prodImagePath}
                  alt={product.prodName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{product.prodName}</h3>
                  <p className="text-green-600 font-bold mt-1">R{product.prodPrice}</p>
                </div>
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    onClick={() => handleModeration(product.id, 'approved')}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleModeration(product.id, 'rejected')}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ModerateProducts;
