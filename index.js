const DtoValidator = function(dto) {
  return function(req, res, next) {
    const errors = validateDto(dto, req.body);
    if (errors.length === 0) {
      next();
    } else {
      res.status(400).send(errors);
    }
  }
}

const DtoTypes = {
  string: {
    name: 'string',
    check: (value) => stringChecker(value, false),
    isRequired: { 
      name: 'string',
      check: (value) => stringChecker(value, true)
    },
  },
  number: {},
  array: {},
  shape: {}
}

const stringChecker = function(value, isRequired) {
  return { valid: value && (typeof value === 'string' || value instanceof String), missing: validateIsRequired(value, isRequired) };
}

const validateIsRequired = function(value, isRequired) {
  return isRequired && !value;
}

const validateDto = function(dtoTypes, dto) {
  const errors = [];
  for (const key in dto) {
    validator = dtoTypes[key];
    if (!validator) {
      errors.push(`Sent unexpected property ${key}`);
    } else {
      const result = validator.check(dto[key]);
      if (!result.valid) {
        errors.push(`Expected type ${validator.name} from property ${key}`);
      }
      if (result.missing) {
        errors.push(`Property ${key} is marked as required`);
      }
    }
  }
  console.log(errors);
  return errors;
}

const dtoTypeDef = {
  email: DtoTypes.string,
  password: DtoTypes.string.isRequired
}

const dto = {
  email: 'test',
  password: '',
}

validateDto (dtoTypeDef, dto);

module.exports = {
  DtoTypes,
  DtoValidator
}