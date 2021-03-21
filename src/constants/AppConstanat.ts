import { SortFilter } from "src/generated/graphql";

export const SORT_OPTIONS = [
    { label: "What's New", key: SortFilter['New'] },
    { label: "Popularity", key: SortFilter['Popularity'] },
    { label: "Better Discount", key: SortFilter['Discount'] },
    { label: "Price: High to Low", key: SortFilter['Costly'] },
    { label: "Price: Low to High", key: SortFilter['Budget'] }
]

