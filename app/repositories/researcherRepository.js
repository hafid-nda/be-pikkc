const { Researcher } = require("../models");

module.exports = {
    create(createArgs) {
        return Researcher.create(createArgs);
    },

    update(id, updateArgs) {
        return Researcher.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    isResearcherDeleted(id, updateArgs) {
        return Researcher.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return Researcher.destroy({
            where: {
                id,
            },
        });
    },

    find(id) {
        return Researcher.findOne({
            where: {
                id,
            },
        });
    },

    findAll(args) {
        return Researcher.findAll(args);
    },

    getTotalResearcher(args) {
        return Researcher.count(args);
    },
};
