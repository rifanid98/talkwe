import moment from "moment";
import { useEffect, useRef } from "react";
import jwt_decode from 'jwt-decode';

export const getPath = (path = "") => (path ? `/${path}` : "");
export const getCustomUrl = (url = "") => url;
export const createHeader = (value = {}, base = {}) => ({
  ...base,
  ...value
});

export const createUrlParamFromObj = (params = null) => {
  if (!params) return "";
  const result = [];
  Object.keys(params).map(key => result.push(`${key}=${params[key]}`));
  return `?${result.join("&")}`;
};

export const createPropsFromObj = (routes = null) => {
  if (!routes) return "";
  const result = [];
  Object.keys(routes).map(key => result.push(`${key}=${routes[key]}`));
  return `${result.join(" ")}`;
};

export const getContentType = (type = "") => {
  switch (type) {
    case "form-data":
      return "multipart/form-data";
    default:
      return "application/json";
  }
};

export const handleAsync = async promise => {
  try {
    const response = await promise;
    return [response, undefined];
  } catch (err) {
    return [undefined, err];
  }
};

export const convertDate = date => {
  // if (!date) return null;
  if (!date) {
    return moment().format("DD ddd MMM YYYY")
  } else {
    return moment(date).format("DD MMMM YYYY");
  }
};

export const decodeJwtToken = jwtToken => {
  try {
    var decoded = jwt_decode(jwtToken);
    return decoded;
  } catch (error) {
    return jwtToken;
  }
}

export const convertISODate = (myDate, showTime = true) => {
  const newDate = new Date(myDate);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1) < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
  const date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const hours = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
  const minutes = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
  const seconds = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds();

  return showTime ? `${year}-${month}-${date} ${hours}:${minutes}:${seconds}` : `${year}-${month}-${date}`;
}

export const useEventListener = (eventName, handler, element = window) => {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On 
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};