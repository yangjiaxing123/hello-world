# hello-world
this is time that I first use github to controller my project
so now, I know how to use the brach to log my learning skills ,let start do some intersting!

## stateless function component
在这里就不写英语啦（黔驴技穷了。。哈哈哈。。）
就是想把自己学习的东西，找个地方记下来，不然脑子不好使就又忘了

学习React中有三种创建组件的方式，但是React.CreateClass不好使，所以在这里主要讲一下，stateless function component and class extend React.component这两种方式。

.statless function component（无状态函数式组件）
  这种创建组件的方式，刚开始接触的时候，一脸懵逼，后面想了想，这不就是个函数吗，传入几个参数，然后把参数再传给其他的JSX或则其他的组件，很简单的好吧，但是类，最近学Redux把他放一起调用的时候，自己又不太懂，这调用之间的关系。所以查下资料：
   大牛解释：
    只负责根据传入的props来展示，不涉及到要state的状态，是一个只带有render方法的组件类，并且在React中组件的名字必须要大写字母开头，而包含该组件定义的文件名也应该是大写字母。
    具体的创建形式如下：
   ``` Javascript 
    function HelloComponent(props){
        return <div>Hello{props.name}</div>
    }
   ```
    特点：
      1.无状态组件没有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
      2.无状态组件由于没有实例化过程，所以无法访问组件this中的对象。
      3.无状态组件是不需要组件生命周期管理和状态管理，所以无状态组件没有生命周期的方法。
      4.无状态组件只能访问输入的props,同样的props会得到同样的渲染结果，不会有副作用。

这里就不介绍class HelloComponet extends React.componet这种方式了，没什么好介绍了


## Redux--Connect function 
  在看Redux的过程中，总会看到Connect这个函数，用于连接store和component，但是总是没有明白其中的原理和作用机制，通过自查资料在这里做个笔记：
    首先要搞懂connect的四个参数
      ...connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])...
      但是这里先不做解释，（自己还没搞明白）
      先看如下代码：
    ``` 
        import {connect} from "react-redux";
        import Login from "../components/login";
        export default connect(mapStateToProps,mapDispatchToProps)(Login);
     ```
     前者负责输入逻辑，即将state映射到UI组件的参数（props）,后者负责输出逻辑，即将用户对UI组件操作映射成Action这样就创建了一个容器组件
        先解释一下connect的前两个参数，以及connect参数为空的时候表达的意思
            在React-Redux中每个模块有自己的State用来统一管理视图数据
         （1）mapStateToProps 用于将需要的State的节点注入到与此视图数据相关的组件上
         他会接受一个state作为参数，然后返回一个对象，这个对象是根据state生成的。mapStateToProps相当于告知了Connect应该如何去Store取数据，然后可以把这个函数返回的结果传给被包装的组件。
         mapStateToProps的第二个参数 ownProps代表组件本身的Props,如果存在第二个参数ownProps，那么当父组件传过来的props改变时，mapStateToProps都会被重新计算
         （2）mapDispatchToProps
         mapDispatchToProps用于建立组件跟store.dispatch的映射关系，可以是一个object,也可以传入函数
          connect()函数生成容器组件
            const VisibleTodoList=connect()(TodoList)
            VisibleTodoList就是React-redux通过connect生成的容器组件。
            
## Redux单向数据流
  在这里写一下Redux的单向数据流，我们知道根据Redux中的官网教程中，redux主要分三块，action,reducer,store
    现在按照我自己的意思，写一遍，如果有错误，日后自己牛逼了，再回来改一下
    首先 款穿三者的主线那自然是State这个妖孽了，因为是单向的，所以action是初始化的过程，声明state的数据格式，基于一些初始化的数据，然后嘞声明一些函数但是并不实现他们，只给他们一些Type例如这样子：
    ``` Javascript
      function addTodo(text){
        return{type:ADD_TODO,text}
      }
    ```
    在这里解释一下，type其实是用来给reducer来实现的，而text则是用来传递数据值的比如`dispatch(addTodo('阳嘉兴'))`
    这里的'阳嘉兴'就保存到了action.text中通过reducer来实现
    然后两者之间由store来贯穿，store.dispatch函数来把数据传给reducer的函数，因为reducer是个纯函数所以他返回一个新的state给store,store把新数据渲染到UI组件上，以后每次修改state的时候都按照这个流程走一遍。
    
## 展示组件和容器组件
  到了后面的例子，发现其实action 和reducer里面的代码没变，但是store用容器组件来改变了，在展示组件中，也就是我们平时可以点击接触到的页面中，触发一个action,这个触发事件的实现并不是由展示组件内部实现的，而是由容器组件去调用store.dispatch来实现的，然后reducer返回一个新的state给展示组件。这是我现在接触的这么一个过程。当然可以自己画张图来了解一下。
   !(https://github.com/youyou-579/123/blob/master/2.8.jpg?raw=true)
    
    


      
  
    

