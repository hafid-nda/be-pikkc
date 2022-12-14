const researcherService = require("../../../services/researcherService");

module.exports = {
    list(req, res) {
        researcherService
            .list({
                where: { isDeleted: false },
            })
            .then(({ data, count }) => {
                res.status(200).json({
                    status: "OK",
                    message: "Get All Researchers Success",
                    data: { researchers: data },
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
        researcherService
            .create(req.body)
            .then((researcher) => {
                res.status(201).json({
                    status: "OK",
                    message: "Create Researcher Success",
                    data: researcher,
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
        researcherService
            .update(req.params.id, req.body)
            .then(() => {
                res.status(200).json({
                    status: "OK",
                    message: "Update Researcher Success",
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
        researcherService
            .get(req.params.id)
            .then((post) => {
                res.status(200).json({
                    status: "OK",
                    message: "Get Researcher By Id Success",
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

    makeResearcherDeleted(req, res) {
        researcherService
            .isResearcherDeleted(req.params.id, { isDeleted: true, deletedBy: req.user.id })
            .then((researcher) => {
                res.status(200).json({
                    status: "OK",
                    message: "Delete Researcher Success",
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

    makeResearcherDestroy(req, res) {
        researcherService
            .delete(req.params.id)
            .then((researcher) => {
                res.status(200).json({
                    status: "OK",
                    message: "Researcher Destroy From Database",
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
