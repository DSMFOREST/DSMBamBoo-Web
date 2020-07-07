export type developer = Array<{
  type: "Backend" | "Web Frontend" | "iOS" | "Android";
  name: "김재훈" | "김준우" | "이동기" | "박영진";
}>;

export const DEVELOPER: developer = [
  { type: "Backend", name: "김재훈" },
  { type: "Web Frontend", name: "김준우" },
  { type: "iOS", name: "이동기" },
  { type: "Android", name: "박영진" },
];
