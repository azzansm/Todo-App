import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/todoItem.module.scss';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false); // Add state for add modal

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p className={styles.description}>{todo.description}</p>
            )}
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={todo.id ? handleUpdate : handleAdd} // Update or add based on whether todo has an id
            onKeyDown={todo.id ? handleUpdate : handleAdd} // Update or add based on whether todo has an id
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type={todo.id ? 'update' : 'add'} // Pass 'update' if todo has an id, otherwise pass 'add'
        modalOpen={todo.id ? updateModalOpen : addModalOpen} // Open update modal if todo has an id, otherwise open add modal
        setModalOpen={todo.id ? setUpdateModalOpen : setAddModalOpen} // Set modal open state based on whether todo has an id
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
