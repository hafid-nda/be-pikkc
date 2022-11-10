const directoryRepository = require("../repositories/directoryRepository");

module.exports = {
    create(requestBody) {
        return directoryRepository.create(requestBody);
    },

    update(id, requestBody) {
        return directoryRepository.update(id, requestBody);
    },

    isDirectoryDeleted(id, requestBody) {
        return directoryRepository.isDirectoryDeleted(id, requestBody);
    },

    delete(id) {
        return directoryRepository.delete(id);
    },

    async list(args) {
        try {
            const directories = await directoryRepository.findAll(args);
            const directoryCount = await directoryRepository.getTotalDirectory(args);

            return {
                data: directories,
                count: directoryCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        return directoryRepository.find(id);
    },
};
