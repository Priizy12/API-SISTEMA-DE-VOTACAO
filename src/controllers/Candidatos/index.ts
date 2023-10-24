import * as get from './GetAll'
import * as getById from './GetById'
import * as create from './create'
import * as deleteById from './delete'
import * as update from './UpdateById'


export const CandidatoController = {
    ...create,
    ...deleteById,
    ...get,
    ...getById,
    ...update
   
}