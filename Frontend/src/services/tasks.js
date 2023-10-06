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
    console.log(data);
  } catch (error) {
    console.log(error);
    throw new Error("Cannot create task");
  }
};

export const getTasksByUser = async () => {
  const token = localStorage.getItem("userToken");
  fetch(`${API_URL}task`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
