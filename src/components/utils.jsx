async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const isNumber = (n) => typeof n === "number" && !isNaN(n);

export { isNumber, fetchData };
