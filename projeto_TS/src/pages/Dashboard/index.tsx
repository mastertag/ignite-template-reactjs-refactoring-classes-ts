
import Header from '../../components/Header';
import {useEffect, useState} from "react";
import api from "../../services/api";
// import api from '../../services/api';
 import Food from '../../components/Food';
 import ModalAddFood from '../../components/ModalAddFood';
 import ModalEditFood from '../../components/ModalEditFood';
 import { FoodsContainer } from './styles';
import {FiCheckSquare} from "react-icons/fi";



interface FoodData{
    id: number,
    available: boolean,
    name: string,
    image: string,
    description: string,
    price: number,
}
function Dashboard(props: any) {
    const [foods,setFoods] = useState<FoodData[]>([]);
    const [editingFood, setEditingFood] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        (async () =>{
            const response = await api.get<FoodData[]>('/foods');
            setFoods(response.data)
        })();


    }, []);

    //---------------

    const toggleModal = ():void => {
        setModalOpen(!modalOpen);
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    }

    const handleEditFood = (food:any) => {
        setEditingFood(food);
        setEditModalOpen(!editModalOpen);
    }

    const handleAddFood = async (food:FoodData) => {
        try {
            const response = await api.post('/foods', {
                ...food,
                available: true,
            });

            setFoods([...foods, response.data]);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateFood = async (food:FoodData) => {

        try {
            const foodUpdated = await api.put(
                `/foods/${food.id}`,
                 food ,
            );

            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data,
            );

            setFoods(foodsUpdated);

        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteFood = async (id:number) => {


        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFoods(foodsFiltered);
    }

    //-----------------
    return (
        <>
            <Header openModal={toggleModal}/>
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />
            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map(food => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={handleDeleteFood}
                            handleEditFood={handleEditFood}
                        />
                    ))}
            </FoodsContainer>
        </>
    )
}

export default Dashboard;
