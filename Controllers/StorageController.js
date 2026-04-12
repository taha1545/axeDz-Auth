const { getSignedFileUrl, deleteFile } = require('../app/s3');
const { NotFoundError } = require('../app/Error');

const getSignedUrl = async (req, res) => {
    const { fileKey } = req.params;

    if (!fileKey) {
        throw new NotFoundError('File key is required');
    }

    const expiresIn = parseInt(req.query.expiresIn) || 3600; // Default 1 hour

    const result = await getSignedFileUrl(fileKey, expiresIn);

    return res.status(200).json({
        success: true,
        message: 'Signed URL generated successfully',
        data: result
    });
};

const deleteStorageFile = async (req, res) => {
    const { fileKey } = req.params;

    if (!fileKey) {
        throw new NotFoundError('File key is required');
    }

    const result = await deleteFile(fileKey);

    return res.status(200).json({
        success: true,
        message: 'File deleted successfully',
        data: result
    });
};

module.exports = {
    getSignedUrl,
    deleteStorageFile
};
