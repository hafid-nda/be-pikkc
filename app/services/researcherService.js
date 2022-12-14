const researcherRepository = require("../repositories/researcherRepository");

module.exports = {
    create(requestBody) {
        return researcherRepository.create(requestBody);
    },

    update(id, requestBody) {
        return researcherRepository.update(id, requestBody);
    },

    isResearcherDeleted(id, requestBody) {
        return researcherRepository.isResearcherDeleted(id, requestBody);
    },

    delete(id) {
        return researcherRepository.delete(id);
    },

    async list(args) {
        try {
            const researchers = await researcherRepository.findAll(args);
            const researcherCount = await researcherRepository.getTotalResearcher(args);

            return {
                data: researchers,
                count: researcherCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        return researcherRepository.find(id);
    },
};
