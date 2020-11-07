import { Component } from '@angular/core';

interface IItem {
  id: number;
  name: string;
}

type ISelectedItem = Pick<IItem, 'id'>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  list1: IItem[] = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
    { id: 4, name: 'item 4' },
  ];
  list2: IItem[] = [
    { id: 5, name: 'item 5' },
    { id: 6, name: 'item 6' },
    { id: 7, name: 'item 7' },
  ];

  selectedList1: ISelectedItem[] = [{ id: 1 }, { id: 3 }];
  selectedList2: ISelectedItem[] = [{ id: 6 }, { id: 7 }];

  moveSelected(direction) {
    if (direction === 'left') {
      this.selectedList2.forEach((item) => {
        // find mapped element
        const itemInList2 = this.list2.find((l2) => l2.id === item.id);

        this.list1.push(itemInList2); // add to list 1
        this.list2 = this.list2.filter((l2) => l2.id !== item.id); // remove from list 2
      });
      // clear selected list 2
      this.selectedList2 = [];
    } else {
      this.selectedList1.forEach((item) => {
        // find mapped element
        const itemInList1 = this.list1.find((l1) => l1.id === item.id);
        this.list2.push(itemInList1); // add to list 2
        this.list1 = this.list1.filter((l1) => l1.id !== item.id); // remove from list 1
      });
      // clear selected list 1
      this.selectedList1 = [];
    }
  }

  moveAll(direction) {
    if (direction === 'left') {
      this.list1 = [...this.list1, ...this.list2];
      this.list2 = [];
      this.selectedList2 = [];
    } else {
      this.list2 = [...this.list2, ...this.list1];
      this.list1 = [];
      this.selectedList1 = [];
    }
  }

  customCompare(o1: IItem, o2: IItem) {
    return o1.id === o2.id;
  }
}
