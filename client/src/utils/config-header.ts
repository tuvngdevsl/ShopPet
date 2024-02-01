export const config = (token: any) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  };

  return { headers };
};
