const fs = require('fs');
const yaml = require('yaml');
const package = require('../../../../package.json');
const path = require('path');

function writeYaml(input, output) {
    if(!fs.existsSync('../../../bamboo-specs')) {
        fs.mkdirSync('../../../bamboo-specs');
    }
    
    fs.writeFileSync(output, input, (err) => {
        if (err) throw err;
        console.log('YAML has been saved to ' + output);
    });
};

function getPackageName() {
    return package.name;
}

function getPlanKey() {
    return getPackageName().split('-').join('').toLocaleUpperCase();
}

function parseTemplate(file) {
    const doc = fs.readFileSync(file, 'utf8', (err) => {
        if (err) throw err;
        console.debug('Parsing ' + doc + ' ...');
    });
    return yaml.parseDocument(doc);
}

function getSpec() {
    return parseTemplate(path.join(__dirname, '/../templates/spec-template.yml')).contents;
}

function mergeDocuments(docs) {
    return docs.map(d => String(d)).join('\n');
}

function readTemplate() {
    return fs.readFileSync(path.join(__dirname, '/../templates/template.yml'), { encoding: 'utf8'});
}

module.exports = { writeYaml, getPackageName, getPlanKey, getSpec, mergeDocuments, readTemplate }
