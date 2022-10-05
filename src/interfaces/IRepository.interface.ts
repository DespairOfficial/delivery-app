interface IRepository<T> {
    create(item: Object): Promise<T>;
    update(item: Object): Promise<T>;
    deleteById(id: string | number): void;
    findById(id: string | number): Promise<T>;
}
