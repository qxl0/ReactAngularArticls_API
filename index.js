const PORT = 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const sites = [
  // 'https://www.reddit.com/r/javascript',
  // 'https://www.reddit.com/r/nodejs',
  // 'https://www.reddit.com/r/reactjs',
  // 'https://www.reddit.com/r/vuejs',
  // 'https://www.reddit.com/r/angular',
  // 'https://www.reddit.com/r/emberjs',
  // 'https://www.reddit.com/r/meteorjs',
  // 'https://www.reddit.com/r/emberjs',
 
  'https://dev.to/t/angular',
  'https://dev.to/t/react',
  // 'https://dev.to/vuejs',
  // 'https://dev.to/emberjs',
  // 'https://dev.to/meteorjs',
  // 'https://dev.to/emberjs',
];

const getData = async (url) => {
  console.log(`Rerieving URL: ${url}`);
  const data = [];
  await axios.get(url)
    .then(response => {
      const base = 'https://dev.to';
      const html = response.data;
      const $ = cheerio.load(html);

      $(".crayons-story > a").each((i, el) => {
        const link = $(el).attr('href');
        const title = $(el).text();
        if (link) {
          data.push({
            title,
            link: base + link,
          });
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
  return data;
};

let articls = [];

sites.forEach(async url => {
  data = await getData(url)
  console.log(`Searching ${url}: found ${data.length} articls`);
  articls = articls.concat(data);
});

app.get('/', (_req, res) => {
  res.json('Hello World!');
});

app.get('/news', async (_req, res) => {
res.json(articls);
});


app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`)
})
