const validateDto = require('../index').validateDto;
const DtoTypes = require('../index').DtoTypes;

const dtoTypeDef = {
  email: DtoTypes.string,
  password: DtoTypes.string.isRequired,
  id: DtoTypes.number.isRequired,
  names: DtoTypes.arrayOf(DtoTypes.string).isRequired,
  ob: DtoTypes.shape({
    email: DtoTypes.string,
    password: DtoTypes.string.isRequired,
    id: DtoTypes.number.isRequired,
    names: DtoTypes.arrayOf(DtoTypes.string).isRequired
  }).isRequired,
}

const dto = {
  email: null,
  password: 'test',
  id: 1.4,
  names: ['1'],
  ob: null
}

validateDto (dtoTypeDef, dto);
