const { Directory } = require("../models");

module.exports = {
    create(createArgs) {
        return Directory.create(createArgs);
    },

    update(id, updateArgs) {
        return Directory.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    isDirectoryDeleted(id, updateArgs) {
        return Directory.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return Directory.destroy({
            where: {
                id,
            },
        });
    },

    find(id) {
        return Directory.findOne({
            where: {
                id,
            },
        });
    },

    findAll(args) {
        return Directory.findAll(args);
    },

    getTotalDirectory(args) {
        return Directory.count(args);
    },
};
