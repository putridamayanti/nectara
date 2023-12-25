export const BasicSort = {
    newest: { name: 'Newest', value: 'created_at,desc' },
    oldest: { name: 'Oldest', value: 'created_at,asc' },
};

export const DefaultSort = {
    name: { name: 'Name', value: 'name,asc' },
    ...BasicSort
};
