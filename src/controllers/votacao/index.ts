import * as create from './create'
import * as GetAll from './GetAll'
import * as Get from './Get'
export const VotacaoController = {
    ...create,
    ...GetAll,
    ...Get
}