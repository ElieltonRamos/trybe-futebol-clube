export interface ICRUDModelCreator<t> {
  create(data: t): Promise<t>
}

export interface ICRUDModelReader<t> {
  findAll(): Promise<t[]>
  findById(id: number): Promise<t | null>
}

export interface ICRUDModelUpdate<t> {
  update(id: number, data: t): Promise<t | null>
}

export interface ICRUDModelDelete {
  delete(id: number): Promise<number>
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdate<T>,
  ICRUDModelDelete { }
