class DataBase {
    constructor() {
        this.Users = [
            {
                username: 'test01',
                password: 'test01pwd'
            },
            {
                username: 'test02',
                password: 'test02pwd'
            },
            {
                username: 'test03',
                password: 'test03pwd'
            },
            {
                username: 'test04',
                password: 'test04pwd'
            },
            {
                username: 'test05',
                password: 'test05pwd'
            },
        ];
    }

    get(option, callback) {
        var table = this[option.tableName];
        var key = option.key;

        var result = [];

        for (let account of table) {
            let match = 0;
            for (let k in key) {
                let v = key[k];
                if (account[k] !== v) {
                    break;
                } else {
                    match++;
                }
            }

            if (match === Object.keys(key).length) {
                result.push(account);
            }
        }

        var ret = result.length === 0 ? null : result[0];
        return callback(ret);
    }

    put(option) {
        return `put DB from ${option.tableName} use ${option.key.account}`;
    }
}

module.exports = DataBase;