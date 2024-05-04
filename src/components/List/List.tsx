import React from 'react'
import { List } from 'react-virtualized'
import './style.scss'


interface Vehicle {
	id: number
	name: string
	model: string
	year: number
	color: string
	price: number
	latitude: number
	longitude: number
}


interface ListItemProps {
	visibleData: Vehicle[]
	openItem: (user: Vehicle) => void
	isClicked: boolean
	hidden: boolean

}


const ListItem: React.FC<ListItemProps> = ({ visibleData, openItem, isClicked, hidden }) => {
	return (
		<List
			className='list'
			width={200}
			height={700}
			rowHeight={50}
			rowCount={visibleData.length}
			rowRenderer={({ key, index, style }) => {
				const item = visibleData[index]
				return (
					<button
						disabled={isClicked || !hidden}
						key={key}
						style={style}
						className='btn-item'
						onClick={() => openItem(item)}
					>
						<div className='user' key={item.id}>
							<img src='./src/img/user.svg' alt='img' />
							<span className='text'>Автомобиль {item.id}</span>
						</div>
					</button>
				)
			}}
		/>
	)
}

export default ListItem
