const Node              = require('./Node');
const BaseCharacterData = require('../Common/BaseCharacterData');
const BaseText          = require('../Common/BaseText');

const CharacterData = BaseCharacterData.initCharacterData(Node);
const Text          = BaseText.initText(Node, CharacterData);

exports.Text = Text.Text;