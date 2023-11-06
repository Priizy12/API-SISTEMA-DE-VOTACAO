import * as get from './GetAll'
import * as getById from './GetById'
import * as create from './create'
import * as deleteById from './deleteById'



export const EstadoController = {
    ...create,
    ...deleteById,
    ...get,
    ...getById,
   
   
}