var fs = require('fs'); // file system 文件系统
var path = require('path')
const verb = process.argv[2] // add
const content = process.argv[3] // 任务内容
const editContent = process.argv[4]
const dbPath = path.join(__dirname, 'db') // __dirname保证一定是当前目录的相对路径
// path.join() 方法使用平台特定的分隔符将 path 片段连接在一起
// Windows用 '\\'
// 其他系统 '/'

ensureDbExist()

const list = fetchFromDb()
const n = content // 用户从 1 开始删除

switch (verb) {
    case 'add':
        addTask(list, content)
        break;
    case 'list':
        break;
    case 'delete':
        removeTask(list, n)
        break;
    case 'done':
        markTaskAsDone(list, n)
        break;
    case 'edit':
        editTask(list, n, editContent)
        break;
    default:
        console.log('你的动词是：' + verb)
        console.log('我不知道你想干啥')
        break;
}
displayList(list)
if (verb !== 'list') {
    saveToDb(list)
}


// 下面是工具函数

function ensureDbExist() { // 保证db文件一定存在
    try {
        fs.statSync(dbPath)
    } catch (error) {
        fs.writeFileSync(dbPath, '')
    }
}
function saveToDb(list) { // 存入数据库
    fs.writeFileSync(dbPath, JSON.stringify(list)) // 序列化
}
function fetchFromDb() { // 读取数据库
    const fileContent = fs.readFileSync(dbPath).toString()
    let list
    try {
        list = JSON.parse(fileContent) || []// 反序列化
    } catch (error) {
        list = [] // 保证db文件内容一定为数组
    }
    return list

}
function displayList(list) { // 列出所有任务
    for (let i = 0; i < list.length; i++) {
        const mark = list[i][1] === true ? '[✔]' : '[  ]'
        console.log(mark + '' + '任务内容：' + list[i][0])
    }
}
function addTask(list, content) { // 存入任务到 list
    list.push([content, false])
}
function removeTask(list, n) { // 删除任务
    list.splice(n - 1, 1)
}
function markTaskAsDone(list, n) { // 标记任务完成(true)
    list[n - 1][1] = true
}
function editTask(list, n, newContent) { // 编辑任务内容
    list[n - 1][0] = newContent
}

