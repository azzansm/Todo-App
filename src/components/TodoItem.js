import React, { useEffect, useState } from 'react';
// import { format } from 'date-fns';
import { MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/todoItem.module.scss';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import CheckButton from './CheckButton';

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
  //   const handleUpdate = () => {
  //     console.log('updating');
  //   };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  // const formattedTime =
  //   todo.time instanceof Date
  //     ? `Added on ${format(todo.time, 'dd/MM/yyyy')}`
  //     : '';

  return (
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
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{todo.description}</p>
          </div>
          {/* <p className={styles.time}>{formattedTime}</p> */}
        </div>
      </div>
      <div className={styles.todoActions}>
        <div
          className={styles.icon}
          onClick={handleDelete}
          onKeyDown={handleDelete}
          role="button"
          tabIndex={0}
        >
          <MdDelete />
        </div>
        {/* <div
          className={styles.icon}
          onClick={handleUpdate}
          onKeyDown={handleUpdate}
          role="button"
          tabIndex={0}
        >
          <MdEdit />
        </div> */}
      </div>
    </motion.div>
  );
}

export default TodoItem;
