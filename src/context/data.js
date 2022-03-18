import { getAll } from 'api/gist';
import { ADMIN_KEY } from 'constants';
import React, { useState } from 'react';

export const dataContext = React.createContext();

export const DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = (type) => {
        (async () => {
            setLoading(true);
            const gist = await getAll(type);
            const tmpData = {};
            const tmpAdminData = {};
            for(let filename in gist) {
                if(filename.startsWith(ADMIN_KEY))
                    tmpAdminData[filename] = JSON.parse(gist[filename].content);
                else
                    tmpData[filename] = JSON.parse(gist[filename].content);
            }
            setData(tmpData);
            setAdminData(tmpAdminData);
            setLoading(false);
        })();
    };

    const updateData = (newData) => {
        const tmpData = {};
        const tmpAdminData = {};
        for(let filename in newData) {
            if(filename.startsWith(ADMIN_KEY))
                tmpAdminData[filename] = JSON.parse(newData[filename].content);
            else
                tmpData[filename] = JSON.parse(newData[filename].content);
        }
        setData(tmpData);
        setAdminData(tmpAdminData);
    };

    return (
        <dataContext.Provider value={
            { 
                getData: getData,
                updateData: updateData,
                data: data, 
                setData: setData,
                adminData: adminData,
                setAdminData: setAdminData,
                loading: loading,
                setLoading: setLoading
            }
        }>
        {children}
        </dataContext.Provider>
    );
};