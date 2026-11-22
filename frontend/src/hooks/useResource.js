import { useCallback, useEffect, useReducer } from "react";
import { apiRequest } from "../constants/api";
import { RESOURCES } from "../constants/adminResources";

const initialState = { items: [], loading: true, busy: false, error: "" };

function reducer(state, action) {
  switch (action.type) {
    case "load/start":
      return { ...state, loading: true, error: "" };
    case "load/success":
      return { ...state, loading: false, items: action.payload };
    case "request/start":
      return { ...state, busy: true, error: "" };
    case "request/error":
      return { ...state, busy: false, loading: false, error: action.payload };
    case "save/success":
      return { ...state, busy: false };
    case "delete/success":
      return {
        ...state,
        busy: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export function useResource(resourceKey) {
    const endpoint = RESOURCES[resourceKey]?.endpoint;
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const load = useCallback(async () => {
      if (!endpoint) return;
      dispatch({ type: "load/start" });
      try {
        const response = await apiRequest(endpoint);
        dispatch({ type: "load/success", payload: response.data ?? [] });
      } catch (error) {
        dispatch({ type: "request/error", payload: error.message });
      }
    }, [endpoint]);
  
    useEffect(() => {
      load();
    }, [load]);
  
    async function saveRecord(id, values) {
      dispatch({ type: "request/start" });
      try {
        await apiRequest(id ? `${endpoint}/${id}` : endpoint, {
          method: id ? "PATCH" : "POST",
          body: JSON.stringify(values),
        });
        dispatch({ type: "save/success" });
        await load();
        return true;
      } catch (error) {
        dispatch({ type: "request/error", payload: error.message });
        return false;
      }
    }
  
    async function deleteRecord(id) {
      dispatch({ type: "request/start" });
      try {
        await apiRequest(`${endpoint}/${id}`, { method: "DELETE" });
        dispatch({ type: "delete/success", payload: id });
      } catch (error) {
        dispatch({ type: "request/error", payload: error.message });
      }
    }
  
    return { ...state, load, saveRecord, deleteRecord };
  }