import Observer from './Observer';

export default class Switcher extends Observer {
  constructor(switcher) {
    super();
    this.switcher = switcher;
  }

  initialize(index, dictionary) {
    this.indexes = dictionary;
    const leftArrow = document.createElement('div');
    leftArrow.className = 'switcher__arrow-container_left';

    const indexBox = document.createElement('span');
    indexBox.className = 'switcher__text';
    indexBox.textContent = this.indexes[index];

    const rightArrow = document.createElement('div');
    rightArrow.className = 'switcher__arrow-container_right';

    this.switcher.append(leftArrow, indexBox, rightArrow);

    const selectionTab = document.createElement('div');
    selectionTab.className = 'switcher__tab-list';
    const selectionTabList = document.createElement('ul');
    selectionTabList.className = 'switcher__list';
    for (let i = 0; i < 13; i++) {
      const selectionTabListItem = document.createElement('div');
      if (!i) {
        selectionTabListItem.className = 'switcher__list-header';
        selectionTabListItem.textContent = 'Select a tab';
      } else {
        selectionTabListItem.className = 'switcher__list-item';
        selectionTabListItem.textContent = Object.values(this.indexes)[i - 1];
        selectionTabListItem.addEventListener('click', () => {
          this.renderSwitcher(Object.keys(this.indexes)[i - 1]);
          super.broadcast(Object.keys(this.indexes)[i - 1]);
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

    document.addEventListener('click', (event) => this.hideSelectionTab(event));
  }

  showSelectionTab(event) {
    this.selectionTab.classList.toggle('switcher__tab-list_active');
    event.stopPropagation();
  }

  hideSelectionTab(event) {
    if (!event.target.closest('.switcher__tab-list')) {
      this.selectionTab.classList.remove('switcher__tab-list_active');
    }
  }

  renderSwitcher(index) {
    this.indexBox.textContent = this.indexes[index];
  }

  nextIndex(indexName) {
    const currentIndex = Object.values(this.indexes).indexOf(indexName);
    const nextIndex = (currentIndex + 1) % 12;
    const indexToRender = Object.keys(this.indexes)[nextIndex];
    super.broadcast(indexToRender);
    this.renderSwitcher(indexToRender);
  }

  previousIndex(indexName) {
    const currentIndex = Object.values(this.indexes).indexOf(indexName);
    const previousIndex = (currentIndex + 11) % 12;
    const indexToRender = Object.keys(this.indexes)[previousIndex];
    super.broadcast(indexToRender);
    this.renderSwitcher(indexToRender);
  }
}
