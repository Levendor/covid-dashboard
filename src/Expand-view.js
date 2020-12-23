export default class Expand {
  constructor(
    container,
    elementToExpand,
    elementToCollapse,
    expandButton,
    siblingElementToCollapse,
  ) {
    this.container = container;
    this.elementToExpand = elementToExpand;
    this.elementToCollapse = elementToCollapse;
    this.expandButton = expandButton;
    this.siblingElementToCollapse = siblingElementToCollapse;
  }

  expandCollapseElement(...elementsToCollapse) {
    elementsToCollapse.forEach((item) => {
      item.classList.toggle('hidden');
    });
    this.expandButton.classList.toggle('expanded');
    this.container.classList.toggle('fullScreen');
    this.elementToExpand.classList.toggle('fullScreen');
  }
}
