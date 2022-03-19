import axios from "axios";
import { ORDER_KEY } from "constants";
import { TIER_LIST_KEY } from "constants";
import { makeFileNameFromTitle } from "helpers";

const personalAccessToken = `ghp_${process.env.REACT_APP_PAT}`;
const gists = JSON.parse(process.env.REACT_APP_GIST);
const apiLink = 'https://api.github.com/gists';

const getAll = async (type) => {
    try {
        const gist = gists[type];
        const { data } = await axios.get(`${apiLink}/${gist}`);
        return data.files;
    } catch(e) {
        console.log(e);
    }
};

const addNewFile = async (type, contentJson) => {
    const filename = makeFileNameFromTitle(contentJson['Title']);
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [filename]: {
                    content: JSON.stringify(contentJson),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    }
};

const updateExistingFile = async (title, type, data, newData) => {
    const filename = makeFileNameFromTitle(title);
    if(!data[filename]) return;
    const newContent = {
        ...data[filename],
        ...newData
    };
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [filename]: {
                    content: JSON.stringify(newContent),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    }
};

const addToTier = async (title, tier, type, tierlist) => {
    tierlist[tier].push(title);
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [TIER_LIST_KEY]: {
                    content: JSON.stringify(tierlist),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    }
};

const moveBetweenTiers = async (title, oldTier, newTier, type, tierlist) => {
    tierlist[oldTier] = tierlist[oldTier].filter(ele => ele !== title);
    tierlist[newTier].push(title);
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [TIER_LIST_KEY]: {
                    content: JSON.stringify(tierlist),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    } 
};

const removeExistingFile = async (type, data, title) => {
    const filename = makeFileNameFromTitle(title);
    if(!data[filename]) return;
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [filename]: {},
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    }
};

const removeFromTierList = async (title, type, tier, tierlist) => {
    tierlist[tier] = tierlist[tier].filter(ele => ele !== title);
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [TIER_LIST_KEY]: {
                    content: JSON.stringify(tierlist),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    }
};

const changeImage = async (title, type, data, imageUrl) => {
    const filename = makeFileNameFromTitle(title);
    if(!data[filename]) return;
    const newContent = {
        ...data[filename],
        Image: imageUrl
    };
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [filename]: {
                    content: JSON.stringify(newContent),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    }   
};

const addToOrder = async (title, type, orderList) => {
    orderList.push(title);
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [ORDER_KEY]: {
                    content: JSON.stringify(orderList),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    } 
}

const removeFromOrder = async (title, type, orderList) => {
    orderList = orderList.filter(ele => ele !== title);
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [ORDER_KEY]: {
                    content: JSON.stringify(orderList),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    } 
};

const updateTierList = async (tierlist, type) => {
    try {
        const gist = gists[type];
        const { data } = (await axios.post(`${apiLink}/${gist}`, 
        {
            files: {
                [TIER_LIST_KEY]: {
                    content: JSON.stringify(tierlist),
                },
            }
        },
        { headers: { Authorization: `Bearer ${personalAccessToken}` } }));
        return data.files;
    } catch(e) {
        console.log(e);
    } 
};

export {
    getAll,
    addNewFile,
    updateExistingFile,
    addToTier,
    moveBetweenTiers,
    removeExistingFile,
    removeFromTierList,
    changeImage,
    updateTierList,
    addToOrder,
    removeFromOrder
};