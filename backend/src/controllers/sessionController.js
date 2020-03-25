const conect = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = response.req.body;
        
        const { nome } = await conect('ongs').where('id',id).select('nome').first();
        if(!nome){
            return response.status(400).json({ error: 'No ONG from this ID'});
        }
        
        return response.json(nome);
    },
}