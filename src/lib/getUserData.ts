const API_URL = 'https://api.github.com/users/';

export default async function getUserData(username: string) {
  try {
    const res = await fetch(`${API_URL}${username}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
