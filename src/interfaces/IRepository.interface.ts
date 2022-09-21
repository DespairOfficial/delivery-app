interface IRepository<T> {
    create(item): Promise<T>;
    update(item): Promise<T>;
    deleteById(id: string | number): void;
}
