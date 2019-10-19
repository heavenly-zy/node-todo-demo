var fs = require('fs'); // file system 文件系统

const verb = process.argv[2] // add
const content = process.argv[3] // 砸瓦鲁多
const editContent = process.argv[4]

switch (verb) {
    case 'add':
        fs.stat('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', function (err, stat) {
        if (err == null) { // 文件存在
            const fileContent = fs.readFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db').toString()
            const list = JSON.parse(fileContent) // 反序列化

            const task = content // 获取任务
            list.push([task, false]) // 存入任务到 list
            fs.writeFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', JSON.stringify(list)) // 序列化并存入数据库
            console.log(list)
        } else if (err.code === 'ENOENT') { // 文件不存在
            fs.writeFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', '') // 序列化
            const list = []

            const task = content
            list.push([task, false])
            fs.writeFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', JSON.stringify(list)) // 序列化
            console.log(list)
        } else { // 其他
            console.log('Some other error: ', err.code)
        }
    })
        break;
    case 'list':
        const fileContent = fs.readFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db').toString()
        const list = JSON.parse(fileContent) // 反序列化
        console.log(list)
        break;
    case 'delete':
        const fileContent = fs.readFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db').toString()
        const list = JSON.parse(fileContent)
        const n = content // 用户从 1 开始删除
        list.splice(n - 1, 1)
        console.log(list)
        fs.writeFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', JSON.stringify(list))
        break;
    case 'done':
        const fileContent = fs.readFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db').toString()
        const list = JSON.parse(fileContent)
        const n = content
        list[n - 1][1] = true
        console.log(list)
        fs.writeFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', JSON.stringify(list))
        break;
    case 'edit':
        const fileContent = fs.readFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db').toString()
        const list = JSON.parse(fileContent)
        const n = content
        list[n - 1][0] = editContent
        console.log(list)
        fs.writeFileSync('C:\\Users\\asus\\Desktop\\node-todo-demo\\db', JSON.stringify(list))
        break;
    default:
        console.log('你的动词是：' + verb)
        console.log('我不知道你想干啥')
        break;
}



