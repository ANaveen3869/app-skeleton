import React from "react"

interface ColumnsDef<T>{
    id : string,
    name : string,  
    accessor? : keyof T,
    render? : (item : T , index : number) =>React.ReactNode
    
}

interface TableDataProps<T> {
    data : T[]
    getKey : (item : T)=> string | number 
    columns : ColumnsDef<T>[]
    onClickRow? : (item : T) => void
}

function TableList<T>({data , getKey , columns ,   onClickRow = ()=>{}} :  TableDataProps<T>){
    return (
        <table>
            <thead>
                <tr>{columns.map((column)=>(
                    <th key={column.id}>{column.name}</th>
                ))}</tr>
            </thead>
            <tbody>
                {
                    data.map((record , index)=>(
                        <tr key={getKey(record)} onClick={()=>{
                            onClickRow(record)
                        }} style={{
                            cursor : "pointer"
                        }}>
                            {
                                columns.map((column)=>{
                                    let content : React.ReactNode;
                                    if(column.render){
                                        content = column.render(record , index)
                                    }else if(column.accessor){
                                        content = record[column.accessor] as React.ReactNode;
                                    }else {
                                        content = null;
                                    }
                                    return <td key={column.id} style={{
                                        borderTop : "1px solid black",
                                        
                                    }}>{content}</td>
                                })
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TableList;