const constants = require("../constants");
const axios = require("axios")
const cheerio = require('cheerio');

module.exports = {
    getWebScrappingData: async (params) => {
        const URL = params.url
        const result = [];
        async function fetchHTML(url) {
            const { data } = await axios.get(url)
            return cheerio.load(data)
          }
          const $ = await fetchHTML(URL)
          const listReviews = $('#customerReviews','#customerReviews')
          for (let i = 0; i < listReviews.length; i++) {
            let reviewCommentWrapper = $(listReviews[i]).find(".reviewer")
            let reviewerName = $(reviewCommentWrapper).children("dd")[0]
            reviewerName=$(reviewerName).text();
            let reviewerDate = $(reviewCommentWrapper).children("dd")[1]
            reviewerDate=$(reviewerDate).text();
            let itemRatingWrapper = $(listReviews[i]).find(".itemRating")[0]
            let itemRating = $(itemRatingWrapper).text();
            let commentWrapper = $(listReviews[i]).find(".rightCol")
            let comment = $(commentWrapper).find("p");
            comment = $(comment).text()
            const data = {
              reviewComment:comment,
              rating:itemRating,
              reviewDate:reviewerDate,
              reviewerName:reviewerName
            }
            result.push(data)
    
          }
          return {reviewList:result}
    }
}