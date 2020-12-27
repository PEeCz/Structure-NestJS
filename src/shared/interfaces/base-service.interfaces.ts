export interface IBaseService<T>{
  create(dto): Promise<T>
  update(dto): Promise<T>
  delete(dto): Promise<T>
}