const Mustache = require("mustache");
const fs = require("fs");
const axios = require("axios").default;

const api_url = "https://api.github.com"

async function getReposCount() {
    const result = await axios.get(`${api_url}/users/hugorplobo`);
    
    return result.data.public_repos;
}

async function getStarsCount() {
    const result = await axios.get(`${api_url}/users/hugorplobo/starred`);

    return result.data.length;
}

function updateReadme() {
    const TEMPLATE = "./main.mustache";

    fs.readFile(TEMPLATE, async (err, data) => {
        if (err) throw err;

        const publicRepos = await getReposCount();
        const totalStarred = await getStarsCount();

        const output = Mustache.render(data.toString(), { publicRepos, totalStarred });
        fs.writeFileSync("README.md", output);
    });
}

updateReadme();
