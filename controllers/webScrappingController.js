const webScrappingServices = require('../services/webScrappingServices');
const constants = require("../constants");

module.exports = {
    getWebScrappingData: async (req, res) => {
        try {
            const responseFromService = await webScrappingServices.getWebScrappingData(req.query);
            let response = {
                success: true,
                message : constants.success,
                status : 200,
            };
            
            return res.status(response.status).json({ ...response ,...responseFromService});
        } catch (error) {
            let response = {
                success : false,
                message : constants.error_code,
                status : 400,
            }
            return res.status(response.status).json(response);
        }
      },
}
