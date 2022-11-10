const directoryService = require("../../../services/directoryService");

module.exports = {
    list(req, res) {
        directoryService
            .list({
                where: { isDeleted: false },
            })
            .then(({ data, count }) => {
                res.status(200).json({
                    status: "OK",
                    message: "Get All Directory Success",
                    data: { directories: data },
                    meta: { total: count },
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    create(req, res) {
        console.log(req.body);
        req.body.createdBy = req.user.id;
        directoryService
            .create(req.body)
            .then((directory) => {
                res.status(201).json({
                    status: "OK",
                    message: "Create Directory Success",
                    data: directory,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    update(req, res) {
        req.body.updatedBy = req.user.id;
        directoryService
            .update(req.params.id, req.body)
            .then(() => {
                res.status(200).json({
                    status: "OK",
                    message: "Update Directory Success",
                    data: req.body
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    show(req, res) {
        directoryService
            .get(req.params.id)
            .then((post) => {
                res.status(200).json({
                    status: "OK",
                    message: "Get Directory By Id Success",
                    data: post,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    makeDirectoryDeleted(req, res) {
        directoryService
            .isDirectoryDeleted(req.params.id, { isDeleted: true, deletedBy: req.user.id })
            .then((directory) => {
                res.status(200).json({
                    status: "OK",
                    message: "Delete Directory Success",
                    deletedBy: req.user.id,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    makeDirectoryDestroy(req, res) {
        directoryService
            .delete(req.params.id)
            .then((directory) => {
                res.status(200).json({
                    status: "OK",
                    message: "Directory Destroy From Database",
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    }
};
