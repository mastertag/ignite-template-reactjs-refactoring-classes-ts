import {useEffect, useRef, useState} from 'react';
import {FiCheckSquare} from 'react-icons/fi';

import {Form} from './styles';
import Modal from '../Modal';
import Input from '../Input';
import api from "../../services/api";

function ModalAddFood(props: any) {
    const {isOpen, setIsOpen, handleAddFood} = props;
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(data: any) {
        handleAddFood(data);
        setIsOpen();
    }

    return (

        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1>Novo prato</h1>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input name="image" placeholder="Cole o link aqui"/>

                <Input name="name" placeholder="Ex: Moda Italiana"/>
                <Input name="price" placeholder="Ex: 19.90"/>

                <Input name="description" placeholder="Descrição"/>
                <button type="submit" data-testid="add-food-button">
                    <p className="text">Adicionar Prato</p>
                    <div className="icon">
                        <FiCheckSquare size={24}/>
                    </div>
                </button>
            </Form>

        </Modal>
    );
}

export default ModalAddFood;
