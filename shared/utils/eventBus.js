const listeners = {};

export const publish = (event, data) => {
  if (listeners[event]) {
    listeners[event].forEach(cb => cb(data));
  }
};

export const subscribe = (event, callback) => {
  if (!listeners[event]) listeners[event] = [];

  listeners[event].push(callback);

  return () => {
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  };
};