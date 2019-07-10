/**
 * Created by Administrator on 2019/7/9.
 */
var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .clist");
var doneList = document.querySelector(".done .clist");
var todoNumSpan=document.querySelector(".todo h1 .num");
var doneNumSpan=document.querySelector(".done h1 .num");
var main=document.querySelector(".main");
//将JSON格式的字符串转换为数组
var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderList();
inputDom.onkeypress=function(e){
    //当用户在输入框按下回车键，并且输入框有内容，就将输入框的内容放置到代办事项
    if(e.key=="Enter"&&inputDom.value!=""){
        //往dataList数据里添加待办事项数据
        var date={
            content:inputDom.value,
            type:"todo"
        };
        dataList.push(date);
        //根据数据渲染列表
        renderList();
    }
};

function renderList(){
    //每次渲染，将之前的内容清空，重新渲染
    //将对象转换成JSON格式
    localStorage.dataList=JSON.stringify(dataList);
    todoList.innerHTML="";
    doneList.innerHTML="";
    var todoNum=0;
    var doneNum=0;
    dataList.forEach(function(item,index){
        var newDiv=document.createElement("div");
        newDiv.className="item";
        if(item.type=="todo"){
            todoNum++;
            newDiv.innerHTML=`
                <span class="checkbox">
                    <input type="checkbox" name="check" data-index="${index}">
                </span>
                <span class="content">
                    ${item.content}
                </span>
                <span class="delete" data-index="${index}"></span>
             `;
            todoList.appendChild(newDiv);
        }else{
            doneNum++;
            newDiv.innerHTML=`
                <span class="checkbox">
                    <input type="checkbox" name="check" checked="checked">
                </span>
                <span class="content">
                    ${item.content}
                </span>
                <span class="delete" data-index="${index}"></span>
            `;
            doneList.appendChild(newDiv);
        }
    });
    todoNumSpan.innerHTML=todoNum;
    doneNumSpan.innerHTML=doneNum;
}


todoList.onchange=function(e){
    var index=e.target.dataset.index;
    dataList[index].type="done";
    renderList();
};

//删除
//main.addEventListener("click",function(e){
//    if(e.target.className=="delete"){
//        var index=e.target.dataset.index;
//        dataList.splice(index,1);
//        renderList();
//    }
//});

main.onclick= function (e) {
    if(e.target.className=="delete"){
        var index=e.target.dataset.index;
        dataList.splice(index,1);
        renderList();
    }
};