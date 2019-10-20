这是基于 Node.js 的一个 todo 应用，请在命令行中使用

# 使用方法

``` sh
node todo add 任务内容
node todo list
node todo done 1
node todo delete 1
node todo edit 1
```

# 可以使用 alias 来简化命令

1. 打开`.bashrc`文件

``` sh
vi ~/.bashrc
```

2. 在`.bashrc`文件中输入以下内容

``` sh
alias td="node 文件路径/todo.js"
```

3. 使修改后的`.bashrc`文件生效

``` sh
source ~/.bashrc
```

然后就可以使用简化的命令啦~~

``` sh
td add 任务内容
td list
td done 1
td delete 1
td edit 1
```