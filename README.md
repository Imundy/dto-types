# dto-types

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)[![npm](https://img.shields.io/npm/v/dto-types.svg)](https://www.npmjs.com/package/dto-types)

DtoTypes is middleware for express based on [PropTypes](https://github.com/facebook/prop-types).
PropTypes are an effective mechanism for keeping track of what a component should be receiving,
so why not extend the idea to a DTOs (data transfer objects). I've found myself, instead writing custom validation
for every api route I write. Hopefully this alleviates that by specifying the dto shapes only one time.

[NPM](https://www.npmjs.com/package/dto-types)


## Installation

```shell
npm install --save dto-types
```

## Use

```js
import { DtoTypes, DtoValidator } from 'dto-types'; // ES6

const orderDtoType = {
  total: DtoTypes.number.isRequired,
  items: DtoTypes.arrayOf(DtoTypes.shape({
    name: DtoTypes.string.isRequired,
    price: DtoTypes.number.isRequired,
  }).isRequired,
}

app.post('/orders', DtoValidator(orderDtoType), (req, res) => { // do stuff })
```
