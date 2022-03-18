import axios from "axios";

const url = 'https://graphql.anilist.co';

export const getCoverArt = (title, type) => {
    const convertedType = type === 'manga' ? 'MANGA' : 'ANIME';
    const query = 
    `
    {
        Media (search: "${title}", type: ${convertedType})
        {
            coverImage { extraLarge }
        }
    }
    `;
    return (async () => {
        try {
            const { data } = (await axios.post(url,
                { query: query },
                { headers: {
                    'Content-Type': 'application/json'
                }}
            ));
            return data.data.Media.coverImage.extraLarge;
        } catch(e) {
            console.log(e);
        }
    })();
};
