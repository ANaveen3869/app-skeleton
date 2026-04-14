import React from "react";

interface CardListProps<T> {
    data: T[],
    getKey: (item: T) => string | number,
    renderItem: (item: T) => React.ReactNode,

    loading?: boolean
    emptyState?: React.ReactNode
    onClickCard?: (item: T) => void
}


function CardList<T>({ data, loading = false, emptyState = <div>No data available</div>, getKey, renderItem, onClickCard = () => { } }: CardListProps<T>) {
    if (loading) {
        return <div>Loading</div>
    }
    if (!data || data.length < 1) {
        return <>{emptyState}</>
    }
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px"
        }}>
            {
                data.map((item) => (
                    <div key={getKey(item)} onClick={() => { onClickCard(item) }} style={{
                        cursor : "pointer" 
                    }}>
                        {renderItem(item)}
                    </div>
                ))
            }
        </div>
    )
}

export default CardList;