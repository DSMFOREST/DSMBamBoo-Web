type PaginationArray = Array<{
  isFirst?: boolean;
  isMiddle?: boolean;
  isLast?: boolean;
  icon?: string;
  pagePath: number;
}>;

export const makePagenationArray = ({
  pageNum,
  pageLength,
}: {
  pageNum: number;
  pageLength: number;
}): PaginationArray => {
  const array: PaginationArray = [];
  const digitsNumber = Math.floor((pageNum - 1) / 10) * 10 + 1;
  const digitsPage = Math.floor(pageLength / 10) * 10 + 1;

  if (digitsNumber !== 1) {
    array.push(
      {
        icon: "<<",
        isFirst: true,
        pagePath: 1,
      },
      {
        icon: "<",
        isFirst: true,
        pagePath: digitsNumber - 10,
      }
    );
  }

  for (let i = digitsNumber; i < digitsNumber + 10; i++) {
    array.push({
      isMiddle: true,
      pagePath: i,
    });

    if (i === pageLength) {
      break;
    }
  }

  if (digitsNumber !== digitsPage) {
    array.push(
      {
        icon: ">",
        isLast: true,
        pagePath:
          digitsNumber + 10 <= pageLength ? digitsNumber + 10 : digitsNumber,
      },
      {
        icon: ">>",
        isLast: true,
        pagePath: pageLength,
      }
    );
  }

  return array;
};
