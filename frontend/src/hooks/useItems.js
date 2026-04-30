import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";

function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/dashboard/all-items`, {
        withCredentials: true,
      });
      setItems(res.data.items || res.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch items");
      setLoading(false);
    }
  };

  const getItemById = async (id) => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/dashboard/get-by-id/${id}`,
        {
          withCredentials: true,
        },
      );
      return res.data.item || res.data;
    } catch (error) {
      setError("Failed to fetch item");
      return null;
    }
  };

  const createItem = async (itemData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/dashboard/add-items`,
        itemData,
        {
          withCredentials: true,
        },
      );
      alert("Item created!");
      getAllItems();
      setLoading(false);
      return true;
    } catch (error) {
      setError("Failed to create item");
      setLoading(false);
      return false;
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      setLoading(true);
      await axios.put(`${serverUrl}/api/dashboard/edit-items/${id}`, itemData, {
        withCredentials: true,
      });
      alert("Item updated!");
      getAllItems();
      setLoading(false);
      return true;
    } catch (error) {
      setError("Failed to update item");
      setLoading(false);
      return false;
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      setLoading(true);
      await axios.delete(`${serverUrl}/api/dashboard/item-by-id/${id}`, {
        withCredentials: true,
      });
      alert("Item deleted!");
      getAllItems();
      setLoading(false);
      return true;
    } catch (error) {
      setError("Failed to delete item");
      setLoading(false);
      return false;
    }
  };

  return {
    items,
    loading,
    error,
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
  };
}

export default useItems;
