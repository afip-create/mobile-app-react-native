// parser.js
import { parseStringPromise } from 'xml2js';

/**
 * Parses XML string data into a JavaScript object.
 * @param {string} xmlString - The XML string to parse.
 * @param {object} [options] - Optional xml2js parsing options.
 * @returns {Promise<object>} A promise that resolves with the parsed JavaScript object, or rejects with an error.
 */
const parseXML = async (xmlString, options = {}) => {
  try {
    if (!xmlString) {
      throw new Error('XML string is empty or null.');
    }

    const parsedData = await parseStringPromise(xmlString, {
      explicitArray: false, // Handle single elements as objects, not arrays
      ignoreAttrs: true, // Ignore XML attributes for cleaner data structure
      trim: true, // Trim whitespace from text nodes
      ...options, // Allow overriding default options
    });

    return parsedData;
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error(`Failed to parse XML: ${error.message}`);
  }
};

/**
 * Parses a CSV string into an array of objects.  Assumes the first line is the header row.
 * @param {string} csvString - The CSV string to parse.
 * @param {string} [delimiter=','] - The delimiter used in the CSV string.
 * @returns {Array<object>} An array of objects, where each object represents a row in the CSV.
 */
const parseCSV = (csvString, delimiter = ',') => {
  if (!csvString) {
    throw new Error('CSV string is empty or null.');
  }

  const lines = csvString.trim().split('\n');
  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(delimiter).map(header => header.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(value => value.trim());
    if (values.length !== headers.length) {
      console.warn(`Skipping row ${i + 1} due to inconsistent number of columns.`);
      continue; // Skip rows with incorrect number of columns
    }

    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j];
    }
    result.push(obj);
  }

  return result;
};

/**
 * Parses a JSON string into a JavaScript object.
 * @param {string} jsonString - The JSON string to parse.
 * @returns {object} The parsed JavaScript object, or null if parsing fails.
 */
const parseJSON = (jsonString) => {
  try {
    if (!jsonString) {
      throw new Error('JSON string is empty or null.');
    }
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
};

export { parseXML, parseCSV, parseJSON };