import {NzTableSortOrder} from 'ng-zorro-antd/table/src/table.types';

export class QueryPageSortParamBuilder {
  private pageIndex = 0;
  private sizeIndex = 10;
  private sortKey: string;
  private sortType: string;

  page(page: number): QueryPageSortParamBuilder {
    this.pageIndex = page;
    return this;
  }

  size(size: number): QueryPageSortParamBuilder {
    this.sizeIndex = size;
    return this;
  }

  sort(sort: Array<{ key: string; value: NzTableSortOrder; }>): QueryPageSortParamBuilder {
    const order = sort
      .filter((each) => each.value !== null)
      .map((each) => {
        if (each.value === 'ascend') {
          return {key: each.key, value: 'asc'};
        } else {
          return {key: each.key, value: 'desc'};
        }
      })
      [0];
    if (order) {
      this.sortKey = order.key;
      this.sortType = order.value;
    }
    return this;
  }

  build(): string {
    if (this.sortKey) {
      return `?page=${this.pageIndex}&size=${this.sizeIndex}&sort=${this.sortKey},${this.sortType}`;
    } else {
      return `?page=${this.pageIndex}&size=${this.sizeIndex}`;
    }
  }
}
