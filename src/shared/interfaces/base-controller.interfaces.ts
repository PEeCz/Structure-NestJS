export interface IBaseController<T>{
  create(req, dto): Promise<T>
  update(req, param, dto): Promise<T>
  delete(req, param): Promise<T>
}