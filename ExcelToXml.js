const XLSX = require('xlsx');
const xmlbuilder = require('xmlbuilder');
const fs = require('fs');

const excelToXml = (excelFile, xmlFile) => {
  const workbook = XLSX.readFile(excelFile);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  const root = xmlbuilder.create('root');
  jsonData.forEach(item => {
    const xmlItem = root.ele('item');
    Object.keys(item).forEach(key => {
      xmlItem.ele(key, item[key]);
    });
  });

  const xmlString = root.end({ pretty: true });
  fs.writeFileSync(xmlFile, xmlString);
};

const excelFile = process.argv[2]; // the first argument passed in the command line
const xmlFile = process.argv[3]; // the second argument passed in the command line

excelToXml(excelFile, xmlFile);
