export type Id = string | number;

export type Row = {
  id: Id;
  title: string;
};

export type Sortable = {
  id: Id;
  rowId: Id;
  title?: string;
  content: string;
};
