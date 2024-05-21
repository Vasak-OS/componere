import { getCountryByCode } from '../../src/utils/countryUtils';
import countries from '../../src/data/countries';
import { expect, test } from '@jest/globals';

test('Test getCountryByCode', () => {
  expect(getCountryByCode('US')).toEqual(countries.find((country) => country.countryCode === 'US'));
  expect(getCountryByCode('CA')).toEqual(countries.find((country) => country.countryCode === 'CA'));
  expect(getCountryByCode('MX')).toEqual(countries.find((country) => country.countryCode === 'MX'));
  expect(getCountryByCode('GB')).toEqual(countries.find((country) => country.countryCode === 'GB'));
  expect(getCountryByCode('DE')).toEqual(countries.find((country) => country.countryCode === 'DE'));
  expect(getCountryByCode('FR')).toEqual(countries.find((country) => country.countryCode === 'FR'));
  expect(getCountryByCode('IT')).toEqual(countries.find((country) => country.countryCode === 'IT'));
  expect(getCountryByCode('ES')).toEqual(countries.find((country) => country.countryCode === 'ES'));
  expect(getCountryByCode('PT')).toEqual(countries.find((country) => country.countryCode === 'PT'));
  expect(getCountryByCode('AU')).toEqual(countries.find((country) => country.countryCode === 'AU'));
  expect(getCountryByCode('NZ')).toEqual(countries.find((country) => country.countryCode === 'NZ'));
  expect(getCountryByCode('JP')).toEqual(countries.find((country) => country.countryCode === 'JP'));
  expect(getCountryByCode('KR')).toEqual(countries.find((country) => country.countryCode === 'KR'));
  expect(getCountryByCode('CN')).toEqual(countries.find((country) => country.countryCode === 'CN'));
  expect(getCountryByCode('IN')).toEqual(countries.find((country) => country.countryCode === 'IN'));
  expect(getCountryByCode('BR')).toEqual(countries.find((country) => country.countryCode === 'BR'));
  expect(getCountryByCode('ZA')).toEqual(countries.find((country) => country.countryCode === 'ZA'));
  expect(getCountryByCode('RU')).toEqual(countries.find((country) => country.countryCode === 'RU'));
  expect(getCountryByCode('TR')).toEqual(countries.find((country) => country.countryCode === 'TR'));
  expect(getCountryByCode('SA')).toEqual(countries.find((country) => country.countryCode === 'SA'));
});
