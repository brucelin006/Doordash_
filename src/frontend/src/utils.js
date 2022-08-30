export const login = (credential) => {
  const url = `/login?username=${credential.username}&password=${credential.password}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  });
};

export const signup = (data) => {
  const url = "/signup";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  });
};

export const getMenus = (restaurantId) => {
  const url = `/restaurant/${restaurantId}/menu`;

  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get menus");
    }
    return response.json();
  });
};

export const getRestaurants = () => {
  const url = `/restaurants`;

  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get restaurants");
    }
    return response.json();
  });
};

export const getCart = () => {
  const url = `/cart`;

  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
    }
    return response.json();
  });
};

export const checkout = () => {
  const url = `/checkout`;

  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout");
    }
  });
};

export const addItemToCart = (itemId) => {
  const url = `/order/${itemId}`;

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout");
    }
  });
};
