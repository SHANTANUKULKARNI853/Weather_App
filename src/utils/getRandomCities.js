const cities = [
    "New York", "London", "Paris", "Tokyo", "Mumbai", "Sydney", "Cairo", "Dubai", "Beijing", "Berlin"
  ];
  
  export const getRandomCities = (count = 3) => {
    const shuffled = cities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  