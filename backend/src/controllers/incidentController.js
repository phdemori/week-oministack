const conect = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await conect('incidents').count();
        const incidents = await conect('incidents')
        .select(['incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5).offset((page - 1) * 5);

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async listFromOng(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await conect('incidents').where('ong_id',ong_id).select('*');

        return response.json(incidents)
    },

    async create(request, response) {
        const { titulo, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conect('incidents').insert({ titulo, description, value, ong_id });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = response.req.params;
        const ong_id = request.headers.authorization;
        
        const incident = await conect('incidents').select('ong_id').where('id',id).first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ 'error': 'Operation not permitted' });
        }

        await conect('incidents').where('id',id).delete();

        return response.status(204).send();
    },
};
