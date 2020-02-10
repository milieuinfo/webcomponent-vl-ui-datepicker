const yaml = require('yaml');
const utils = require('./utils/util');
const path = require('path');

const packageName = utils.getPackageName();
const planKey = utils.getPlanKey();
const planName = 'webcomponent-' + packageName;

const file = utils.readTemplate();
const doc = yaml.parseAllDocuments(file);

const spec = doc[0];
const permissions = doc[1];
const specPlan = spec.get('plan');
const permissionPlan = permissions.get('plan')

specPlan.set('key', planKey);
specPlan.set('name', planName);
permissionPlan.set('key', planKey);

let result = utils.mergeDocuments(doc);
utils.writeYaml(result, path.join(__dirname, '../../../bamboo-specs/bamboo.yml'));
