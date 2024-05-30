import type { DeepPartial, SortOrder } from "@/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function createRestClient<TEntity, TEntityData, TFilters, TSort>(endpoint: string) {
  async function getAll(
    filters?: TFilters,
    sort?: TSort,
    order?: SortOrder,
    page?: number,
    limit?: number
  ): Promise<TEntity[]> {
    try {
      const response = await axios.get(`${API_URL}/${endpoint}`, { params: { ...filters, sort, order, page, limit } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function getOne(itemId: number): Promise<TEntity> {
    try {
      const response = await axios.get(`${API_URL}/${endpoint}/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function create(itemData: TEntityData): Promise<TEntity> {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, itemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function update(itemId: number, itemData: DeepPartial<TEntityData>): Promise<TEntity> {
    try {
      const response = await axios.put(`${API_URL}/${endpoint}/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function remove(itemId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${API_URL}/${endpoint}/${itemId}`);
      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }

  return {
    getAll,
    getOne,
    create,
    update,
    remove,
  };
}
