# Allowing users to input numbers/prices in a specified locale

Using `<input type="number"/>` only works correctly in the browser's locale. This is fine for many applications, since the user most likely only wants to work in their one locale.

However, I've worked on several CRM applications that allowed the user to switch the locale they wanted to work in. After having to implement this ability several times in the frontend, I've come up with an easy and elegant solution.

## Basic Requirements

To allow a user to input numbers in a different format, we need the following:

1. An input of type *text*, since the number can contain symbols that are not allowed in type *number*
2. A method to parse the user input to a javascript number
3. Unless the input will always start out blank, a method to format the initial server side value to the locale formatted value

## Formatting a number

Its easy to format a number in any locale. You can use

```javascript
function formatNumber(value) {
    return Intl.NumberFormat('de-DE').format(value);
}

formatNumber(1234.56); // 1.234,56
```

## Parsing a number

It's not so easy to parse a number in any locale, since there isn't an API for that. We need to figure out the **group** symbol and the **decimal** symbol of the locale. For example, here are the symbols for the following locales:

| Locale | Example | Group Symbol | Decimal Symbol | 
|-|-|-|-|
| en-US | 1,234.56 | , (comma) | . (period) |
| de-DE | 1.234,56 | . (period) | , (comma) |
| fr-CA | 1 234,56 | (space) | , (comma) |

In order to determine these symbols, we first format a number from that locale. 
Then we can parse the output to determine the symbols:

```javascript
const parts = new Intl.NumberFormat('de-DE', {style: 'decimal'}).formatToParts(1111.11);
const groupPart = parts.find((d) => d.type === 'group')?.value;
const decimalPart = parts.find((d) => d.type === 'decimal').value;
```

Now we know the symbols for the locale. So now lets parse something:

```javascript
function parseInput(value) {
    // check if negative
    const isNegative = (value.indexOf('-') >= 0);

    // remove group symbols
    value = value.replaceAll(groupPart, '');

    // remove spaces, this helps with some locales that have spaces between a minus symbol and the number, or different types of space characters
    value = value.replace(/\s/g, '');

    // remove minus symbols. some locales have minus symbols after the number
    value = value.replace(/^-/, '').replace(/-$/, '');

    // replace decimal symbol with "."
    value = value.replace(decimalPart, '.');

    if (isNegative) {
        value = '-' + value;
    }

    // convert to number type
    value = Number(value);
}

parseInput('1.234,56');
```

## Creating a number input in react

```javascript
const valueFromServer = 1234.56;
export default function NumberInput() {
  const [value, setValue] = useState(valueFromServer);
  const handleChange = (e) => {
    setValue(parseInput(e.target.value));
  };
  return (
    <div>
      <input type="text" value={formatNumber(value)} onChange={handleChange}/>
      <div>Number value: {value}</div>
    </div>
  );
}
```
