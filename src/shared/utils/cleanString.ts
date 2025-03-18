const cleanString = (s: string) => {
  return s.replace(/[^\d]/g, "");
};

export default cleanString;
