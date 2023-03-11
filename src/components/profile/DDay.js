function DDay(specificDay) {
  const today = new Date();
  const dday = new Date(specificDay);
  const gap = dday.getTime() - today.getTime();
  const result = Math.ceil(gap / (1000 * 60 * 60 * 24));
  return result;
}

export default DDay;
