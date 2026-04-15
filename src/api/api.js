const BASE_URL = "https://internal-training-enrollement-system.onrender.com";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + getToken(),
});

export const registerUser = (data) =>
  fetch(`${BASE_URL}/user/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const loginUser = (data) =>
  fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const getAllTrainings = () =>
  fetch(`${BASE_URL}/request/training/all`, {
    headers: authHeaders(),
  }).then((r) => r.json());

export const enrollTraining = (id) =>
  fetch(`${BASE_URL}/request/training/enroll/${id}`, {
    method: "POST",
    headers: authHeaders(),
  }).then((r) => r.json());

export const getMyEnrollments = () =>
  fetch(`${BASE_URL}/request/training/my-enrollments`, {
    headers: authHeaders(),
  }).then((r) => r.json());

export const createTraining = (data) =>
  fetch(`${BASE_URL}/request/training/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const getMyTrainings = () =>
  fetch(`${BASE_URL}/request/training/my-trainings`, {
    headers: authHeaders(),
  }).then((r) => r.json());

export const decodeToken = (token) =>
  JSON.parse(atob(token.split(".")[1]));