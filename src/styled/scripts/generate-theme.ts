import fs from 'fs-extra';
import path from 'path';
import { mergeDeepRight } from 'ramda';
import { pascalCase } from 'pascal-case';

import { theme as defaultTheme} from '../theme';
import custom from '../custom';

const FILE_OUTPUT = path.join(__dirname, '../types/generated.d.ts');
const SVG_FOLDER = path.join(__dirname, '../../static/icons/');

const writeTypeValue = (object: any, onlyType: boolean = false): any => {
  const entries = Object.entries(object);
  return entries.map((val, index) => typeof val[1] === 'object' ?
    `${val[0]}:{${writeTypeValue(val[1], onlyType)}},` :
    `${val[0]}:${onlyType ? typeof val[1] : `'${val[1]}'`};`
  ).join('').slice(0, -1);
}

const mergedTheme = JSON.parse(JSON.stringify(mergeDeepRight(defaultTheme, custom)));

let output = ``;
output += `/**
 * Theme Types
 * Generated in ${new Date()}
 *
 * This file is generated automatically, DO NOT modify it directly
 * To create new or modify existing styles, edit custom.ts or variables.ts files inside .src/styled/
 */\n`;

Object.keys(mergedTheme).forEach((value, index) => {
  output += `export type GeneratedTheme${pascalCase(value)} = `;
  output += typeof mergedTheme[value] === 'object' ? `{${writeTypeValue(mergedTheme[value])}}` : mergedTheme[value];
  output += `\n`;
  output += `export type Theme${pascalCase(value)} = `;
  output += typeof mergedTheme[value] === 'object' ? `{${writeTypeValue(mergedTheme[value], true)}}` : mergedTheme[value];
  output += `\n`;
});

output += `export type MyCustomType = {`;
Object.keys(mergedTheme).forEach((value, index) => {
  if(!['spacing', 'colors'].includes(value)) {
    output += `${value}: GeneratedTheme${pascalCase(value)},`;
  }
});
output += `}\n`;

const svgIcons = fs.readdirSync(SVG_FOLDER).filter((val) => val.includes('.')).map((val) => `"${val.split('.')[0]}"`);
output += `export type GeneratedIcons = ${svgIcons.join(' | ')}`;

fs.outputFile(FILE_OUTPUT, output).then(() => fs.readFile(FILE_OUTPUT, 'utf8')).then(data => {
  console.log('Types file created successfully! ✌🏼😎');
}).catch(err => {
  console.error(err);
});
