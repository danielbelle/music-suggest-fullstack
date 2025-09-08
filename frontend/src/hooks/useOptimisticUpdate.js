import { useState } from "react";

export function useOptimisticUpdate() {
  const [optimisticData, setOptimisticData] = useState({});
  const [originalData, setOriginalData] = useState({});

  const optimisticUpdate = (id, updates, currentData) => {
    // Salva o estado original para possível rollback
    setOriginalData((prev) => ({
      ...prev,
      [id]: currentData.find((item) => item.id === id),
    }));

    // Aplica a atualização otimista
    setOptimisticData((prev) => ({
      ...prev,
      [id]: updates,
    }));

    return currentData.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
  };

  const optimisticCreate = (tempId, newItem, currentData) => {
    setOptimisticData((prev) => ({
      ...prev,
      [tempId]: { ...newItem, __temp: true },
    }));

    return [...currentData, { ...newItem, id: tempId, __temp: true }];
  };

  const optimisticDelete = (id, currentData) => {
    const itemToDelete = currentData.find((item) => item.id === id);
    setOriginalData((prev) => ({
      ...prev,
      [id]: itemToDelete,
    }));

    setOptimisticData((prev) => ({
      ...prev,
      [id]: { __deleted: true },
    }));

    return currentData.filter((item) => item.id !== id);
  };

  const commitUpdate = (id) => {
    setOptimisticData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    setOriginalData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  const rollbackUpdate = (id, currentData) => {
    const original = originalData[id];
    setOptimisticData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    setOriginalData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    if (original) {
      return currentData.map((item) => (item.id === id ? original : item));
    }
    return currentData.filter((item) => item.id !== id);
  };

  const getOptimisticData = (id) => optimisticData[id];

  return {
    optimisticUpdate,
    optimisticCreate,
    optimisticDelete,
    commitUpdate,
    rollbackUpdate,
    getOptimisticData,
    optimisticData,
  };
}
