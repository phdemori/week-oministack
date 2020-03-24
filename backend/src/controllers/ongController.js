const crypto = require("crypto");
const conect = require('./database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await conect('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, whatsapp, email, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await conect('ongs').insert({id,name,whatsapp,email,city,uf});

        return response.json({ id });
    }
};
