export function debounce(cb) {
  let timeout;
  return (...args) => {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      cb(...args);
    }, 500);
  };
}
