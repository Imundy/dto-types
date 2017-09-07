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
    check: (key, value) => stringChecker('string', key, value, false),
    isRequired: {
      name: 'string',
      check: (key, value) => stringChecker('string', key, value, true)
    },
  },
  number: {
    name: 'number',
    check: (key, value) => numberChecker('number', key, value, false),
    isRequired: {
      name: 'number',
      check: (key, value) => numberChecker('number', key, value, true)
    },
  },
  arrayOf: (type) => ({
    name: 'array',
    check: (key, value) => arrayOfChecker(type)(`array of ${type}`, key, value, false),
    isRequired: {
      name: 'array',
      check: (key, value) => arrayOfChecker(type)(`array of ${type}`, key, value, true),
    },
  }),
  shape: {}
}

const stringChecker = function(name, key, value, isRequired) {
  const valid = !value || (typeof value === 'string' || value instanceof String);
  const missing = validateIsRequired(value, isRequired);
  const errors = valid ? [] : [ `Expected type ${name} from property ${key}` ];
  if (missing)
    errors.push(`Property ${key} is marked as required`);

  return {
    valid,
    missing,
    errors,
  };
}

const numberChecker = function(name, key, value, isRequired) {
  const valid = !value || !stringChecker(name, key, value, isRequired).valid && !isNaN(value);
  const missing = validateIsRequired(value, isRequired);
  const errors = valid ? [] : [ `Expected type ${name} from property ${key}` ];
  if (missing)
    errors.push(`Property ${key} is marked as required`);

  return {
    valid,
    missing,
    errors,
  };
}

const arrayOfChecker = function(typeValidator) {
  return function(name, key, value, isRequired) {
    const validArray = !value || Array.isArray(value);
    const errors = validArray ? [] : [`Expected array for ${key}`];
    let valid = validArray;
    let missingValues = false;

    if (validArray && value) {
      for (let i = 0; i < value.length; i++) {
        const result = typeValidator.check(key, value[i]);
        if (result.missing || result.missingValues) {
          missingValues = true;
        }
        if (!result.valid) {
          valid = false;
        }
      }
      if (!valid) {
        errors.push(`Expected array of ${typeValidator.name}s for property ${key}`);
      }
      if (missingValues) {
        errors.push(`Property ${key} cannot have undefined values`);
      }
    }

    const missing = validateIsRequired(value, isRequired);
    if (missing) {
      errors.push(`Property ${key} is marked as required`);
    }

    return {
      valid,
      missing,
      missingValues,
      errors,
    };
  };
}

const validateIsRequired = function(value, isRequired) {
  return isRequired && !value;
}

const validateDto = function(dtoTypes, dto) {
  const errors = [];
  for (const key in dtoTypes) {
    validator = dtoTypes[key];
    if (!validator) {
      errors.push(`Sent unexpected property ${key}`);
    } else {
      const result = validator.check(key, dto[key]);
      errors.push(...result.errors);
    }
  }
  console.log(errors);
  return errors;
}

const dtoTypeDef = {
  email: DtoTypes.string,
  password: DtoTypes.string.isRequired,
  id: DtoTypes.number.isRequired,
  names: DtoTypes.arrayOf(DtoTypes.string).isRequired
}

const dto = {
  email: null,
  password: 'test',
  id: 1.4,
  names: ['1'],
}

validateDto (dtoTypeDef, dto);

module.exports = {
  DtoTypes,
  DtoValidator
};
