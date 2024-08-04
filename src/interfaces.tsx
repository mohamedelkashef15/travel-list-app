export interface IItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
  onDeleteItem?: (val: number) => void;
  onToggleItem?: (val: number) => void;
}

export interface IPackingList {
  items: IItem[];
  onDeleteItem: (val: number) => void;
  onToggleItem: (val: number) => void;
  onClear: () => void;
}
