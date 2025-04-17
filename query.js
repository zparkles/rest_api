
const link = await fetch ('https://ogienurdiana.com/career/ecc694ce4e7f6e45a5a7912cde9fe131')
const data = await link.json()
const dataOnly = data.DATA.trim().split('\n')
const headers = dataOnly[0].split('|')
const dataRows = dataOnly.slice(1)

const parsedData = dataRows.map(row =>{
    const values = row.split('|') 
    return {
        [headers[0]]: values[0],
        [headers[1]]: values[1],
        [headers[2]]: values[2]
    }
})


export async function getName(name){
    const nameFilter = await parsedData.filter(item => item.NAMA === name)
    return nameFilter
}

export async function getNIM(NIM){
    const nimFilter = await parsedData.filter(item => item.NIM === NIM)
    return nimFilter
}

export async function getYMD(YMD){
    const ymdFilter = await parsedData.filter(item => item.YMD === YMD)
    return ymdFilter
}