import { useEffect,useState } from 'react';
import './style.scss'
import Item from '../Item/Item';
import SuccessSaved from '../SuccessSaved/SuccessSaved';
import ListItem from '../List/List';
import React from 'react';
import axios from 'axios';



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





interface TableProps {
	newData: Vehicle[]
	setNewData: React.Dispatch<React.SetStateAction<Vehicle[]>>
	isClicked: boolean
	setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
	selectedUser: Vehicle | null
	setSelectedUser: React.Dispatch<React.SetStateAction<Vehicle | null>>
	hidden: boolean
	setHidden: React.Dispatch<React.SetStateAction<boolean>>
	sortBy: string | null
	handleSort: (field: string) => void
	sortedData: Vehicle[]
	openItem: (user: Vehicle) => void
	nextItem: () => void
	visibleData:Vehicle[]
}

const Table:React.FC<TableProps>= () => {
	const [newData,setNewData] = useState<Vehicle[]>([])
	const [isClicked, setIsClicked] = useState(false)
	const [selectedUser, setSelectedUser] = useState<Vehicle | null>(null);
	const [hidden, setHidden] = useState(true)
	const [sortBy, setSortBy] = useState<string | null>(null)

	const handleSort = (field:string) => {
		setSortBy(field)
	}

	const sortedData = newData.sort((a:Vehicle,b:Vehicle)=>{
		if(sortBy === 'price'){
			return b.price - a.price
		}else if(sortBy === 'year'){
			return b.year - a.year
		}else {
			return a.id - b.id
		}
	})


	const nextItem = () => {
		setHidden(true)
	}

	useEffect(()=>{
		const fetchData = async() => {
			try{
				const response = await axios.get('https://test.tspb.su/test-task/vehicles');
				setNewData(response.data)
			} catch(error){
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	},[])

	const openItem = (user:Vehicle)=>{
		setIsClicked(!isClicked)
		setSelectedUser(user)
	}

 
    return (
		
			<div>
				<div className='container'>
					<div className='main'>
						<div className='content'>
							<p>
								Список автомобилей
							</p>
							Сортировка 
							<select className="select-sort" name='sort' onChange={(e) => handleSort(e.target.value)}>	
								<option value=''>По порядку</option>
								<option value='price'>По стоимости</option>
								<option value='year'>По году выпуска</option>
							</select>
							<ListItem
								hidden={hidden}
								isClicked={isClicked}
								openItem={openItem}
								visibleData={sortedData}
							/>
						</div>
						<SuccessSaved hidden={hidden} nextItem={nextItem} />
						<Item
							hidden={hidden}
							setHidden={setHidden}
							setIsClicked={setIsClicked}
							setNewData={setNewData}
							user={selectedUser}
							setUser={setSelectedUser}
							isClicked={isClicked}
						/>
					</div>
				</div>
			</div>
		)
}


export default Table



