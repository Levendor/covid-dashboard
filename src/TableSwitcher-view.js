import Switcher from './Switcher-view';

export default class TableSwitcher extends Switcher {
  constructor(switcher) {
    super();
    this.switcher = switcher;
  }

  initialize(index, dictionary) {
    this.tableIndexes = dictionary;
    const leftArrow = document.createElement('div');
    leftArrow.className = 'switcher__arrow-container_left';

    const indexBox = document.createElement('span');
    indexBox.className = 'switcher__text';
    indexBox.textContent = this.tableIndexes[index];

    const rightArrow = document.createElement('div');
    rightArrow.className = 'switcher__arrow-container_right';

    this.switcher.append(leftArrow, indexBox, rightArrow);

    const selectionTab = document.createElement('div');
    selectionTab.className = 'switcher__tab-list';
    const selectionTabList = document.createElement('ul');
    selectionTabList.className = 'switcher__list';
    for (let i = 0; i < 5; i++) {
      const selectionTabListItem = document.createElement('div');
      if (!i) {
        selectionTabListItem.className = 'switcher__list-header';
        selectionTabListItem.textContent = 'Select a tab';
      } else {
        selectionTabListItem.className = 'switcher__list-item';
        selectionTabListItem.textContent = Object.values(this.tableIndexes)[i - 1];
        selectionTabListItem.addEventListener('click', () => {
          this.renderSwitcher(Object.keys(this.tableIndexes)[i - 1]);
          super.broadcast(Object.keys(this.tableIndexes)[i - 1]);
        });
      }
      selectionTabList.append(selectionTabListItem);
    }
    selectionTab.append(selectionTabList);
    this.switcher.append(selectionTab);

    this.leftArrow = leftArrow;
    this.indexBox = indexBox;
    this.rightArrow = rightArrow;
    this.selectionTab = selectionTab;

    this.leftArrow.addEventListener('click', () => this.previousIndex(indexBox.textContent));
    this.indexBox.addEventListener('click', (event) => this.showSelectionTab(event));
    this.rightArrow.addEventListener('click', () => this.nextIndex(indexBox.textContent));

    document.addEventListener('click', (event) => super.hideSelectionTab(event));
  }

  renderSwitcher(index) {
    if (index.startsWith('total')) {
      if (index.endsWith('Hundreds')) {
        this.indexBox.textContent = 'Indexes per 100 thousand';
      } else {
        this.indexBox.textContent = 'Total indexes';
      }
    } else if (index.startsWith('last')) {
      if (index.endsWith('Hundreds')) {
        this.indexBox.textContent = 'Indexes per 100 thousand in the last day';
      } else {
        this.indexBox.textContent = 'Total indexes in the last day';
      }
    }
  }

  nextIndex(indexName) {
    const currentIndex = Object.values(this.tableIndexes).indexOf(indexName);
    const nextIndex = (currentIndex + 1) % 4;
    const indexToRender = Object.keys(this.tableIndexes)[nextIndex];
    super.broadcast(indexToRender);
    this.renderSwitcher(indexToRender);
  }

  previousIndex(indexName) {
    const currentIndex = Object.values(this.tableIndexes).indexOf(indexName);
    const previousIndex = (currentIndex + 3) % 4;
    const indexToRender = Object.keys(this.tableIndexes)[previousIndex];
    super.broadcast(indexToRender);
    this.renderSwitcher(indexToRender);
  }
}
