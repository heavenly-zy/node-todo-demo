var fs = require('fs'); // file system 文件系统

const verb = process.argv[2] // add
const content = process.argv[3] // 任务内容
const editContent = process.argv[4]
const dbPath = 'C:\\Users\\asus\\Desktop\\node-todo-demo\\db'
let list, n
try {
    fs.statSync(dbPath)
} catch (error) {
    fs.writeFileSync(dbPath, '') // 保证db文件一定存在
}

switch (verb) {
    case 'add':
        list = fetchFromDb()
        addTask(list, content)
        saveToDb(list)
        displayList(list)
        break;
    case 'list':
        list = fetchFromDb()
        displayList(list)
        break;
    case 'delete':
        list = fetchFromDb()
        n = content // 用户从 1 开始删除
        removeTask(list, n)
        displayList(list)
        saveToDb(list)
        break;
    case 'done':
        list = fetchFromDb()
        n = content
        markTaskAsDone(list, n)
        displayList(list)
        saveToDb(list)
        break;
    case 'edit':
        list = fetchFromDb()
        n = content
        editTask(list, n, editContent)
        displayList(list)
        saveToDb(list)
        break;
    default:
        console.log('你的动词是：' + verb)
        console.log('我不知道你想干啥')
        break;
}

function saveToDb(list) { // 存入数据库
    fs.writeFileSync(dbPath, JSON.stringify(list)) // 序列化
}
function fetchFromDb() { // 读取数据库
    const fileContent = fs.readFileSync(dbPath).toString()
    list = JSON.parse(fileContent) // 反序列化
    return list

}
function displayList(list) { // 列出所有任务
    console.log(list)
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

