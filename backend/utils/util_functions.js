 function formatObject(doc){
    const object = doc.toObject();
    object.id = object._id;
    delete object._id;
    return object;
}

module.exports = { formatObject };