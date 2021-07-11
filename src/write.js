const fs = require('fs');

module.exports = (data, path = process.env.STORAGE_PATH) => {
    
    var dataTime = new Date()
    
    const dataStructure = {
        version: process.env.npm_package_version,
        diary:[
            {
                date: `${dataTime.getDate()}/${dataTime.getMonth()}/${dataTime.getFullYear()}`,
                text: data
            }
        ]
    }

    function createFile(path, content){
        fs.readFile(path, 'utf-8', (err, e) => {
            if(err){
                fs.writeFile(path, content, (err) => {
                    if(err)throw(err);
                });
            }else{
                fs.readFile(path, 'utf-8', (err, info) => {
                    if(err)throw(err);
                    let jsonData = JSON.parse(info);
                    let jsonContent = JSON.parse(content);
                    jsonData["diary"].push(jsonContent.diary[0]);
                    const leccamelo = JSON.stringify(jsonData);
                    fs.writeFile(path, leccamelo, (err) => {
                        if(err)throw(err);
                        console.log('File updated')
                    })
                    
                       
                })
            }
            
        });
    }


    createFile(`${path}/data.json`, JSON.stringify(dataStructure))
}