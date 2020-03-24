const conect = require('./database/connection');

module.exports = {
    async create(request, response) {
        const { id } = response.body;

        const ong = await conect('ongs').where('id',id).select('name').first();

        if(!ong){
            return response.status(400).json({ error: 'No ONG from this ID'});
        }

        return response.json(ong);
    },
}