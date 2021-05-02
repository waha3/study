/**
 * 链表结构 
 * 一般需要定义一个表头的 作为锚点
 */

interface LinkListNode{
    element: any,
    next: any
}

interface LinkList {
    makeEmpty: Function,
    isEmpty: Function,
    isLast: Function,
    Find:Function
}