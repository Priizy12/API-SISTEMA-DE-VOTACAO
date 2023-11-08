import * as GetAll from './GetAll'
import * as deleteById from './DeleteById'
import * as GetById from './GetById'
import * as update from './UpdateById'
import * as signUp from './signup'
import * as signIn from './signIn'

export const PesquisadorController = {
    ...signUp,
    ...signIn,
    ...GetAll,
    ...GetById,
    ...update,
    ...deleteById
}