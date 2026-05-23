const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async(req,res) => {
    //swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('Contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type' , 'application/json');
        res.status(200).json(contacts);
    });
};



const getSingle = async(req,res) => {
    //swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Contacts').find({_id: contactId});
    result.toArray().then((Contacts) => {
        res.setHeader('Content-Type' , 'application/json');
        res.status(200).json(Contacts[0]);
    });
};


const createContact = async(req, res) =>{
    //swagger.tags=['Contacts']
    const contact ={
        firstName: req.body.firstName,
        lastName: req.body.lasName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(contact);
    if (response.acknowledged >0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

const updateContact = async(req, res) =>{
    //swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact ={
        firstName: req.body.firstName,
        lastName: req.body.lasName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne({ _id: contactId}, contact);
    if (response.modifiedCount >0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};


const deleteContact = async(req, res) => {
    //swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({ _id: contactId});
    if (response.deletedCount >0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
}


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};