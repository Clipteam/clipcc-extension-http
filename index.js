const { Extension, type, api } = require('clipcc-extension');

class HelloExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: 'clipteam.http.category',
            messageId: 'clipteam.http.category',
            color: '#66CCFF'
        });
        api.addBlock({
            opcode: 'clipteam.http.hello',
            type: type.BlockType.REPORTER,
            messageId: 'clipteam.http.hello',
            categoryId: 'clipteam.http.category',
            function: () => "Hello, ClipCC!"
        });
    }
}

module.exports = HelloExtension;
