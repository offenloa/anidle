const Answer = require("../models/Answer.js")
const animeBank = require("../animebank.json")
const { request, GraphQLClient } = require('graphql-request');
const fs = require("fs");

const query = `
query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
        media (type: ANIME, sort: SCORE_DESC) {
          id
          averageScore
          episodes
          season
          seasonYear
          genres
            popularity
          coverImage {
            large
            color
          }
          siteUrl
          title {
            romaji
            english
          }
          studios (isMain: true) {
            nodes {
              id
              name
              isAnimationStudio
            }
          }
          tags {
            name
            rank
            isGeneralSpoiler
            isMediaSpoiler
          }
          description
      }
    }
  }
`;

async function update_answer() {
    let pool = animeBank.data.Page.media;
    let daily = pool[Math.floor((Math.random()*pool.length))];
    await Answer.updateOne({name: "daily"}, {code: daily.id, data: daily});
}

async function update_pool() {
    console.log("updating pool");
    let variables = {
        "page": 0
    }
    let pool = {
        data: {
            Page: {
                media: []
            }
        }
    };
    for (let i = 1; i<21;i++) {
        variables.page = i;
        let result = await request("https://graphql.anilist.co", query, variables)
        if (result) {
            pool.data.Page.media = pool.data.Page.media.concat(result.Page.media.filter((med) => {
                return (med.season && med.seasonYear && med.episodes);
            }))
        }
        fs.writeFileSync('animebank.json', JSON.stringify(pool), 'utf8');
    }
}

exports.update_answer = update_answer;
exports.update_pool = update_pool;