import { compareDesc, parseISO } from 'date-fns';

// true if l is before r
const compareDates = (l, r) => (
  compareDesc(parseISO(l), r) === 1
);

// descending sort
export default (arr, userDaily, id) => {
  const len = arr.length;
  const key = parseISO(userDaily.date);
  let i;
  for (i = len - 1; (i >= 0 && compareDates(arr[i].date, key)); i--) {
    arr[i + 1] = arr[i];
  }

  arr[i + 1] = {
    id: id,
    date: userDaily.date,
    ans1: userDaily.ans1,
    ans2: userDaily.ans2,
    ans3: userDaily.ans3,
  };
  return arr;
};
