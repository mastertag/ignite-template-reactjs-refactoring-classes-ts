import {Component, createRef, useEffect, useRef} from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import api from "../../services/api";

function ModalEditFood(props: any){
    const {isOpen, setIsOpen, editingFood,handleUpdateFood} = props;
    const formEditRef = useRef<HTMLFormElement>(null);


    async function handleSubmit(data: any) {
        handleUpdateFood({id:editingFood.id,...data});
        setIsOpen();
    }

    useEffect(() => {

        setTimeout(()=>{
            formEditRef.current?.setData({ name: editingFood.name });
            formEditRef.current?.setData({ image: editingFood.image });
            formEditRef.current?.setData({ price: editingFood.price });
            formEditRef.current?.setData({ description: editingFood.description });
        },10);


    }, [isOpen]);


  return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <Form ref={formEditRef} onSubmit={handleSubmit} initialData={editingFood}>
              <h1>Editar Prato</h1>
              <Input name="image" placeholder="Cole o link aqui" />

              <Input name="name" placeholder="Ex: Moda Italiana" />
              <Input name="price" placeholder="Ex: 19.90" />

              <Input name="description" placeholder="Descrição" />

              <button type="submit" data-testid="edit-food-button">
                  <div className="text">Editar Prato</div>
                  <div className="icon">
                      <FiCheckSquare size={24} />
                  </div>
              </button>
          </Form>

      </Modal>
  );
}
/*class ModalEditFood extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef()
  }

  handleSubmit = async (data) => {
    const { setIsOpen, handleUpdateFood } = this.props;

    handleUpdateFood(data);
    setIsOpen();
  };

  render() {
    const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
};*/

export default ModalEditFood;
