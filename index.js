const { Extension, type, api } = require('clipcc-extension');
const axios = require('axios');

class HTTPExtension extends Extension {
    onInit() {
        console.log('HTTP Extension Initialized!');
        this.instance = axios.create({
            baseURL: 'https://codingclip.com/',
            timeout: 10000,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
            }
        });

        api.addCategory({
            categoryId: 'clipteam.http.category',
            messageId: 'clipteam.http.category',
            color: '#78909C'
        });
        api.addBlock({
            opcode: 'clipteam.http.setUA',
            type: type.BlockType.COMMAND,
            messageId: 'clipteam.http.setUA',
            categoryId: 'clipteam.http.category',
            param: {
                UA: {
                    type: type.ParameterType.STRING,
                    default: ' '
                }
            },
            function: (args) => this.setUA(args),
        });
        api.addBlock({
            opcode: 'clipteam.http.setHeader',
            type: type.BlockType.COMMAND,
            messageId: 'clipteam.http.setHeader',
            categoryId: 'clipteam.http.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: '{}'
                }
            },
            function: (args) => this.setHeader(args),
        });
        api.addBlock({
            opcode: 'clipteam.http.setHeaderByKey',
            type: type.BlockType.COMMAND,
            messageId: 'clipteam.http.setHeaderByKey',
            categoryId: 'clipteam.http.category',
            param: {
                KEY: {
                    type: type.ParameterType.STRING,
                    default: ' '
                },
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: ' '
                }
            },
            function: (args) => this.setHeaderByKey(args),
        });
        api.addBlock({
            opcode: 'clipteam.http.get',
            type: type.BlockType.REPORTER,
            messageId: 'clipteam.http.get',
            categoryId: 'clipteam.http.category',
            param: {
                URL: {
                    type: type.ParameterType.STRING,
                    default: 'https://v1.hitokoto.cn/'
                }
            },
            function: (args) => this.get(args),
        });
        api.addBlock({
            opcode: 'clipteam.http.post',
            type: type.BlockType.REPORTER,
            messageId: 'clipteam.http.post',
            categoryId: 'clipteam.http.category',
            param: {
                URL: {
                    type: type.ParameterType.STRING,
                    default: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx'
                },
                DATA: {
                    type: type.ParameterType.STRING,
                    default: '{}'
                }
            },
            function: (args) => this.post(args),
        });
    }

    onUninit () {
        console.log('HTTP Extension Uninitialized!');
        api.removeCategory('clipteam.http.category');
    }

    setUA (args) {
        this.instance.defaults.headers['User-Agent'] = args.UA;
    }

    setHeader (args) {
        this.instance.defaults.header = JSON.parse(args.VALUE);
    }

    setHeaderByKey (args) {
        this.instance.defaults.headers[args.KEY] = args.VALUE;
    }

    async get (args) {
        try {
            // It's stuck here for unknown reason.
            const raw = await this.instance.get(args.URL);
            if (typeof raw === 'object') return JSON.parse(raw.data);
            return raw.data;
        } catch (e) {
            return "[ERROR]" + e.message;
        }
    }

    async post (args) {
        try {
            const raw = await this.instance.post(args.URL, JSON.parse(args.DATA));
            return JSON.parse(raw.data);
        } catch (e) {
            return "[ERROR]" + e.message;
        }
    }
}

module.exports = HTTPExtension;
