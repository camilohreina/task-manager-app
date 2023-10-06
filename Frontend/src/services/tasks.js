import { API_URL } from "../config";

export const createTask = async ({ content, columnId }) => {
  try {
    const response = await fetch(`${API_URL}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify({ description: content, state: columnId }),
    });
    const data = await response.json();
    return { id: data.id, title: data.description, columnId: data.state };
  } catch (error) {
    console.log(error);
    throw new Error("Cannot create task");
  }
};

export const getTasksByUser = async () => {
  const token = localStorage.getItem("userToken");

  try {
    const response = await fetch(`${API_URL}task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    const listData = data.map((item) => ({
      id: item.id,
      content: item.description,
      columnId: item.state,
    }));
    return listData;
  } catch (error) {
    throw new Error("Cannot get tasks");
  }
};
