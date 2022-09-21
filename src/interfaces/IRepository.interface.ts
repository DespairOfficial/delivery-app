interface IRepository<T> {
    create(item): Promise<T>;
    update(item): Promise<T>;
    deleteById(id: string | number): void;
    findById(id: string | number): Promise<T>;
}
