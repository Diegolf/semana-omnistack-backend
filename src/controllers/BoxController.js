const Box = require('../models/Box');

class BoxController{
    async store(req, res){
        const box = await Box.create({title: req.body.title});

        return res.send(box);
    }

    async show(req, res){
        // .populate serve para retornar também os dados de todos os arquivos daquela box
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {sort: {createdAt: -1}}
        });

        return res.json(box);
    }
}

module.exports = new BoxController();