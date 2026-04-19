export interface PaginationInput {
  limit?: number;
  cursor?: string;
}

export interface PageInfo {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  pageInfo: PageInfo;
}

export function paginateByCursor<T extends { id: string }>(items: T[], input: PaginationInput): PaginatedResult<T> {
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 100);
  const startIndex = input.cursor
    ? Math.max(0, items.findIndex((item) => item.id === input.cursor) + 1)
    : 0;

  const slice = items.slice(startIndex, startIndex + limit);
  const lastItem = slice[slice.length - 1];
  const hasMore = startIndex + limit < items.length;

  return {
    items: slice,
    pageInfo: {
      nextCursor: hasMore && lastItem ? lastItem.id : null,
      hasMore,
    },
  };
}
