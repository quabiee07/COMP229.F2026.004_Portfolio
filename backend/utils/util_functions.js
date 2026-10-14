// This is a utility function that formats a Mongoose document into a plain JavaScript object
function formatObject(doc){
    const object = doc.toObject();
    object.id = object._id;
    delete object._id;
    return object;
}

module.exports = { formatObject };