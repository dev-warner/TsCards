const fs = require('fs');
const { promisify, inspect } = require('util');
const yamlFront = require('yaml-front-matter');

const PATH_TO_POSTS = './src/assets/posts';
const OPTS = { encoding: 'utf8' };

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

async function genereateMetaDataStart() {
    const posts = [];

    try {

        console.log(`Your path is: ${PATH_TO_POSTS}`)

        const data = await readdirAsync(PATH_TO_POSTS, OPTS);

        for (const dir of data) {
            const PATH = `${PATH_TO_POSTS}/${dir}`;

            console.log(`Checking: ${PATH}`)

            const postsNames = await readdirAsync(PATH, OPTS);

            console.log(`Found: ${postsNames}`)

            for (const post of postsNames) {

                const meta = await createMetaData(PATH + '/' + post)

                posts.push(meta)
            }

        }

        const ds = {
            'Data Type': 'Data Structures',
            'Algorithm': 'Algorithms'
        }

        const find = (fin) => {
            return target => fin.match(category);
        }

        const categorys = posts
            .reduce((acc, post) => {
                const type = ds[post.type];
                const { links } = acc.find((target) => type === target.label);
                const category = links.find(cat => cat.label.toLowerCase().match(post.category.toLowerCase()))

                if (category) {
                    category.count = category.count + 1;
                }

                return acc;
            }, links)

        const results = {
            posts,
            social,
            categorys
        };

        fs.writeFileSync('./src/assets/meta.json', JSON.stringify(results))

        console.log(`Results:`)
        console.log('Categorys: ' + inspect(categorys, false, null, true /* enable colors */))

        for (const result of posts) {
            console.log(inspect(result, false, null, true /* enable colors */))
        }

        return posts;
    }

    catch (e) {
        console.error(`Somethings gone wrong ${e}`)
    }
}

let index = 0
async function createMetaData(path) {
    const data = await readFileAsync(path, OPTS)
    const { __content, ...meta } = yamlFront.loadFront(data);

    const obj = {
        ...meta,
        path: cleanPath(path),
        image: `/assets/backgrounds/${index++}.png`
    }

    return obj;
}

function cleanPath(path) {
    const removeSrc = 18;
    const removeMd = 3;

    return path.substring(removeSrc, path.length - removeMd)
}


const links = [
    {
        label: 'Algorithms',
        links: [
            { label: 'Brute force', count: 0 },
            { label: 'Divide and conquer', count: 0 },
            { label: 'Decrease and conquer', count: 0 },
            { label: 'Dynamic programming', count: 0 },
            { label: 'Greedy algorithm', count: 0 },
            { label: 'Transform and conquer', count: 0 },
            { label: 'Backtracking algorithm', count: 0 }
        ]
    },
    {
        label: 'Data Structures',
        links: [
            { label: 'Primitive types', count: 0 },
            { label: 'Abstract data types', count: 0 },
            { label: 'Composite types or non-primitive type', count: 0 },
            { label: 'Linear data structures', count: 0 },
            { label: 'Trees', count: 0 },
            { label: 'Hash-based structures', count: 0 },
            { label: 'Graphs', count: 0 }
        ]
    },
    {
        label: 'Resources',
        links: [
            {
                link: 'https://github.com/basarat/algorithms',
                author: 'basarat',
                label: 'algorithms'
            }
        ]
    }
];

const social = [
    {
        label: 'github',
        link: 'https://github.com/dev-warner/'
    },
    {
        label: 'stackoverflow',
        link: 'https://stackoverflow.com/story/dev-warner'
    },
    {
        label: 'twitter',
        link: 'https://twitter.com/dev_warner'
    },
    {
        label: 'linkedin',
        link: 'https://www.linkedin.com/in/joe-warner-900ba5b4/'
    }
]

genereateMetaDataStart()




