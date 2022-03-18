import { getCoverArt } from "api/anilist";
import { addNewFile, addToOrder, addToTier, moveBetweenTiers, updateExistingFile } from "api/gist";
import { ORDER_KEY } from "constants";
import { adminColumns } from "constants";
import { TIER_LIST_KEY } from "constants";
import { TIER_KEY } from "constants";
import { RUBRIC_KEY } from "constants";

export const convertIdToTitle = id => 
id.replace(/-/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

export const makeFileNameFromTitle = (title) => 
`${(title.toLowerCase()).replace(/\s+/g, '-')}.json`;

const getScore = (data, rubric) => {
    let score = 0;
    for(const [key, value] of Object.entries(rubric)) {
        let sub = data[key];
        if(typeof value === 'number')
            score += 1.0*sub*value/10
        else
            score += value[sub];
    }
    return score;
};

const getTier = (score, tiers) => {
    let maxThreshold = -1;
    let maxTier = '';
    for(const [tier, threshold] of Object.entries(tiers)) {
        if(score > threshold && threshold > maxThreshold) {
            maxThreshold = threshold;
            maxTier = tier;
        }
    }
    return maxTier;
};

const checkInputs = (row, adminData) => {
    const rubric = adminData[RUBRIC_KEY];
    for(const [key, value] of Object.entries(row)) {
        if(adminColumns.indexOf(key) !== -1) continue;
        if(typeof rubric[key] === 'number') {
            if(typeof value !== 'number' | value < 0 || value > 10)
                return false;
        } else {
            if((Object.keys(rubric[key])).indexOf(value) === -1)
                return false;
        }
    }
    return true;
};

export const buildEntry = async (title, measures, type, adminData, newEntry=true, data=null) => {
    if(!checkInputs(measures, adminData)) {
        alert('Bad Input. Try again...');
        return;
    }

    let score = getScore(measures, adminData[RUBRIC_KEY]);
    let tier = getTier(score, adminData[TIER_KEY]);
    const json = {
        Title: title,
        Score: score,
        Tier: tier,
        ...measures
    };
    if(newEntry) {
        await addToOrder(title, type, adminData[ORDER_KEY]);
        await addToTier(title, tier, type, adminData[TIER_LIST_KEY]);
        if(type === 'manga' || type === 'anime')
            json['Image'] = await getCoverArt(title, type);
        else
            json['Image'] = '';
        return await addNewFile(type, json);
    } else {
        const oldTier = data[makeFileNameFromTitle(title)]['Tier'];
        await moveBetweenTiers(title, oldTier, tier, type, adminData[TIER_LIST_KEY]);
        return await updateExistingFile(title, type, data, json);
    } 
};

export const getImageUrlFromTitle = (title, data) => {
    const filename = makeFileNameFromTitle(title);
    return data?.[filename]?.['Image'];
};