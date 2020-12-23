import Table from './Table-view';

import ViewDate from './Date-view';

import List from './List-view';

import Observer from './Observer';

import Search from './Search-view';

it('it is possible to call new Table()', () => {
  const testTable = new Table();
  expect(testTable).toBeTruthy();
});
it('it is possible to call new ViewDate()', () => {
  const testDate = new ViewDate();
  expect(testDate).toBeTruthy();
});
it('it is possible to call new List()', () => {
  const testList = new List();
  expect(testList).toBeTruthy();
});
it('it is possible to call new Observer()', () => {
  const testObserver = new Observer();
  expect(testObserver).toBeTruthy();
});
it('it is possible to call new Search()', () => {
  const testSearch = new Search();
  expect(testSearch).toBeTruthy();
});
