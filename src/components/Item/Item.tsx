import './style.scss'
import axios from 'axios'
import Map from '../Map/Map'
import { useState} from 'react'
import React from 'react'

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


interface ItemProps {
	isClicked: boolean
	user: Vehicle | null
	setUser: React.Dispatch<React.SetStateAction<Vehicle | null>>
	setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
	setHidden: React.Dispatch<React.SetStateAction<boolean>>
	hidden: boolean
	setNewData: React.Dispatch<React.SetStateAction<Vehicle[]>>
	
}

const Item:React.FC<ItemProps> = ({isClicked, user,setUser,setIsClicked,setHidden,hidden,setNewData}) => {

	const [mapShow,setMapShow] = useState(false)


	const Saved = async() => {
			setIsClicked(!isClicked),
			setHidden(!hidden)
			try{
				if(user){
					const res = await axios.put(
						`https://test.tspb.su/test-task/vehicles/${user.id}`,
						user
					)
					setUser(res.data)
					setNewData(prevData =>
						prevData.map(item => (item.id === user.id ? res.data : item))
					)
				}
				
			}catch(error){
				console.error('Error updating data', error)
			}
		}


	const Deleted = async() => {
		try{
			if(user){
				const removeData = await axios.delete(
					`https://test.tspb.su/test-task/vehicles/${user.id}`
				)
				setUser(removeData.data)
				setNewData(prevData => prevData.filter(data => data.id !== user.id))
			}
			
		} catch(error){
			console.error('Error updating data', error)
		}
	}

	const ConfirmDelete = () => {
		const confirm = window.confirm('Вы уверены, что хотите удалить данные?')
		if(confirm){
			setIsClicked(!isClicked),
			Deleted()
		}
	}


	const MapShow = () => {
		setMapShow(!mapShow)
	}


    return (user && 
			<div key={ user.name} className={`item ${isClicked ? '' : 'hidden'}`}>
				<div className='item-head'>
					<div className='item-head__container '>
						<h1>Карточка автомобиля {user.id} </h1>
					</div>
				</div>
				<div className='item-content'>
					<div className='item-content__container'>
						<img className='img-content' src='./public/Car-img.png' alt='img' />
						<div className='item-data__map-show'>
							<button
								onClick={() => {
									MapShow()
								}}
								disabled={mapShow || !hidden}
							>
								Показать на карте
							</button>
						</div>
						<div className='item-data'>
							<div className='input-item'>
								Название
								<input
									name='name'
									id='name'
									value={user && user.name}
									type='text'
									onChange={e => {
										setUser({
											...user,
											name: e.target.value,
										})
									}}
								/>
							</div>
							<div className='input-item'>
								Модель
								<input
									name='model'
									id='model'
									value={user && user.model}
									type='text'
									onChange={e => {
										setUser({
											...user,
											model: e.target.value,
										})
									}}
								/>
							</div>
							<div className='input-item'>
								Год выпуска
								<input
									name='year'
									id='year'
									value={user && user.year}
									type='number'
									onChange={e => {
										setUser({
											...user,
											year: parseInt(e.target.value),
										})
									}}
								/>
							</div>
							<div className='input-item'>
								Цвет
								<input
									onChange={e => {
										setUser({
											...user,
											color: e.target.value,
										})
									}}
									value={user && user.color}
									type='text'
								/>
							</div>
							<div className='input-item'>
								Цена
								<input
									onChange={e => {
										setUser({
											...user,
											price: parseInt(e.target.value),
										})
									}}
									value={user && user.price}
									type='number'
								/>
							</div>
							<div className='item-data__btns'>
								<div className='item-data__save'>
									<button
										onClick={() => {
											Saved()
										}}
										disabled={mapShow || !hidden}
									>
										Сохранить
									</button>
								</div>
								<div className='item-data__delete'>
									<button
										onClick={() => {
											ConfirmDelete()
										}}
										disabled={mapShow || !hidden}
									>
										Удалить данные
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						id='map'
						className={mapShow === false ? 'hidden' : 'item-content__map'}
					>
						<Map
							latitude={user.latitude}
							longitude={user.longitude}
							user={user}
						></Map>
						<button onClick={MapShow} className='btn-close'>
							<img className='close-icon' src='close.svg' alt='' />
						</button>
					</div>
				</div>
			</div>
		)
}

export default Item